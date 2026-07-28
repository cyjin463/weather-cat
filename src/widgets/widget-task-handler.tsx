"use no memo";

import {
  getCurrentNearestRegion,
  loadCachedNearestRegion,
} from "@/services/location";
import { getFetchWeatherData } from "@/services/weather-api";
import {
  loadWidgetWeather,
  saveWidgetWeather,
} from "@/services/widget-storage";
import { WeatherCatWidget } from "@/widgets/WeatherCatWidget";
import type { WidgetTaskHandler } from "react-native-android-widget";

export const widgetTaskHandler: WidgetTaskHandler = async ({
  widgetAction,
  renderWidget,
}) => {
  if (widgetAction === "WIDGET_DELETED") return;

  try {
    // 위젯 headless는 시간이 짧아서 quick 모드로 현재 위치 시도
    let result = await getCurrentNearestRegion({
      requestPermission: false,
      mode: "quick",
    });

    // GPS를 못 잡으면 앱에서 저장해 둔 마지막 현재 위치 사용
    if (!result.ok) {
      const cached = await loadCachedNearestRegion();
      if (cached?.ok) {
        result = cached;
      }
    }

    if (result.ok) {
      const weatherData = await getFetchWeatherData(
        result.region.lat,
        result.region.long,
      );

      const snapshot = {
        temperature: weatherData.current.temperature,
        weatherCode: weatherData.current.weatherCode,
        districtName: result.region.districtName,
      };

      await saveWidgetWeather(snapshot);
      renderWidget(
        <WeatherCatWidget
          temperature={snapshot.temperature}
          weatherCode={snapshot.weatherCode}
          districtName={snapshot.districtName}
        />,
      );
      return;
    }

    // 날씨 스냅샷이라도 있으면 표시
    const saved = await loadWidgetWeather();
    if (saved) {
      renderWidget(
        <WeatherCatWidget
          temperature={saved.temperature}
          weatherCode={saved.weatherCode}
          districtName={saved.districtName}
        />,
      );
      return;
    }

    renderWidget(
      <WeatherCatWidget
        temperature="--°"
        weatherCode={3}
        districtName="위치 없음"
      />,
    );
  } catch {
    renderWidget(
      <WeatherCatWidget
        temperature="--°"
        weatherCode={3}
        districtName="오류"
      />,
    );
  }
};
