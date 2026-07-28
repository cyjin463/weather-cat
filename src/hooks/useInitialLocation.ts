import {
  getCurrentNearestRegion,
  promptOpenLocationSettings,
  shouldOpenLocationSettings,
} from "@/services/location";
import { getFetchWeatherData } from "@/services/weather-api";
import { syncLocationWeatherToWidget } from "@/services/widget-update";
import { useRegionsStore } from "@/stores/regionsStore";
import { useWeatherStore } from "@/stores/weather";
import { useEffect } from "react";

/**
 * 앱 시작 시 현재 위치를 받아 가장 가까운 지역·날씨로 초기화합니다.
 * 위치 서비스/권한이 꺼져 있을 때만 설정으로 안내합니다.
 */
export function useInitialLocation() {
  const setSelectedRegion = useRegionsStore((s) => s.setSelectedRegion);
  const setWeatherData = useWeatherStore((s) => s.setWeatherData);

  useEffect(() => {
    const init = async () => {
      try {
        const result = await getCurrentNearestRegion();

        if (!result.ok) {
          if (shouldOpenLocationSettings(result.reason)) {
            promptOpenLocationSettings(result.reason);
          }
          return;
        }

        // Zustand는 unmount 후에도 안전하게 갱신 가능 (Strict Mode 취소로 결과 버리지 않음)
        setSelectedRegion(result.region);

        const weatherData = await getFetchWeatherData(
          result.region.lat,
          result.region.long,
        );

        setWeatherData(weatherData);
        await syncLocationWeatherToWidget({
          temperature: weatherData.current.temperature,
          weatherCode: weatherData.current.weatherCode,
          districtName: result.region.districtName,
        });
      } catch {
        // 초기 위치/날씨 로드 실패 시 조용히 무시 (수동 지역 선택 가능)
      }
    };

    init();
  }, [setSelectedRegion, setWeatherData]);
}
