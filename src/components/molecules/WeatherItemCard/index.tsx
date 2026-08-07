import TodayTemperatureItem from "@/components/atoms/TodayTemperatureItem";
import WeekTemperatureItem from "@/components/atoms/WeekTemperatureItem";
import { WEATHER_COLORS } from "@/constants/weather";
import { useWeatherTabsStore } from "@/stores/weather";
import { getWeatherImage } from "@/utils/weather";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

interface WeatherItemCardProps {
  date: string;
  weatherCode: number;
  dayOfTheWeek?: string;
  temperature?: string;
  tempMax?: string;
  tempMin?: string;
}

const WeatherItemCard = ({ date, dayOfTheWeek, weatherCode, temperature, tempMax, tempMin }: WeatherItemCardProps) => {
  const { tab } = useWeatherTabsStore();
  const TextColor = date !== "오늘" ? (dayOfTheWeek === "토" ? styles.Saturday : dayOfTheWeek === "일" ? styles.Sunday : {}) : {};
  const TextStyle = [styles.date, TextColor, date === "내일" && styles.tomorrow];

  const formatDate = () => {
    if (tab === "week" && date !== "오늘") {
      return `${date}(${dayOfTheWeek})`;
    }
    return date;
  }

  return (
    <View style={{ alignItems: "center", gap: 4 }}>
      <Text style={TextStyle}>{formatDate()}</Text>
      <Image
        source={getWeatherImage(weatherCode)}
        style={{ width: 80, height: 80, borderRadius: 10 }}
        contentFit="cover"
        cachePolicy="memory-disk"
        recyclingKey={`weather-${weatherCode}`}
      />
      {tab === "today" && <TodayTemperatureItem temperature={temperature ?? ""} />}
      {tab === "week" && <WeekTemperatureItem tempMax={tempMax ?? ""} tempMin={tempMin ?? ""} />}
    </View>
  );
};

const styles = StyleSheet.create({
  date: {
    fontSize: 16,
    fontWeight: "bold",
  },
  Saturday: {
    color: `${WEATHER_COLORS.cold}`,
  },
  Sunday: {
    color: `${WEATHER_COLORS.warm}`,
  },
  tomorrow: {
    color: WEATHER_COLORS.warm,
  },
});

export default WeatherItemCard;