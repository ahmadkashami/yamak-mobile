import { StyleSheet } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import { ScreenNames } from "../constants/ScreenNames";
import EditProfileScreen from "../screens/EditProfileScreen";
import PrivacyAndPolicyScreen from "../screens/PrivacyAndPolicyScreen";
import FavotiesScreen from "../screens/FavotiesScreen";
import ContactUs from "../screens/ContactUsScreen";
import MyCarScreen from "../screens/MyCarScreen";
import { useTranslation } from "react-i18next";
import JoinUsScreen from "../screens/JoinUsScreen";
import AboutYamakAppScreen from "../screens/AboutYamakAppScreen";
import FreshCharScreen from "../screens/FreshCharScreen";

const Stack = createStackNavigator();
const ProfileStack = () => {
  const { t } = useTranslation()
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
      initialRouteName={ScreenNames.Profile_Screen}
    >
      <Stack.Screen
        options={{ headerShown: false, }}
        name={ScreenNames.Profile_Screen}
        component={ProfileScreen}
      />
      <Stack.Screen name={ScreenNames.Notification_Screen} component={NotificationsScreen} />
      <Stack.Screen options={{ title: t("ِEditProfile") }} name={ScreenNames.Edit_Profile_Screen} component={EditProfileScreen} />
      <Stack.Screen name={ScreenNames.Privacy_And_Policy_Screen} options={{ presentation: "modal", headerShown: false }} component={PrivacyAndPolicyScreen} />
      <Stack.Screen name={ScreenNames.Favorites_Screen} component={FavotiesScreen} />
      <Stack.Screen name={ScreenNames.ContactUs_Screen} options={{ headerShown: false }} component={ContactUs} />
      <Stack.Screen name={ScreenNames.MY_CAR_SCREEN} options={{ headerShown: false }} component={MyCarScreen} />
      <Stack.Screen name={ScreenNames.JOIN_US_SCREEN} options={{ headerShown: false, presentation: "transparentModal", title: "Join us" }} component={JoinUsScreen} />
      <Stack.Screen name={ScreenNames.ABOUT_YAMAK_APP} options={{ headerShown: false }} component={AboutYamakAppScreen} />
      <Stack.Screen name={ScreenNames.FRESHCHAT_SCREEN} options={{ headerShown: false }} component={FreshCharScreen} />

    </Stack.Navigator>
  );
};

export default ProfileStack;
