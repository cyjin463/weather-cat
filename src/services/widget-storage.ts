import AsyncStorage from "@react-native-async-storage/async-storage";

const WIDGET_WEATHER_KEY = "weather-cat/widget-weather";

export type WidgetWeatherSnapshot = {
  temperature: string;
  weatherCode: number;
  districtName: string;
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
