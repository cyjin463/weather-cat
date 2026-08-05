import RegionSelectBtn from "@/components/atoms/RegionSelectBtn";
import { useModalStore } from "@/stores/modalStore";
import { useRegionsStore } from "@/stores/regionsStore";
import { useWeatherStore } from "@/stores/weather";
import { View } from "react-native";

const RegionSelectBtns = () => {
  const { setOpenModal } = useModalStore();
  const { selectedRegion } = useRegionsStore();
console.log(useWeatherStore().weatherData?.hourlyToday)
  
  return (
    <View style={{ gap: 16, alignItems: "center" }}>
      <RegionSelectBtn
        onPress={() => setOpenModal("CITY_NAME_LIST")}
        text={selectedRegion?.cityName || "지역 선택"}
        color="#F58CA0"
      />
      <RegionSelectBtn
        disabled={!selectedRegion?.cityName}
        onPress={() => setOpenModal("DISTRICT_NAME_LIST")}
        text={selectedRegion?.districtName || "구 선택"}
        color="#78B4EB" />
    </View>
  );
};

export default RegionSelectBtns;