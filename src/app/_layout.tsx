import AppHeader from "@/components/organisms/Header";
import { useInitialLocation } from "@/hooks/useInitialLocation";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useInitialLocation();

  useEffect(() => {
    SplashScreen.hideAsync();
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
