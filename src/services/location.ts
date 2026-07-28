import { findNearestRegion } from "@/utils/regions";
import { Region } from "@/types/region";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { Alert, Linking, Platform } from "react-native";

/** 설정 화면으로 안내해야 하는 경우만 */
export type LocationSettingsReason = "permission_denied" | "services_disabled";

export type LocationFailureReason = LocationSettingsReason | "unavailable";

export type CurrentLocationResult =
  | {
      ok: true;
      region: Region;
      latitude: number;
      longitude: number;
    }
  | {
      ok: false;
      reason: LocationFailureReason;
    };

const CURRENT_TIMEOUT_MS = 12_000;
const QUICK_TIMEOUT_MS = 4_000;
const WATCH_TIMEOUT_MS = 15_000;
const LOCATION_CACHE_KEY = "weather-cat/last-location";

type CachedLocation = {
  region: Region;
  latitude: number;
  longitude: number;
  savedAt: number;
};

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("location_timeout")), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

/** 에뮬/콜드스타트에서 단발성 getCurrent보다 안정적 — 첫 fix까지 대기 */
async function waitForWatchFix(
  timeoutMs: number,
): Promise<Location.LocationObject | null> {
  let subscription: Location.LocationSubscription | null = null;

  try {
    return await new Promise<Location.LocationObject | null>((resolve) => {
      let settled = false;

      const finish = (value: Location.LocationObject | null) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        subscription?.remove();
        resolve(value);
      };

      const timer = setTimeout(() => finish(null), timeoutMs);

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          distanceInterval: 0,
          timeInterval: 500,
        },
        (location) => finish(location),
      )
        .then((sub) => {
          subscription = sub;
          if (settled) {
            sub.remove();
          }
        })
        .catch(() => finish(null));
    });
  } finally {
    subscription?.remove();
  }
}

/**
 * 현재 좌표를 읽습니다.
 * - full: 앱 시작용 (watch 폴백 포함)
 * - quick: 위젯용 (짧게, 다이얼로그/watch 생략 — headless 타임아웃 방지)
 */
async function readDevicePosition(
  mode: "full" | "quick",
): Promise<Location.LocationObject | null> {
  if (mode === "full" && Platform.OS === "android") {
    try {
      await Location.enableNetworkProviderAsync();
    } catch {
      // 사용자가 대화상자를 닫아도 계속 시도
    }
  }

  const lastKnown = await Location.getLastKnownPositionAsync();
  if (lastKnown) {
    console.log("[location] lastKnown 사용");
    return lastKnown;
  }

  try {
    const current = await withTimeout(
      Location.getCurrentPositionAsync({
        accuracy:
          mode === "quick"
            ? Location.Accuracy.Low
            : Location.Accuracy.Balanced,
      }),
      mode === "quick" ? QUICK_TIMEOUT_MS : CURRENT_TIMEOUT_MS,
    );
    console.log("[location] getCurrent 사용");
    return current;
  } catch (error) {
    console.warn("[location] getCurrent 실패:", error);
  }

  if (mode === "quick") {
    console.warn("[location] quick 모드 — 좌표 없음");
    return null;
  }

  const watched = await waitForWatchFix(WATCH_TIMEOUT_MS);
  if (watched) {
    console.log("[location] watch fix 사용");
    return watched;
  }

  console.warn("[location] 좌표를 얻지 못함");
  return null;
}

async function saveLocationCache(
  result: Extract<CurrentLocationResult, { ok: true }>,
): Promise<void> {
  const payload: CachedLocation = {
    region: result.region,
    latitude: result.latitude,
    longitude: result.longitude,
    savedAt: Date.now(),
  };
  try {
    await AsyncStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify(payload));
  } catch {
    // ignore
  }
}

/** 앱/위젯이 마지막으로 성공한 현재 위치 (위젯 headless 폴백용) */
export async function loadCachedNearestRegion(): Promise<CurrentLocationResult | null> {
  try {
    const raw = await AsyncStorage.getItem(LOCATION_CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw) as CachedLocation;
    if (!cached?.region) return null;
    return {
      ok: true,
      region: cached.region,
      latitude: cached.latitude,
      longitude: cached.longitude,
    };
  } catch {
    return null;
  }
}

/** 위치 권한/서비스 설정 화면으로 이동 */
export async function openLocationSettings(
  reason: LocationSettingsReason,
): Promise<void> {
  if (Platform.OS === "android" && reason === "services_disabled") {
    await Linking.sendIntent("android.settings.LOCATION_SOURCE_SETTINGS");
    return;
  }

  await Linking.openSettings();
}

/** 설정이 꺼져 있을 때만 설정 이동을 안내 */
export function promptOpenLocationSettings(
  reason: LocationSettingsReason,
): void {
  const message =
    reason === "permission_denied"
      ? "날씨를 불러오려면 위치 권한이 필요합니다. 설정에서 허용해 주세요."
      : "날씨를 불러오려면 기기의 위치 서비스를 켜주세요.";

  Alert.alert("위치 설정 필요", message, [
    { text: "취소", style: "cancel" },
    {
      text: "설정으로 이동",
      onPress: () => {
        openLocationSettings(reason);
      },
    },
  ]);
}

/** 설정으로 보내야 하는 실패인지 */
export function shouldOpenLocationSettings(
  reason: LocationFailureReason,
): reason is LocationSettingsReason {
  return reason === "permission_denied" || reason === "services_disabled";
}

type GetLocationOptions = {
  /** false면 권한 요청 없이 현재 상태만 확인 (위젯 갱신용) */
  requestPermission?: boolean;
  /** quick: 위젯 headless — 짧은 타임아웃, watch 생략 */
  mode?: "full" | "quick";
};

/** Strict Mode 등에서 동시에 여러 번 호출돼도 한 번만 위치를 읽음 */
let inFlightNearestRegion: Promise<CurrentLocationResult> | null = null;

/**
 * 현재 위치와 가장 가까운 지역을 반환합니다.
 * - 위치 서비스 OFF / 권한 영구 거부 → settings 안내 대상
 * - 일시적으로 좌표를 못 읽음 → unavailable (설정 이동 X)
 */
export async function getCurrentNearestRegion(
  options: GetLocationOptions = {},
): Promise<CurrentLocationResult> {
  const { requestPermission = true, mode = "full" } = options;

  // 위젯(quick)은 앱 초기화와 경합하지 않도록 별도 실행
  if (!requestPermission || mode === "quick") {
    return resolveNearestRegion({
      requestPermission: false,
      mode: mode === "quick" ? "quick" : "full",
    });
  }

  if (!inFlightNearestRegion) {
    inFlightNearestRegion = resolveNearestRegion({
      requestPermission: true,
      mode: "full",
    }).finally(() => {
      inFlightNearestRegion = null;
    });
  }

  return inFlightNearestRegion;
}

async function resolveNearestRegion(
  options: Required<Pick<GetLocationOptions, "requestPermission" | "mode">>,
): Promise<CurrentLocationResult> {
  const { requestPermission, mode } = options;

  const servicesEnabled = await Location.hasServicesEnabledAsync();
  if (!servicesEnabled) {
    return { ok: false, reason: "services_disabled" };
  }

  let permission = await Location.getForegroundPermissionsAsync();

  if (
    permission.status !== Location.PermissionStatus.GRANTED &&
    requestPermission
  ) {
    if (
      permission.status === Location.PermissionStatus.UNDETERMINED ||
      permission.canAskAgain
    ) {
      permission = await Location.requestForegroundPermissionsAsync();
    }
  }

  if (permission.status !== Location.PermissionStatus.GRANTED) {
    if (!permission.canAskAgain) {
      return { ok: false, reason: "permission_denied" };
    }
    return { ok: false, reason: "unavailable" };
  }

  const position = await readDevicePosition(mode);
  if (!position) {
    return { ok: false, reason: "unavailable" };
  }

  const { latitude, longitude } = position.coords;
  const result = {
    ok: true as const,
    region: findNearestRegion(latitude, longitude),
    latitude,
    longitude,
  };

  await saveLocationCache(result);
  return result;
}
