import AppHeader from "@/components/organisms/Header";
import { useInitialLocation } from "@/hooks/useInitialLocation";
import { refreshWidgetFromCurrentLocation } from "@/services/widget-update";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useInitialLocation();

  useEffect(() => {
    SplashScreen.hideAsync();
    // 위젯은 항상 현재 위치 기준으로 갱신
    refreshWidgetFromCurrentLocation().catch(() => {
      // 위젯 갱신 실패 무시
    });
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerTransparent: true,
          header: () => <AppHeader />,
          contentStyle: { backgroundColor: "transparent" },
        }}
      />
    </>
  );
}
