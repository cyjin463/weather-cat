import RegionSelectBtns from "@/components/molecules/RegionSelectBtns";
import Modal from "@/components/organisms/Modal";
import WeatherSection from "@/components/organisms/WeatherSection";
import { BACKGROUND_IMAGE } from "@/constants/commons";
import { Dimensions, ImageBackground, ScrollView, View } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function Index() {
  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      style={{ width: "100%", height: "100%" }}
      resizeMode="cover"
    >
      <View style={{ height: SCREEN_HEIGHT * 0.25 }} />
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
        <WeatherSection />
      </ScrollView>
      <Modal />
    </ImageBackground>
  );
}