import {
  WEATHER_CODES,
  WEATHER_CODE_TO_IMAGE,
  WEATHER_IMAGES,
} from "@/constants/weather";
import { ImageSourcePropType } from "react-native";

/** weather_code에 대한 한글 설명 반환 (없으면 "알 수 없음") */
export const getWeatherLabel = (code: number): string => {
  return WEATHER_CODES[code] ?? "알 수 없음";
};

/** weather_code에 맞는 고양이 이미지 반환 (매칭 없으면 흐림 고양이) */
export const getWeatherImage = (code: number): ImageSourcePropType => {
  const key = WEATHER_CODE_TO_IMAGE[code] ?? "cloudy";
  return WEATHER_IMAGES[key];
};

export const getCurrentTemperatureColor = (temperature: string) => {
  const temperatureValue = parseInt(temperature);
  if (temperatureValue >= 20) {
    return "#F58CA0";
  }
  if (temperatureValue < 10) {
    return "#78B4EB";
  }
  return "#5A4A4C";
}