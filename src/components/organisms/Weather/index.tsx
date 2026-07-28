import { useWeatherStore } from "@/stores/weather";
import { getWeatherImage } from "@/utils/weather";
import { FlatList, Image, Text, View } from "react-native";

const Weather = () => {
  const { weatherData } = useWeatherStore();
  const { temperature: currentTemperature } = weatherData?.current ?? {};

  if (!weatherData) {
    return null;
  }

  const checkIsToday = (date: string) => {
    // 날씨 API(timezone=auto)와 같은 좌표 기준 타임존으로 "오늘" 비교
    const today = new Date().toLocaleDateString("en-CA", {
      timeZone: weatherData.timezone || "Asia/Seoul",
    });
    return date === today;
  }

  const formatDate = (date: string) => {
    if (checkIsToday(date)) {
      return "오늘";
    }

    const month = parseInt(date.split("-")[1]);
    const day = parseInt(date.split("-")[2]);
    return `${month}/${day}`;
  }

  const getCurrentTemperatureColor = (temperature: string) => {
    const temperatureValue = parseInt(temperature);
    if (temperatureValue > 20) {
      return "#F58CA0";
    }
    if (temperatureValue < 10) {
      return "#78B4EB";
    }
    return "#5A4A4C";
  }

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
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
      <View style={{ width: "100%", height: 1, backgroundColor: "#A7A7A7", marginVertical: 5 }} />
      <View style={{ width: "100%", paddingTop: 5 }}>
        <FlatList
         data={weatherData?.daily}
         keyExtractor={(item) => item.date}
         horizontal
         showsHorizontalScrollIndicator={false}
         style={{ width: "100%" }}
         contentContainerStyle={{ gap: 12, paddingHorizontal: 15 }}
         renderItem={({ item }) => (
          <View style={{ alignItems: "center", gap: 4 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{formatDate(item.date)}</Text>
            <Image source={getWeatherImage(item.weatherCode)} style={{ width: 80, height: 80, borderRadius: 10 }} />
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#5A4A4C" }}>최고:</Text>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#F58CA0" }}>{item.tempMax}</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#5A4A4C" }}>최저:</Text>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#78B4EB" }}>{item.tempMin}</Text>
            </View>
          </View>
         )}
        />
      </View>
    </View>
  );
};


export default Weather;