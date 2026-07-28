"use no memo";

import {
  WEATHER_CODE_TO_IMAGE,
  WIDGET_WEATHER_IMAGES,
} from "@/constants/weather";
import { getWeatherLabel } from "@/utils/weather";
import type { ImageRequireSource } from "react-native";
import {
  FlexWidget,
  ImageWidget,
  OverlapWidget,
  TextWidget,
} from "react-native-android-widget";

export type WeatherCatWidgetProps = {
  temperature: string;
  weatherCode: number;
  districtName?: string;
};

/** 2×2 홈 위젯 (~160–180dp) */
export function WeatherCatWidget({
  temperature,
  weatherCode,
  districtName,
}: WeatherCatWidgetProps) {
  const key = WEATHER_CODE_TO_IMAGE[weatherCode] ?? "cloudy";
  const image = WIDGET_WEATHER_IMAGES[key] as ImageRequireSource;
  const weatherLabel = getWeatherLabel(weatherCode);

  return (
    <OverlapWidget
      clickAction="OPEN_APP"
      style={{
        height: "match_parent",
        width: "match_parent",
        backgroundColor: "#FFFFFF",
      }}
    >
      <ImageWidget
        image={image}
        imageWidth={180}
        imageHeight={180}
        resizeMode="cover"
        style={{
          height: "match_parent",
          width: "match_parent",
        }}
      />
      {/* 분홍 안내판 영역 — 구 / 온도 / 날씨 */}
      <FlexWidget
        style={{
          height: "match_parent",
          width: "match_parent",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 30,
        }}
      >
        <TextWidget
          text={districtName || "Weather Cat"}
          truncate="END"
          maxLines={1}
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#FFFFFF",
          }}
        />
        <TextWidget
          text={temperature || "--°"}
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "#FFFFFF",
          }}
        />
        <TextWidget
          text={weatherLabel}
          truncate="END"
          maxLines={1}
          style={{
            fontSize: 14,
            fontWeight: "bold",
            color: "#FFFFFF",
          }}
        />
      </FlexWidget>
    </OverlapWidget>
  );
}
