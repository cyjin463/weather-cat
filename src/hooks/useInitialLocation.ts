import {
  getCurrentNearestRegion,
  promptOpenLocationSettings,
  shouldOpenLocationSettings,
} from "@/services/location";
import {
  loadAppWeatherCache,
  saveAppWeatherCache,
} from "@/services/app-weather-storage";
import { getFetchWeatherData } from "@/services/weather-api";
import { refreshWidgetFromCurrentLocation } from "@/services/widget-update";
import { useRegionsStore } from "@/stores/regionsStore";
import { useWeatherStore } from "@/stores/weather";
import type { Region } from "@/types/region";
import type { WeatherData } from "@/types/weather";
import { useEffect } from "react";
import { AppState, type AppStateStatus } from "react-native";

const APP_REFRESH_MS = 30 * 60 * 1000;

async function fetchAndPersistAppWeather(
  region: Region,
  setWeatherData: (data: WeatherData) => void,
) {
  const weatherData = await getFetchWeatherData(region.lat, region.long);
  setWeatherData(weatherData);
  await saveAppWeatherCache(region, weatherData);
  return weatherData;
}

/**
 * 앱 시작:
 * - 캐시 있으면 지역 유지 + 날씨 API 최신화
 * - 없으면 GPS로 최초 로드
 * - 위젯은 별도로 GPS 기준 최신 갱신
 * 포그라운드에서 30분마다 선택 지역 날씨만 재조회
 */
export function useInitialLocation() {
  const setSelectedRegion = useRegionsStore((s) => s.setSelectedRegion);
  const setWeatherData = useWeatherStore((s) => s.setWeatherData);

  useEffect(() => {
    const init = async () => {
      void refreshWidgetFromCurrentLocation().catch(() => {});

      try {
        const cached = await loadAppWeatherCache();

        if (cached) {
          setSelectedRegion(cached.region);
          setWeatherData(cached.weatherData);

          try {
            await fetchAndPersistAppWeather(cached.region, setWeatherData);
          } catch {
            // 캐시 UI 유지
          }
          return;
        }

        const result = await getCurrentNearestRegion();

        if (!result.ok) {
          if (shouldOpenLocationSettings(result.reason)) {
            promptOpenLocationSettings(result.reason);
          }
          return;
        }

        setSelectedRegion(result.region);
        await fetchAndPersistAppWeather(result.region, setWeatherData);
      } catch {
        // 초기 로드 실패 시 수동 지역 선택 가능
      }
    };

    void init();
  }, [setSelectedRegion, setWeatherData]);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const refreshSelected = async () => {
      const region = useRegionsStore.getState().selectedRegion;
      if (!region?.lat || !region?.long) return;
      try {
        await fetchAndPersistAppWeather(region, setWeatherData);
      } catch {
        // 유지
      }
    };

    const startInterval = () => {
      if (intervalId) return;
      intervalId = setInterval(() => {
        void refreshSelected();
      }, APP_REFRESH_MS);
    };

    const stopInterval = () => {
      if (!intervalId) return;
      clearInterval(intervalId);
      intervalId = null;
    };

    const onAppState = (state: AppStateStatus) => {
      if (state === "active") {
        startInterval();
      } else {
        stopInterval();
      }
    };

    if (AppState.currentState === "active") {
      startInterval();
    }

    const sub = AppState.addEventListener("change", onAppState);
    return () => {
      stopInterval();
      sub.remove();
    };
  }, [setWeatherData]);
}
