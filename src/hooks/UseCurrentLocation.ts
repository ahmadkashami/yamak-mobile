import { Alert } from "react-native";
import { useCallback, useState } from "react";

import {
  getCurrentPositionAsync,
  LocationObject,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";

const UseCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lon: number;
  }>({ lat: 0, lon: 0 });
  const [locationPermissinInformation, requestPermission] =
    useForegroundPermissions();
  const getLocation = useCallback(() => {
    async function verfiyPermission(): Promise<boolean> {
      if (
        locationPermissinInformation?.status === PermissionStatus.UNDETERMINED
      ) {
        console.log("here asking");

        const permissonResponse = await requestPermission();
        return permissonResponse.granted;
      }
      if (locationPermissinInformation?.status === PermissionStatus.DENIED) {
        Alert.alert(
          "Missing Permissins!",
          "you need to grant permisson to user this app"
        );
        return false;
      }
      return true;
    }
    async function getLocationHandler() {
      const hasPermission = await verfiyPermission();
      if (!hasPermission) return;
      const location: LocationObject = await getCurrentPositionAsync();
      // setCurrentLocation({
      //   lat: location.coords.latitude,
      //   lon: location.coords.longitude,
      // });
      return location;
    }
    return getLocationHandler();

    // return currentLocation;
  }, [currentLocation]);

  return getLocation;
};
export default UseCurrentLocation;
