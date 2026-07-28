import {
  BACKGROUND_ASPECT,
  BACKGROUND_COLOR,
  BACKGROUND_IMAGE,
  HEADER_HEIGHT,
} from "@/constants/commons";
import { Image } from "expo-image";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Settings() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const bgHeight = width / BACKGROUND_ASPECT;

  return (
    <View style={styles.container}>
      <Image
        source={BACKGROUND_IMAGE}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width,
          height: bgHeight,
        }}
        contentFit="fill"
      />
      <View
        style={{
          flex: 1,
          paddingTop: insets.top + HEADER_HEIGHT + 16,
          paddingHorizontal: 16,
          gap: 12,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>설정</Text>
        {/* TODO: 설정 항목 추가 */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: BACKGROUND_COLOR,
  },
});
