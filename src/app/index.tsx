import { useGetCityNameList, useGetDistrictNameList } from "@/hooks/useRegions";
import { useEffect } from "react";
import { Text } from "react-native";

export default function Index() {
  const getCityNameList = () => {
    return useGetCityNameList();
  }
  const getDistrictNameList = (cityName: string) => {
    return useGetDistrictNameList(cityName);
  }

  useEffect(() => {
    const cityNameList = getCityNameList();
    const districtNameList = getDistrictNameList("서울특별시");
    console.log(cityNameList);
    console.log(districtNameList);
  }, []);

  return (
    <Text>Hello World</Text>
  );
}