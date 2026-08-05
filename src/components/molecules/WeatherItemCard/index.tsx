import TodayTemperatureItem from "@/components/atoms/TodayTemperatureItem";
import WeekTemperatureItem from "@/components/atoms/WeekTemperatureItem";
import { WEATHER_COLORS } from "@/constants/weather";
import { useWeatherTabsStore } from "@/stores/weather";
import { getWeatherImage } from "@/utils/weather";
import { Image, StyleSheet, Text, View } from "react-native";

interface WeatherItemCardProps {
  date: string;
  weatherCode: number;
  temperature?: string;
  tempMax?: string;
  tempMin?: string;
}

const WeatherItemCard = ({ date, weatherCode, temperature, tempMax, tempMin }: WeatherItemCardProps) => {
  const { tab } = useWeatherTabsStore();

  return (
    <View style={{ alignItems: "center", gap: 4 }}>
      <Text style={[styles.date, date === "내일" && styles.tomorrow]}>{date}</Text>
      <Image source={getWeatherImage(weatherCode)} style={{ width: 80, height: 80, borderRadius: 10 }} />
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
  tomorrow: {
    color: WEATHER_COLORS.warm,
  },
});

export default WeatherItemCard;