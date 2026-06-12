import { useNavigation } from "@react-navigation/native";
import { memo, useEffect } from "react";
import { FC, useRef, useState } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { ScreenNames } from "../../constants/ScreenNames";
import { useUserLocationStore } from "../../store/userLocation.store";
import { useLanguage } from "../../hooks/useLanguage.hook";
import AppSimpleLoader from "../ui/AppSimpleLoader";
import { ActivityIndicator } from "react-native";
import { AppColorsTheme2 } from "../../constants/Colors";


const AppMap: FC<MapProps> = ({
  data,
}) => {

  const [region, setRegion] = useState({
    latitude: 29.380893143707635,
    longitude: 47.99020869009142,
  });

  const [activeMarker, setActiveMarker] = useState(null)
  const { isArabic } = useLanguage()

  const mapRef = useRef(null);
  const navigation = useNavigation()
  const userLocation = useUserLocationStore((state) => state.userLocation)



  useEffect(() => {
    if (region) {
      console.log("render", { region });
      mapRef.current.animateToRegion({
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta: 0.1999,
        longitudeDelta: 0.1499,
      })
    }
  }, [region])

  useEffect(() => {
    if (data && data[0]) {
      const [long, lat] = data[0]?.geoMetry?.coordinates
      // setRegion({
      //   latitude: lat,
      //   longitude: long
      // })
      mapRef.current.animateToRegion({
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.1999,
        longitudeDelta: 0.1499,
      })
    }
  }, [data])

  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      ref={mapRef}
      showsUserLocation={true}
      // onRegionChangeComplete={(reagon) => {
      //   setReagon(reagon);
      // }}
      initialRegion={{
        latitude: 29.374792103018443,
        longitude: 47.98195230786111,
        latitudeDelta: 0.2999,
        longitudeDelta: 0.2499,
      }}
      // region={kuwaitRegion}
      region={{
        ...region,
        latitudeDelta: 0.1999,
        longitudeDelta: 0.1499,
      }}
    >
      {userLocation && <Marker
        title=" you"
        coordinate={{ latitude: userLocation?.latitude, longitude: userLocation.longitude }}
      />}

      {
        data &&
        data.length > 0 &&
        data.map((item: any, index) => {
          const [long, lat] = item.geoMetry.coordinates
          return (
            <Marker
              onPress={() => {
                navigation.navigate(ScreenNames.Vehicle_Details_Screen, { _id: item._id })
              }}
              key={index}
              coordinate={{ latitude: lat, longitude: long }}
            >
              <Image
                style={{ width: 70, height: 70 }}
                source={require("../../assets/images/PinLocation.png")}
              />
              <Image style={{ width: 50, height: 30, position: "absolute", right: isArabic ? 8 : 12, top: 10 }}
                // source={require("../../assets/images/YamakTow3.png")} 
                source={{ uri: item?.iconMap }}
              />
            </Marker>
          );
        })
      }

    </MapView>
  );
};

export default memo(AppMap);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 1,
  },
});
export interface MapProps {
  data?: any[],
  isfetchingVehicles: boolean
  // setSelectedCardId: (id: number) => void;
  // reagon: Reagon | undefined;
  // setReagon: any;
}
