import RegionSelectBtns from "@/components/molecules/RegionSelectBtns";
import Modal from "@/components/organisms/Modal";
import { BACKGROUND_IMAGE } from "@/constants/commons";
import { ImageBackground, View } from "react-native";

export default function Index() {
  return (
    <ImageBackground
    source={BACKGROUND_IMAGE}
    style={{width: "100%", height: "100%" }}
    resizeMode="cover"
  >
      <View style={{
          position: "absolute",
          top: "35%",
          left: 0,
          right: 0,
          paddingHorizontal: 32,
          gap: 16,}}>
        
        <RegionSelectBtns />
      <Modal />
      </View>
    </ImageBackground>
  );
}