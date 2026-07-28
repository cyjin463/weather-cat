import { useWeatherStore } from "@/stores/weather";
import { getWeatherImage } from "@/utils/weather";
import { FlatList, Image, Text, View } from "react-native";

const WeatherSection = () => {
  const { weatherData } = useWeatherStore();

  const checkIsToday = (date: string) => {
    const today = new Date().toISOString().split("T")[0];
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

  if (!weatherData) {
    return null;
  }

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <View style={{ width: "100%", alignItems: "center", gap: 3 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>현재 날씨</Text>
        <Image
         source={getWeatherImage(weatherData?.current.weatherCode ?? 0)}
         style={{ width: 80, height: 80, borderRadius: 20 }}
        />
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{weatherData?.current.temperature}</Text>
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
              <Text style={{ fontSize: 16 }}>최고:</Text>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.tempMax}</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text style={{ fontSize: 16 }}>최저:</Text>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.tempMin}</Text>
            </View>
          </View>
         )}
        />
      </View>
    </View>
  );
};


export default WeatherSection