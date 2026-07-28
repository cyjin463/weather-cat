import RegionSelectBtns from "@/components/molecules/RegionSelectBtns";
import Modal from "@/components/organisms/Modal";
import Weather from "@/components/organisms/Weather";
import { BACKGROUND_IMAGE } from "@/constants/commons";
import { ImageBackground, ScrollView, useWindowDimensions, View } from "react-native";

export default function Index() {
  const { height } = useWindowDimensions();

  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      style={{ flex: 1, width: "100%" }}
      resizeMode="cover"
    >
      <View style={{ height: height * 0.3 }} />
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
          paddingHorizontal: 32,
          gap: 16,
        }}
      >
        <RegionSelectBtns />
        <Weather />
      </ScrollView>
      <Modal />
    </ImageBackground>
  );
}
