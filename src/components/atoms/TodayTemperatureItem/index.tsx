import { getCurrentTemperatureColor } from "@/utils/weather";
import { Text, View } from "react-native";

interface TodayTemperatureItemProps {
  temperature: string;
}

const TodayTemperatureItem = ({ temperature }: TodayTemperatureItemProps) => {
  return (
    <View style={{ flexDirection: "row", gap: 4 }}>
      <Text style={{ fontSize: 16, fontWeight: "bold", color: getCurrentTemperatureColor(temperature) }}>{temperature}</Text>
    </View>
  );
};

export default TodayTemperatureItem;