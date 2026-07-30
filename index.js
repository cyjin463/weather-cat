import { registerWidgetTaskHandler } from "react-native-android-widget";
import { widgetTaskHandler } from "./src/widgets/widget-task-handler";
// TaskManager.defineTask는 앱 부트 전 전역 등록 필요
import "./src/tasks/weather-background-task";

registerWidgetTaskHandler(widgetTaskHandler);

// Always register handler before Expo Router boots
import "expo-router/entry";
