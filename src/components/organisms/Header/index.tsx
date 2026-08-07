import { HEADER_HEIGHT, LOGO_IMAGE } from "@/constants/commons";
import { HeaderProps } from "@/types/header";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AppHeader = ({ back, onBack }: HeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top, backgroundColor: "transparent" }}>
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
          contentFit="contain"
          style={{ height: 34, width: "70%" }}
          cachePolicy="memory-disk"
        />
      </View>
    </View>
  );
};

export default AppHeader;
