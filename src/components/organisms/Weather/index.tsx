import { useWeatherStore } from "@/stores/weather";
import { getWeatherImage } from "@/utils/weather";
import { useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";

const Weather = () => {
  const [tab, setTab] = useState<"today" | "wddk">("today");
  const { weatherData } = useWeatherStore();
  const { temperature: currentTemperature } = weatherData?.current ?? {};
  console.log(weatherData?.hourlyToday);

  if (!weatherData) {
    return null;
  }

  const checkIsToday = (date: string) => {
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
     <View style={{ width: "100%", justifyContent: "flex-end", flexDirection: "row", gap: 10 }}>
      <Pressable onPress={() => setTab("today")} style={{paddingVertical: 2, paddingHorizontal: 5, borderWidth: 1, borderRadius: 10}}>
        <Text>오늘</Text>
      </Pressable>
      <Pressable onPress={() => setTab("wddk")} style={{paddingVertical: 2, paddingHorizontal: 5, borderWidth: 1, borderRadius: 10}}>
        <Text>이번주</Text>
      </Pressable>
     </View>
     {tab === "today" && (
      <View style={{ width: "100%", paddingTop: 5 }}>
        <FlatList
         data={weatherData?.hourlyToday}
         keyExtractor={(item) => item.hour.toString()}
         horizontal
         showsHorizontalScrollIndicator={false}
         style={{ width: "100%" }}
         contentContainerStyle={{ gap: 12, paddingHorizontal: 15 }}
         renderItem={({ item }) => (
          <View style={{ alignItems: "center", gap: 4 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.hour}시</Text>
            <Image source={getWeatherImage(item.weatherCode)} style={{ width: 80, height: 80, borderRadius: 10 }} />
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#5A4A4C" }}></Text>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#F58CA0" }}>{item.temperature}</Text>
            </View>
          </View>
         )}
        />
      </View>
     )}
     {tab === "wddk" && (
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
     )}
    </View>
  );
};


export default Weather;