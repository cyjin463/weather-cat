"use no memo";

import {
  getCurrentNearestRegion,
  loadCachedNearestRegion,
} from "@/services/location";
import { getFetchWeatherData } from "@/services/weather-api";
import { WeatherCatWidget } from "@/widgets/WeatherCatWidget";
import {
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

/** 저장된 스냅샷으로 위젯만 다시 그립니다. */
export async function updateWeatherCatWidget(
  snapshot?: WidgetWeatherSnapshot | null,
): Promise<void> {
  if (Platform.OS !== "android") return;

  const data =
    snapshot === undefined ? await loadWidgetWeather() : snapshot;
  await renderSnapshot(data);
}

/**
 * 현재 기기 위치 기준으로 날씨를 조회해 위젯을 갱신합니다.
 * 앱에서 선택한 지역과 무관합니다.
 */
export async function refreshWidgetFromCurrentLocation(
  options: { requestPermission?: boolean } = {},
): Promise<void> {
  if (Platform.OS !== "android") return;

  const result = await getCurrentNearestRegion({
    requestPermission: options.requestPermission ?? false,
    mode: "quick",
  });

  if (!result.ok) {
    const cached = await loadCachedNearestRegion();
    if (cached?.ok) {
      const weatherData = await getFetchWeatherData(
        cached.region.lat,
        cached.region.long,
      );
      const snapshot: WidgetWeatherSnapshot = {
        temperature: weatherData.current.temperature,
        weatherCode: weatherData.current.weatherCode,
        districtName: cached.region.districtName,
      };
      await saveWidgetWeather(snapshot);
      await renderSnapshot(snapshot);
      return;
    }

    await renderSnapshot({
      temperature: "--°",
      weatherCode: 3,
      districtName: "위치 없음",
    });
    return;
  }

  const weatherData = await getFetchWeatherData(
    result.region.lat,
    result.region.long,
  );

  const snapshot: WidgetWeatherSnapshot = {
    temperature: weatherData.current.temperature,
    weatherCode: weatherData.current.weatherCode,
    districtName: result.region.districtName,
  };

  await saveWidgetWeather(snapshot);
  await renderSnapshot(snapshot);
}

/** 이미 조회한 현재 위치 날씨로 위젯을 저장·갱신합니다. */
export async function syncLocationWeatherToWidget(
  snapshot: WidgetWeatherSnapshot,
): Promise<void> {
  await saveWidgetWeather(snapshot);
  if (Platform.OS !== "android") return;
  await renderSnapshot(snapshot);
}
