import { getFetchWeatherData } from "@/services/weather-api";
import { getCurrentNearestRegion } from "@/services/location";
import { useRegionsStore } from "@/stores/regionsStore";
import { useWeatherStore } from "@/stores/weather";
import { useEffect } from "react";

/**
 * 앱 시작 시 현재 위치를 받아 가장 가까운 지역·날씨로 초기화합니다.
 */
export function useInitialLocation() {
  const setSelectedRegion = useRegionsStore((s) => s.setSelectedRegion);
  const setWeatherData = useWeatherStore((s) => s.setWeatherData);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        const result = await getCurrentNearestRegion();
        if (!result || cancelled) return;

        setSelectedRegion(result.region);
        const weatherData = await getFetchWeatherData(
          result.region.lat,
          result.region.long,
        );
        if (!cancelled) {
          setWeatherData(weatherData);
        }
      } catch (error) {
        console.warn("초기 위치/날씨 로드 실패:", error);
      }
    };

    init();

    return () => {
      cancelled = true;
    };
  }, [setSelectedRegion, setWeatherData]);
}
