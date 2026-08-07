import { ImageSourcePropType } from "react-native";

export const WEATHER_COLORS = {
  warm: "#F58CA0",
  cold: "#78B4EB",
};

/**
 * Open-Meteo(WMO) weather_code 목록과 한글 설명
 * https://open-meteo.com/en/docs (WMO Weather interpretation codes)
 */
export const WEATHER_CODES: Record<number, string> = {
  0: "맑음",
  1: "대체로 맑음",
  2: "부분적으로 흐림",
  3: "흐림",
  45: "안개",
  48: "짙은(착빙) 안개",
  51: "약한 이슬비",
  53: "이슬비",
  55: "강한 이슬비",
  56: "약한 어는 이슬비",
  57: "강한 어는 이슬비",
  61: "약한 비",
  63: "비",
  65: "강한 비",
  66: "약한 어는 비",
  67: "강한 어는 비",
  71: "약한 눈",
  73: "눈",
  75: "강한 눈",
  77: "싸락눈",
  80: "약한 소나기",
  81: "소나기",
  82: "강한 소나기",
  85: "약한 소낙눈",
  86: "강한 소낙눈",
  95: "뇌우",
  96: "뇌우(약한 우박 동반)",
  99: "뇌우(강한 우박 동반)",
};

/** 고양이 일러스트 카테고리 키 */
export type WeatherImageKey =
  | "sun"
  | "cloudy"
  | "rain"
  | "rainSnow"
  | "winter"
  | "hail"
  | "rainThunder";

/** 카테고리 -> 고양이 이미지 리소스 (앱 본문용) */
export const WEATHER_IMAGES: Record<WeatherImageKey, ImageSourcePropType> = {
  sun: require("@/assets/images/weather/weather-sun.webp"),
  cloudy: require("@/assets/images/weather/weather-cloudy.webp"),
  rain: require("@/assets/images/weather/weather-rain.webp"),
  rainSnow: require("@/assets/images/weather/weather-rain-snow.webp"),
  winter: require("@/assets/images/weather/weather-winter.webp"),
  hail: require("@/assets/images/weather/weather-hail.webp"),
  rainThunder: require("@/assets/images/weather/weather-rain-thunder.webp"),
};

/** 홈 위젯용 — 분홍 안내판 + 큰 고양이 (텍스트는 위젯에서 오버레이) */
export const WIDGET_WEATHER_IMAGES: Record<
  WeatherImageKey,
  ImageSourcePropType
> = {
  sun: require("@/assets/images/weather/widget/weather-sun.webp"),
  cloudy: require("@/assets/images/weather/widget/weather-cloudy.webp"),
  rain: require("@/assets/images/weather/widget/weather-rain.webp"),
  rainSnow: require("@/assets/images/weather/widget/weather-rain-snow.webp"),
  winter: require("@/assets/images/weather/widget/weather-winter.webp"),
  hail: require("@/assets/images/weather/widget/weather-hail.webp"),
  rainThunder: require("@/assets/images/weather/widget/weather-rain-thunder.webp"),
};

/**
 * weather_code -> 고양이 이미지 카테고리 매칭
 * 뇌우(95)는 강수 동반으로 rainThunder, 우박 동반(96/99)은 hail로 매칭합니다.
 */
export const WEATHER_CODE_TO_IMAGE: Record<number, WeatherImageKey> = {
  0: "sun",
  1: "sun",
  2: "cloudy",
  3: "cloudy",
  45: "cloudy",
  48: "cloudy",
  51: "rain",
  53: "rain",
  55: "rain",
  56: "rainSnow",
  57: "rainSnow",
  61: "rain",
  63: "rain",
  65: "rain",
  66: "rainSnow",
  67: "rainSnow",
  71: "winter",
  73: "winter",
  75: "winter",
  77: "winter",
  80: "rain",
  81: "rain",
  82: "rain",
  85: "winter",
  86: "winter",
  95: "rainThunder",
  96: "hail",
  99: "hail",
};
