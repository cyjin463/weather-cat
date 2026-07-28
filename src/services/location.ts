import { findNearestRegion } from "@/utils/regions";
import { Region } from "@/types/region";
import * as Location from "expo-location";

export type CurrentLocationResult = {
  region: Region;
  latitude: number;
  longitude: number;
};

/**
 * 위치 권한을 요청하고, 현재 위치와 가장 가까운 지역을 반환합니다.
 * 권한이 없거나 위치를 못 가져오면 null.
 */
export async function getCurrentNearestRegion(): Promise<CurrentLocationResult | null> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== Location.PermissionStatus.GRANTED) {
    return null;
  }

  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  const { latitude, longitude } = position.coords;
  const region = findNearestRegion(latitude, longitude);

  return { region, latitude, longitude };
}
