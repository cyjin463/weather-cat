import AppHeader from "@/components/organisms/Header";
import { BACKGROUND_IMAGE } from "@/constants/commons";
import { useInitialLocation } from "@/hooks/useInitialLocation";
import { registerWeatherBackgroundTask } from "@/tasks/weather-background-task";
import { Asset } from "expo-asset";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);
  useInitialLocation();

  useEffect(() => {
    let cancelled = false;

    async function prepare() {
      try {
        await Asset.fromModule(BACKGROUND_IMAGE).downloadAsync();
      } catch { }
      finally {
        if (!cancelled) {
          setAppReady(true);
          await SplashScreen.hideAsync();
          void registerWeatherBackgroundTask();
        }
      }
    }

    void prepare();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!appReady) {
    return null;
  }

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
