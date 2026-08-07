import WeatherItemCard from "@/components/molecules/WeatherItemCard";
import { useWeatherStore } from "@/stores/weather";
import { WeatherData, WeatherHourly } from "@/types/weather";
import { ScrollView, View } from "react-native";

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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ width: "100%" }}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 15 }}
      >
        {hourlyToday.map((item) => {
          const { date, hour, weatherCode, temperature } = item as WeatherHourly;
          return (
            <WeatherItemCard
              key={`${date}-${hour}`}
              date={formatHour(date, hour)}
              weatherCode={weatherCode}
              temperature={temperature}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default WeatherTodayHourList;
