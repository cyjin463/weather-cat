import { regions } from "@/constants/regions";

/** 중복 없는 시/도 이름 목록 */
export const getCityNameList = (): string[] => {
  const cityNameList = regions.map((region) => region.cityName);
  return [...new Set(cityNameList)];
};

/** 특정 시/도에 속한 시/군/구 이름 목록 */
export const getDistrictNameList = (cityName: string): string[] => {
  return regions
    .filter((region) => region.cityName === cityName)
    .map((region) => region.districtName);
};
