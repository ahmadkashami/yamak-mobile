import { Button, Platform, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { AppColorsTheme2 } from "../constants/Colors";
import ServicesList from "../components/home/ServicesList";
import VehiclesList from "../components/home/VehiclesList";
import ViewMap from "../components/home/ViewMap";
import AddsList from "../components/home/AddsList";
import { getAllServices } from "../apis/services.api";
import { getAllAdds } from "../apis/common.api";
import { getAllVehicles } from "../apis/vehicles.api";
import { useServicesStore } from "../store/services.store";
import { useAddsStore } from "../store/adds.store";
import { useVehicleStore } from "../store/vehicles.store";


export type Props = {
  name?: string;
  baseEnthusiasmLevel?: number;
};
const HomeScreen: React.FC<Props> = () => {

  const [refreshing, setRefreshing] = useState(false);
  const setServices = useServicesStore(state => state.setServices)
  const setAdds = useAddsStore(state => state.setAdds)
  const setVehicles = useVehicleStore(state => state.setVehicles)



  function pullToRefreshFunction() {
    setRefreshing(true)
    setTimeout(() => {
      callHomeScreenApi().then(res => {
        setRefreshing(false)
      }).catch(e => {
        console.log(e);
        setRefreshing(false)
      })

    }, 1500)
  }

  async function callHomeScreenApi() {
    const [serviceList, addsList, vehicles] = await Promise.all([getAllServices(), getAllAdds(), getAllVehicles()])
    setAdds(addsList?.list)
    setServices(serviceList?.list)
    setVehicles(vehicles)
  }

  async function handlePress(iconName: string) {
    console.log("pressed");

    try {
      changeIcon(iconName).then(res => {
        console.log({ res });

      });

      // getIcon().then(res => {
      //   console.log("res ", res);

      // });
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={pullToRefreshFunction}

        />}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* <Text>{Config.NODE_ENV}</Text> */}
        <ServicesList />
        <AddsList />
        <VehiclesList />
        <ViewMap />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColorsTheme2.offWhite

  },
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});
