import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Region } from "@/types/region";
import type { WeatherCurrent } from "@/types/weather";

const WIDGET_WEATHER_KEY = "weather-cat/widget-weather";

export type WidgetWeatherSnapshot = {
  temperature: string;
  weatherCode: number;
  districtName: string;
  /** 지역 비교용. 구버전 스냅샷에는 없을 수 있음 */
  cityName?: string;
};

export async function saveWidgetWeather(
  snapshot: WidgetWeatherSnapshot,
): Promise<void> {
  await AsyncStorage.setItem(WIDGET_WEATHER_KEY, JSON.stringify(snapshot));
}

export async function loadWidgetWeather(): Promise<WidgetWeatherSnapshot | null> {
  const raw = await AsyncStorage.getItem(WIDGET_WEATHER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as WidgetWeatherSnapshot;
  } catch {
    return null;
  }
}

/** 이전 스냅샷과 GPS 현재 지역이 같은지 (시+구) */
export function isSameWidgetRegion(
  prev: WidgetWeatherSnapshot | null,
  region: Region,
): boolean {
  if (!prev?.cityName) return false;
  return (
    prev.cityName === region.cityName &&
    prev.districtName === region.districtName
  );
}

/**
 * 이전 지역 == 현재 지역 → 온도·weatherCode만 갱신, 지역명 유지
 * 다름 / 이전 없음 → 현재 지역 기준으로 전부 갱신
 */
export function buildWidgetSnapshot(
  prev: WidgetWeatherSnapshot | null,
  region: Region,
  weather: WeatherCurrent,
): WidgetWeatherSnapshot {
  if (isSameWidgetRegion(prev, region) && prev) {
    return {
      ...prev,
      cityName: prev.cityName ?? region.cityName,
      temperature: weather.temperature,
      weatherCode: weather.weatherCode,
    };
  }

  return {
    cityName: region.cityName,
    districtName: region.districtName,
    temperature: weather.temperature,
    weatherCode: weather.weatherCode,
  };
}
