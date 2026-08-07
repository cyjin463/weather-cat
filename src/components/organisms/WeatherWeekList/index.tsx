import WeatherItemCard from "@/components/molecules/WeatherItemCard";
import { useWeatherStore } from "@/stores/weather";
import { WeatherDaily, WeatherData } from "@/types/weather";
import { ScrollView, View } from "react-native";

const WeatherWeekList = () => {
  const { daily, timezone } = useWeatherStore().weatherData as WeatherData;

  if (!daily) {
    return null;
  }

  const checkIsToday = (date: string) => {
    const today = new Date().toLocaleDateString("en-CA", {
      timeZone: timezone || "Asia/Seoul",
    });
    return date === today;
  };

  const formatDate = (date: string) => {
    if (checkIsToday(date)) {
      return "오늘";
    }

    const month = parseInt(date.split("-")[1]);
    const day = parseInt(date.split("-")[2]);
    return `${month}/${day}`;
  };

  const getDayOfTheWeek = (date: string) => {
    return new Date(`${date}T12:00:00`)
      .toLocaleDateString("ko-KR", {
        weekday: "long",
        timeZone: timezone || "Asia/Seoul",
      })
      .slice(0, 1);
  };

  return (
    <View style={{ width: "100%", paddingTop: 5 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ width: "100%" }}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 15 }}
      >
        {daily.map((item) => {
          const { date, weatherCode, tempMax, tempMin } = item as WeatherDaily;
          return (
            <WeatherItemCard
              key={date}
              date={formatDate(date)}
              dayOfTheWeek={getDayOfTheWeek(date)}
              weatherCode={weatherCode}
              tempMax={tempMax}
              tempMin={tempMin}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default WeatherWeekList;
