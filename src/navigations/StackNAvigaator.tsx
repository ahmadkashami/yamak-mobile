import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen";
import DrawerNavigator from "./DrawerNavigator";
import PrivacyAndPolicyScreen from "../screens/PrivacyAndPolicyScreen";
import FormAuthScreen from "../screens/FormAuthScreen";
import ProfieStack from "./ProfieStack";

const Stack = createStackNavigator();
const MainNavigaator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="drawerNav" component={DrawerNavigator} />

      <Stack.Screen name="profile" component={ProfieStack}></Stack.Screen>
      <Stack.Screen
        options={{ presentation: "modal" }}
        name="PrivacyAndPolicy"
        component={PrivacyAndPolicyScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigaator;

const styles = StyleSheet.create({});

