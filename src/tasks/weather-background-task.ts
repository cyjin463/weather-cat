import * as BackgroundTask from "expo-background-task";
import * as TaskManager from "expo-task-manager";
import { Platform } from "react-native";
import { refreshWidgetFromCurrentLocation } from "@/services/widget-update";

export const WEATHER_WIDGET_BACKGROUND_TASK = "weather-cat-widget-refresh";

TaskManager.defineTask(WEATHER_WIDGET_BACKGROUND_TASK, async () => {
  try {
    if (Platform.OS !== "android") {
      return BackgroundTask.BackgroundTaskResult.Success;
    }

    await refreshWidgetFromCurrentLocation({ requestPermission: false });
    return BackgroundTask.BackgroundTaskResult.Success;
  } catch {
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
});

/** 위젯 GPS 날씨만 30분 주기로 best-effort 갱신 (앱 캐시와 무관) */
export async function registerWeatherBackgroundTask(): Promise<void> {
  if (Platform.OS !== "android") return;

  const isRegistered = await TaskManager.isTaskRegisteredAsync(
    WEATHER_WIDGET_BACKGROUND_TASK,
  );
  if (isRegistered) return;

  await BackgroundTask.registerTaskAsync(WEATHER_WIDGET_BACKGROUND_TASK, {
    minimumInterval: 30,
  });
}
