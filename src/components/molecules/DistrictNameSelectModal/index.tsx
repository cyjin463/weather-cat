import { regions } from "@/constants/regions";
import { getFetchWeatherData } from "@/services/weather-api";
import { useModalStore } from "@/stores/modalStore";
import { useRegionsStore } from "@/stores/regionsStore";
import { useWeatherStore } from "@/stores/weather";
import { getDistrictNameList } from "@/utils/regions";
import { FlatList, Modal, Pressable, Text, View } from "react-native";

const DistrictNameSelectModal = () => {
  const { openModal, setOpenModal } = useModalStore();
  const { selectedRegion, setSelectedRegion } = useRegionsStore();
  const { setWeatherData } = useWeatherStore();

  const selectDistrictName = async (districtName: string) => {
    const data = regions.filter(region => region.cityName === selectedRegion?.cityName && region.districtName === districtName);
    setSelectedRegion(data[0]);
    setOpenModal(undefined);
    const weatherData = await getFetchWeatherData(data[0].lat, data[0].long);
    setWeatherData(weatherData);
  }

  return (
    <Modal visible={openModal === "DISTRICT_NAME_LIST"} transparent animationType="fade">
        <Pressable
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", padding: 24 }}
        onPress={() => setOpenModal(undefined)}
        >
        <View style={{ backgroundColor: "white", borderRadius: 12, maxHeight: 400 }}>
            <FlatList
            data={getDistrictNameList(selectedRegion?.cityName ?? "")}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
                <Pressable
                onPress={() => {
                    selectDistrictName(item);
                    setOpenModal(undefined);
                }}
                style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: "#eee" }}
                >
                <Text>{item}</Text>
                </Pressable>
            )}
            />
        </View>
        </Pressable>
    </Modal>
  );
};


export default DistrictNameSelectModal