import { Platform } from "react-native";

// TaskManager.defineTask는 앱 부트 전 전역 등록 필요
import "./src/tasks/weather-background-task";

if (Platform.OS === "android") {
  const { registerWidgetTaskHandler } = require("react-native-android-widget");
  const { widgetTaskHandler } = require("./src/widgets/widget-task-handler");
  registerWidgetTaskHandler(widgetTaskHandler);
}

// Always register handler before Expo Router boots
import "expo-router/entry";
