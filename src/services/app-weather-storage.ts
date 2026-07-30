import type { Region } from "@/types/region";
import type { WeatherData } from "@/types/weather";
import AsyncStorage from "@react-native-async-storage/async-storage";

const APP_WEATHER_KEY = "weather-cat/app-weather";

export type AppWeatherCache = {
  region: Region;
  weatherData: WeatherData;
  updatedAt: number;
};

export async function saveAppWeatherCache(
  region: Region,
  weatherData: WeatherData,
): Promise<void> {
  const payload: AppWeatherCache = {
    region,
    weatherData,
    updatedAt: Date.now(),
  };
  await AsyncStorage.setItem(APP_WEATHER_KEY, JSON.stringify(payload));
}

export async function loadAppWeatherCache(): Promise<AppWeatherCache | null> {
  const raw = await AsyncStorage.getItem(APP_WEATHER_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as AppWeatherCache;
    if (!parsed?.region || !parsed?.weatherData) return null;
    return parsed;
  } catch {
    return null;
  }
}
