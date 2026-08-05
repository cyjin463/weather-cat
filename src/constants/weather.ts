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
  | "thunder"
  | "rainThunder"
  | "wind";

/** 카테고리 -> 고양이 이미지 리소스 (앱 본문용) */
export const WEATHER_IMAGES: Record<WeatherImageKey, ImageSourcePropType> = {
  sun: require("@/assets/images/weather/weather-sun.png"), // 맑음
  cloudy: require("@/assets/images/weather/weather-cloudy.png"), // 흐림/안개
  rain: require("@/assets/images/weather/weather-rain.png"), // 비/이슬비/소나기
  rainSnow: require("@/assets/images/weather/weather-rain-snow.png"), // 진눈깨비/어는 비
  winter: require("@/assets/images/weather/weather-winter.png"), // 눈
  hail: require("@/assets/images/weather/weather-hail.png"), // 우박(뇌우 동반)
  thunder: require("@/assets/images/weather/weather-thunder.png"), // 천둥(비 없는 뇌우) - 코드 직접 매칭 없음
  rainThunder: require("@/assets/images/weather/weather-rain-thunder.png"), // 비를 동반한 뇌우
  wind: require("@/assets/images/weather/weather-wind.png"), // 강풍 - weather_code 없음(wind_speed로 판단)
};

/** 홈 위젯용 — 분홍 안내판 + 큰 고양이 (텍스트는 위젯에서 오버레이) */
export const WIDGET_WEATHER_IMAGES: Record<
  WeatherImageKey,
  ImageSourcePropType
> = {
  sun: require("@/assets/images/weather/widget/weather-sun.png"),
  cloudy: require("@/assets/images/weather/widget/weather-cloudy.png"),
  rain: require("@/assets/images/weather/widget/weather-rain.png"),
  rainSnow: require("@/assets/images/weather/widget/weather-rain-snow.png"),
  winter: require("@/assets/images/weather/widget/weather-winter.png"),
  hail: require("@/assets/images/weather/widget/weather-hail.png"),
  thunder: require("@/assets/images/weather/widget/weather-thunder.png"),
  rainThunder: require("@/assets/images/weather/widget/weather-rain-thunder.png"),
  wind: require("@/assets/images/weather/widget/weather-wind.png"),
};

/**
 * weather_code -> 고양이 이미지 카테고리 매칭
 * 참고:
 * - weather-thunder(비 없는 천둥)와 weather-wind(강풍)는 WMO weather_code에
 *   대응되는 코드가 없습니다.
 *   · 뇌우(95/96/99)는 보통 강수를 동반하므로 rainThunder/hail로 매칭했습니다.
 *   · 강풍은 weather_code가 아닌 wind_speed_10m 값으로 별도 판단해야 합니다.
 */
export const WEATHER_CODE_TO_IMAGE: Record<number, WeatherImageKey> = {
  // 맑음
  0: "sun",
  1: "sun",

  // 구름/안개
  2: "cloudy",
  3: "cloudy",
  45: "cloudy",
  48: "cloudy",

  // 이슬비
  51: "rain",
  53: "rain",
  55: "rain",

  // 어는 이슬비 -> 진눈깨비
  56: "rainSnow",
  57: "rainSnow",

  // 비
  61: "rain",
  63: "rain",
  65: "rain",

  // 어는 비 -> 진눈깨비
  66: "rainSnow",
  67: "rainSnow",

  // 눈
  71: "winter",
  73: "winter",
  75: "winter",
  77: "winter",

  // 소나기
  80: "rain",
  81: "rain",
  82: "rain",

  // 소낙눈
  85: "winter",
  86: "winter",

  // 뇌우
  95: "rainThunder",
  96: "hail",
  99: "hail",
};
