import { regions } from "../constants/regions";

export const useGetCityNameList = () => {
    const cityNameList = regions.map(region => region.cityName);
    const uniqueCityNameList = [...new Set(cityNameList)];
    return uniqueCityNameList;
}

export const useGetDistrictNameList = (cityName: string) => {
    const districtNameList = regions.filter(region => region.cityName === cityName).map(region => region.districtName);
    return districtNameList;
}