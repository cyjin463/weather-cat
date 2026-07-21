import CityNameSelectModal from "@/components/molecules/CityNameSelectModal";
import DistrictNameSelectModal from "@/components/molecules/DistrictNameSelectModal";
import { useModalStore } from "@/stores/modalStore";

const Modal = () => {
  const { openModal } = useModalStore();
  
  if (openModal === "CITY_NAME_LIST") {
    return <CityNameSelectModal />;
  }
  if (openModal === "DISTRICT_NAME_LIST") {
    return <DistrictNameSelectModal />;
  }
  return null;
};

export default Modal;