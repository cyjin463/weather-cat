"use no memo";

import {
  getCurrentNearestRegion,
  loadCachedNearestRegion,
} from "@/services/location";
import { getFetchWeatherData } from "@/services/weather-api";
import {
  buildWidgetSnapshot,
  loadWidgetWeather,
  saveWidgetWeather,
} from "@/services/widget-storage";
import { WeatherCatWidget } from "@/widgets/WeatherCatWidget";
import type { WidgetTaskHandler } from "react-native-android-widget";

async function resolveGpsRegion() {
  let result = await getCurrentNearestRegion({
    requestPermission: false,
    mode: "quick",
  });

  if (!result.ok) {
    const cached = await loadCachedNearestRegion();
    if (cached?.ok) {
      result = cached;
    }
  }

  return result;
}

function renderSnapshot(
  renderWidget: Parameters<WidgetTaskHandler>[0]["renderWidget"],
  snapshot: {
    temperature: string;
    weatherCode: number;
    districtName: string;
  },
) {
  renderWidget(
    <WeatherCatWidget
      temperature={snapshot.temperature}
      weatherCode={snapshot.weatherCode}
      districtName={snapshot.districtName}
    />,
  );
}

export const widgetTaskHandler: WidgetTaskHandler = async ({
  widgetAction,
  renderWidget,
}) => {
  if (widgetAction === "WIDGET_DELETED") return;

  try {
    const result = await resolveGpsRegion();

    if (result.ok) {
      try {
        const weatherData = await getFetchWeatherData(
          result.region.lat,
          result.region.long,
        );
        const prev = await loadWidgetWeather();
        const snapshot = buildWidgetSnapshot(
          prev,
          result.region,
          weatherData.current,
        );

        await saveWidgetWeather(snapshot);
        renderSnapshot(renderWidget, snapshot);
        return;
      } catch {
        // API 실패 → 아래 스냅샷 폴백
      }
    }

    const saved = await loadWidgetWeather();
    if (saved) {
      renderSnapshot(renderWidget, saved);
      return;
    }

    renderSnapshot(renderWidget, {
      temperature: "--°",
      weatherCode: 3,
      districtName: "위치 없음",
    });
  } catch {
    const saved = await loadWidgetWeather();
    if (saved) {
      renderSnapshot(renderWidget, saved);
      return;
    }

    renderSnapshot(renderWidget, {
      temperature: "--°",
      weatherCode: 3,
      districtName: "오류",
    });
  }
};
