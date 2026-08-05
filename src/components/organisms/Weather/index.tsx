import WeatherTabs from "@/components/molecules/WeatherTabs";
import { useWeatherStore, useWeatherTabsStore } from "@/stores/weather";
import { ActivityIndicator, View } from "react-native";
import WeatherCurrent from "../WeatherCurrent";
import WeatherTodayHourList from "../WeatherTodayHourList";
import WeatherWeekList from "../WeatherWeekList";

const Weather = () => {
  const { tab } = useWeatherTabsStore();
  const { weatherData } = useWeatherStore();

  if (!weatherData) {
    return <ActivityIndicator size="large" color="#000000" />
  }

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <WeatherCurrent />
      <View style={{ width: "100%", height: 1, backgroundColor: "#A7A7A760", marginVertical: 5 }} />
      <WeatherTabs />
      {tab === "today" && <WeatherTodayHourList />}
      {tab === "week" && <WeatherWeekList />}
    </View>
  );
};

export default Weather;