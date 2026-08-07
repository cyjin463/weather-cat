"use no memo";

import {
  getCurrentNearestRegion,
  loadCachedNearestRegion,
} from "@/services/location";
import { getFetchCurrentWeather } from "@/services/weather-api";
import { WeatherCatWidget } from "@/widgets/WeatherCatWidget";
import {
  buildWidgetSnapshot,
  loadWidgetWeather,
  saveWidgetWeather,
  WidgetWeatherSnapshot,
} from "@/services/widget-storage";
import { Platform } from "react-native";
import { requestWidgetUpdate } from "react-native-android-widget";

const WIDGET_NAME = "WeatherCatWidget";

async function renderSnapshot(snapshot: WidgetWeatherSnapshot | null) {
  await requestWidgetUpdate({
    widgetName: WIDGET_NAME,
    renderWidget: () => (
      <WeatherCatWidget
        temperature={snapshot?.temperature ?? "--°"}
        weatherCode={snapshot?.weatherCode ?? 3}
        districtName={snapshot?.districtName ?? "현재 위치"}
      />
    ),
  });
}

async function renderLastOrEmpty(fallbackDistrict: string) {
  const saved = await loadWidgetWeather();
  if (saved) {
    await renderSnapshot(saved);
    return;
  }
  await renderSnapshot({
    temperature: "--°",
    weatherCode: 3,
    districtName: fallbackDistrict,
  });
}

/**
 * 현재 기기 위치 기준으로 날씨를 조회해 위젯을 갱신합니다.
 * 앱에서 선택한 지역과 무관합니다.
 */
export async function refreshWidgetFromCurrentLocation(
  options: { requestPermission?: boolean } = {},
): Promise<void> {
  if (Platform.OS !== "android") return;

  try {
    let result = await getCurrentNearestRegion({
      requestPermission: options.requestPermission ?? false,
      mode: "quick",
    });

    if (!result.ok) {
      const cached = await loadCachedNearestRegion();
      if (cached?.ok) {
        result = cached;
      }
    }

    if (!result.ok) {
      await renderLastOrEmpty("위치 없음");
      return;
    }

    try {
      const current = await getFetchCurrentWeather(
        result.region.lat,
        result.region.long,
      );
      const prev = await loadWidgetWeather();
      const snapshot = buildWidgetSnapshot(prev, result.region, current);

      await saveWidgetWeather(snapshot);
      await renderSnapshot(snapshot);
    } catch {
      await renderLastOrEmpty(result.region.districtName);
    }
  } catch {
    await renderLastOrEmpty("오류");
  }
}
