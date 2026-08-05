import { WeatherData } from "@/types/weather";
import { create } from "zustand";

/** 날씨 데이터 관리 */
export interface WeatherStore {
  weatherData: WeatherData | null;
  setWeatherData: (weatherData: WeatherData | null) => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  weatherData: null,
  setWeatherData: (weatherData: WeatherData | null) => set({ weatherData }),
}));

/** 날씨 탭 관리 */
export interface WeatherTabsStore {
  tab: "today" | "week";
  setTab: (tab: "today" | "week") => void;
}

export const useWeatherTabsStore = create<WeatherTabsStore>((set) => ({
  tab: "today",
  setTab: (tab: "today" | "week") => set({ tab }),
}));