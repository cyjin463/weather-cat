import TodayTemperatureItem from "@/components/atoms/TodayTemperatureItem";
import WeekTemperatureItem from "@/components/atoms/WeekTemperatureItem";
import { useWeatherTabsStore } from "@/stores/weather";
import { getWeatherImage } from "@/utils/weather";
import { Image, Text, View } from "react-native";

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
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{date}</Text>
      <Image source={getWeatherImage(weatherCode)} style={{ width: 80, height: 80, borderRadius: 10 }} />
      {tab === "today" && <TodayTemperatureItem temperature={temperature ?? ""} />}
      {tab === "week" && <WeekTemperatureItem tempMax={tempMax ?? ""} tempMin={tempMin ?? ""} />}
    </View>
  );
};

export default WeatherItemCard;