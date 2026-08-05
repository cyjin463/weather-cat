import { useWeatherStore } from "@/stores/weather";
import { getCurrentTemperatureColor, getWeatherImage } from "@/utils/weather";
import { Image, Text, View } from "react-native";

const WeatherCurrent = () => {
  const { weatherData } = useWeatherStore();
  const { temperature: currentTemperature } = weatherData?.current ?? {};

  if (!weatherData?.current) {
    return null;
  }

  return (
    <View style={{ width: "100%", alignItems: "center", gap: 4 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>지금 여기는</Text>
        <Image
         source={getWeatherImage(weatherData?.current.weatherCode ?? 0)}
         style={{ width: 80, height: 80, borderRadius: 20, marginTop: 4 }}
        />
        <Text style={{
          fontSize: 16,
          fontWeight: "bold",
          color: getCurrentTemperatureColor(currentTemperature ?? "0") }}
        >{currentTemperature}</Text>
      </View>
  );
};

export default WeatherCurrent;