import WeatherItemCard from "@/components/molecules/WeatherItemCard";
import { useWeatherStore } from "@/stores/weather";
import { WeatherData, WeatherHourly } from "@/types/weather";
import { FlatList, View } from "react-native";

const WeatherTodayHourList = () => {
  const weatherData = useWeatherStore().weatherData as WeatherData | null;
  const hourlyToday = weatherData?.hourlyToday;

  if (!hourlyToday) {
    return null;
  }

  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: weatherData.timezone,
  });

  const formatHour = (date: string, hour: number) => {
    if (hour === 0 && date !== today) return `내일`;
    if (hour === 0) return `오전 12시`;
    if (hour < 12) return `오전 ${hour}시`;
    if (hour === 12) return `오후 12시`;
    return `오후 ${hour - 12}시`;
  };

  return (
    <View style={{ width: "100%", paddingTop: 5 }}>
      <FlatList
        data={hourlyToday}
        keyExtractor={(item) => `${item.date}-${item.hour}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ width: "100%" }}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 15 }}
        renderItem={({ item }) => {
          const { date, hour, weatherCode, temperature } = item as WeatherHourly;
          return (
            <WeatherItemCard date={formatHour(date, hour)} weatherCode={weatherCode} temperature={temperature} />
          )
        }}
      />
    </View>
  );
};

export default WeatherTodayHourList;