import { regions } from "@/constants/regions";
import { Region } from "@/types/region";

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

const toRad = (deg: number) => (deg * Math.PI) / 180;

/** 두 좌표 사이 거리(km) — Haversine */
export const getDistanceKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

/** 현재 좌표와 가장 가까운 시/군/구 */
export const findNearestRegion = (lat: number, lon: number): Region => {
  let nearest = regions[0];
  let minDistance = Number.POSITIVE_INFINITY;

  for (const region of regions) {
    const distance = getDistanceKm(
      lat,
      lon,
      Number(region.lat),
      Number(region.long),
    );
    if (distance < minDistance) {
      minDistance = distance;
      nearest = region;
    }
  }

  return nearest;
};
