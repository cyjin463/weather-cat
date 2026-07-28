import { WeatherData } from "@/types/weather";
import { create } from "zustand";

export interface WeatherStore {
    weatherData: WeatherData | null;
    setWeatherData: (weatherData: WeatherData | null) => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
    weatherData: null,
    setWeatherData: (weatherData: WeatherData | null) => set({ weatherData }),
}));