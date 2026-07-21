import RegionSelectBtn from "@/components/atoms/RegionSelectBtn";
import { useModalStore } from "@/stores/modalStore";
import { useRegionsStore } from "@/stores/regionsStore";
import { View } from "react-native";

const RegionSelectBtns = () => {
  const { setOpenModal } = useModalStore();
  const { selectedRegion } = useRegionsStore();
  
  return (
    <View style={{ gap: 16, alignItems: "center" }}>
      <RegionSelectBtn onPress={() => setOpenModal("CITY_NAME_LIST")} text={selectedRegion?.cityName || "지역 선택"} />
      <RegionSelectBtn onPress={() => setOpenModal("DISTRICT_NAME_LIST")} text={selectedRegion?.districtName || "구 선택"} />
    </View>
  );
};

export default RegionSelectBtns;