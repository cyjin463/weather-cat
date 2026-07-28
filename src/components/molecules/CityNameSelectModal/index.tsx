import { useModalStore } from "@/stores/modalStore";
import { useRegionsStore } from "@/stores/regionsStore";
import { getCityNameList } from "@/utils/regions";
import { FlatList, Modal, Pressable, Text, View } from "react-native";

const CityNameSelectModal = () => {
  const { openModal, setOpenModal } = useModalStore();
  const { setSelectedRegion } = useRegionsStore();

  return (
    <Modal visible={openModal === "CITY_NAME_LIST"} transparent animationType="fade">
        <Pressable
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", padding: 24 }}
        onPress={() => setOpenModal(undefined)}
        >
        <View style={{ backgroundColor: "white", borderRadius: 12, maxHeight: 400 }}>
            <FlatList
            data={getCityNameList()}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
                <Pressable
                onPress={() => {
                    setSelectedRegion({ id: 0, cityName: item, districtName: "", lat: "", long: "" });
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


export default CityNameSelectModal