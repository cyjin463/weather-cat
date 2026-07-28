import { HEADER_HEIGHT, HEADER_IMAGE, LOGO_IMAGE } from "@/constants/commons";
import { HeaderProps } from "@/types/header";
import { Image, ImageBackground, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AppHeader = ({ title, back, onBack }: HeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      source={HEADER_IMAGE}
      resizeMode="cover"
      style={{ paddingTop: insets.top, width: "100%", height: "100%" }}
    >
      <View
        style={{
          height: HEADER_HEIGHT,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {back ? (
          <Pressable
            onPress={onBack}
            hitSlop={10}
            style={{ position: "absolute", left: 12 }}
          >
            <Text style={{ fontSize: 26, color: "#5A4A4C" }}>‹</Text>
          </Pressable>
        ) : null}
        <Image
          source={LOGO_IMAGE}
          resizeMode="contain"
          style={{ height: 34, width: "100%" }}
        />
      </View>
    </ImageBackground>
  );
};

export default AppHeader;
