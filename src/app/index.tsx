import RegionSelectBtns from "@/components/molecules/RegionSelectBtns";
import Modal from "@/components/organisms/Modal";
import Weather from "@/components/organisms/Weather";
import { BACKGROUND_ASPECT, BACKGROUND_COLOR, BACKGROUND_IMAGE } from "@/constants/commons";
import { Image } from "expo-image";
import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";

export default function Index() {
  const { width, height } = useWindowDimensions();
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
      <View style={{ height: height * 0.35 }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 32,
          gap: 16,
          flexGrow: 1,
        }}
      >
        <RegionSelectBtns />
        <Weather />
      </ScrollView>
      <Modal />
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
