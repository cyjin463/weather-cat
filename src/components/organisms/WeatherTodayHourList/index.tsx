import WeatherItemCard from "@/components/molecules/WeatherItemCard";
import { useWeatherStore } from "@/stores/weather";
import { WeatherData, WeatherHourly } from "@/types/weather";
import { FlatList, View } from "react-native";

const WeatherTodayHourList = () => {
  const { hourlyToday } = useWeatherStore().weatherData as WeatherData;

  if (!hourlyToday) {
    return null;
  }

  const formatHour = (hour: number) => {
    if (hour > 12) {
      return `오후 ${hour - 12}시`;
    }
    return `오전 ${hour}시`;
  }

  return (
    <View style={{ width: "100%", paddingTop: 5 }}>
      <FlatList
        data={hourlyToday}
        keyExtractor={(item) => item.hour.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ width: "100%" }}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 15 }}
        renderItem={({ item }) => {
          const { hour, weatherCode, temperature } = item as WeatherHourly;
          return (
            <WeatherItemCard date={formatHour(hour)} weatherCode={weatherCode} temperature={temperature} />
          )
        }}
      />
    </View>
  );
};

export default WeatherTodayHourList;