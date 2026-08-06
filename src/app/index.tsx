import RegionSelectBtns from "@/components/molecules/RegionSelectBtns";
import Modal from "@/components/organisms/Modal";
import Weather from "@/components/organisms/Weather";
import { BACKGROUND_ASPECT, BACKGROUND_COLOR, BACKGROUND_IMAGE } from "@/constants/commons";
import { Image } from "expo-image";
import { Platform, ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";

export default function Index() {
  const { width, height } = useWindowDimensions();
  const bgHeight = width / BACKGROUND_ASPECT;

  const bannerId = __DEV__ ? TestIds.ADAPTIVE_BANNER : "ca-app-pub-8531978728505043/2693791107";

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
        cachePolicy="memory-disk"
        priority="high"
      />
      <View style={{ height: height * 0.3 }} />
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
      {Platform.OS !== "web" && (
        <View style={{ alignItems: "center", paddingBottom: 8 }}>
          <BannerAd
            unitId={bannerId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{ requestNonPersonalizedAdsOnly: true }}
          />
        </View>
      )}
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
