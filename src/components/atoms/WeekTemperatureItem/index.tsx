import { WEATHER_COLORS } from "@/constants/weather";
import { Text, View } from "react-native";

interface WeekTemperatureItemProps {
  tempMax: string;
  tempMin: string;
}

const WeekTemperatureItem = ({ tempMax, tempMin }: WeekTemperatureItemProps) => {
  return (
    <>
      <View style={{ flexDirection: "row", gap: 4 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#5A4A4C" }}>최고:</Text>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: WEATHER_COLORS.warm }}>{tempMax}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 4 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#5A4A4C" }}>최저:</Text>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: WEATHER_COLORS.cold }}>{tempMin}</Text>
      </View>
    </>
  );
};

export default WeekTemperatureItem;