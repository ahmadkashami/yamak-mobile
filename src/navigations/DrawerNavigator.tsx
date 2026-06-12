import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet, View } from "react-native";

import { AppColors, AppColorsTheme2 } from "../constants/Colors";
import FavotiesScreen from "../screens/FavotiesScreen";
import CustomDrawerContent from "./CustomDrawerContent";
import { useTranslation } from "react-i18next";
import AppIcon from "../components/ui/appIcon";

import TabNavigator from "./TabNavigator";
import ProfileScreen from "../screens/ProfileScreen";

import NotificationsScreen from "../screens/NotificationsScreen";
import PressbleAppIcon from "../components/ui/pressbleAppIcon";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { t } = useTranslation();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerLabelStyle: { fontWeight: "600", marginLeft: -20, fontSize: 15 },
        drawerInactiveTintColor: AppColors.black,
        drawerActiveBackgroundColor: AppColorsTheme2.secondary,
        drawerActiveTintColor: AppColors.white,
        drawerContentStyle: {
          flex: 1,
        },
        headerStyle: {
          backgroundColor: AppColorsTheme2.primary,
        },
        headerTintColor: AppColorsTheme2.white,

      }}
      initialRouteName="Home"
    >



      <Drawer.Screen
        options={{
          headerShown: false,
          title: t("Home"),
          drawerIcon: ({ color }) => { return <AppIcon name="home-outline" type="Ionicons" color={color} size={20} /> }
        }}
        name="Home"
        component={TabNavigator}

      />
      <Drawer.Screen
        options={{
          headerShown: false,
          title: t("Profile"),
          drawerIcon: ({ color }) => { return <AppIcon name="person-outline" type="Ionicons" color={color} size={20} /> }
        }}
        name="Profile"

        component={ProfileScreen}

      />
      <Drawer.Screen
        options={({ navigation }) => {
          return {
            title: t("Favorties"),
            headerLeft: () => {
              return (
                <View>
                  <PressbleAppIcon
                    type="Ionicons"
                    style={styles.lableIcon}
                    name="md-menu"
                    size={24}
                    color="black"
                    onPress={() => {
                      navigation.openDrawer();
                    }}
                  />
                </View>
              );
            },

            drawerIcon: ({ color }) => { return <AppIcon name="favorite-outline" type="MaterialIcons" color={color} size={20} /> }

          };
        }}
        name="Favorites"
        component={FavotiesScreen}
      />
      <Drawer.Screen
        options={({ navigation }) => {
          return {
            title: t("notifications"),
            headerLeft: () => {
              return (
                <View>
                  <Ionicons
                    style={styles.lableIcon}
                    name="md-menu"
                    size={24}
                    color="black"
                    onPress={() => {
                      navigation.openDrawer();
                    }}
                  />
                </View>
              );
            },

            drawerIcon: ({ color }) => { return <AppIcon name="chatbox-ellipses-outline" type="Ionicons" color={color} size={20} /> }

          };
        }}
        name="messages"
        component={NotificationsScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
  lableIcon: {
    paddingHorizontal: 20,
  },
});
