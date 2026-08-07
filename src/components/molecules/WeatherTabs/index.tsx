import { WEATHER_COLORS } from "@/constants/weather";
import { useWeatherTabsStore } from "@/stores/weather";
import { Pressable, StyleSheet, Text, View } from "react-native";

const WeatherTabs = () => {
  const { tab, setTab } = useWeatherTabsStore();
  return (
    <View style={{ width: "100%", justifyContent: "flex-end", flexDirection: "row", gap: 10 }}>
      <Pressable onPress={() => setTab("today")} style={[styles.tab, tab === "today" && styles.tabActive]}>
        <Text style={[styles.tabText, tab === "today" && styles.tabTextActive]}>오늘</Text>
      </Pressable>
      <Pressable onPress={() => setTab("week")} style={[styles.tab, tab === "week" && styles.tabActive]}>
        <Text style={[styles.tabText, tab === "week" && styles.tabTextActive]}>이번 주</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: `${WEATHER_COLORS.cold}90`,
  },
  tabActive: {
    borderColor: WEATHER_COLORS.warm,
  },
  tabText: {
    fontSize: 14,
    color: `${WEATHER_COLORS.cold}90`,
  },
  tabTextActive: {
    color: WEATHER_COLORS.warm,
    fontWeight: "bold",
  },
});

export default WeatherTabs;
