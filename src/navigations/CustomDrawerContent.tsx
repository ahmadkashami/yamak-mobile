import { Alert, Image, ImageBackground, Pressable, Share, StyleSheet, Text, View } from "react-native";
import React, { FC, useContext } from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { AppColors, AppColorsTheme2 } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import AppIcon from "../components/ui/appIcon";
import { useAuthenticationStoreAsync } from "../store/auth.store";
import { AppFonts } from "../constants/fonts";
import { AppSizes } from "../constants/Sizes";
import { appCurrentVersion, isIos } from "../constants/CommonConsstats";

const CustomDrawerContent: FC<any> = (props) => {
  const { t } = useTranslation();
  const removeAuthentication = useAuthenticationStoreAsync((state) => state.removeAuthentication)
  const user = useAuthenticationStoreAsync((state) => state.user)
  async function shareAppHandler() {
    try {
      const url = !isIos ? "https://play.google.com/store/games" : "https://www.apple.com/kw/app-store/"
      const result = await Share.share({
        message:
          ("Try Yamak the first application in Kuwait for roads helping and more " + '\n' + url)
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }
  function logoutPressHandler() {
    Alert.alert(t("Logout"), t("DoYouWantToLogout"), [
      { text: t("Cancel"), style: "destructive" },
      {
        text: t("Logout"),
        onPress: () => {
          removeAuthentication();
        },
      },
    ]);
  }

  return (
    <View style={{ flex: 1 }}>


      <DrawerContentScrollView {...props}
        contentContainerStyle={{ backgroundColor: AppColorsTheme2.primary }}
      >

        <ImageBackground style={{ padding: 10 }} source={require("../assets/images/bg3.png")} >
          <Image source={require("../assets/images/profile2.png")} resizeMode={"cover"} style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10, }} />
          <Text style={{ fontSize: 18, color: "#fff", }}>{user?.name}</Text>
          <View style={{ flexDirection: "row" }}>
            <AppIcon name="ellipse" type="Ionicons" color="green" size={20} />
            <Text style={{ fontSize: 18, color: "#fff", }}>online </Text>
          </View>
        </ImageBackground>

        <View style={{ backgroundColor: AppColors.white, flex: 1, paddingTop: 10 }}>
          <DrawerItemList {...props} />

        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <Pressable
          onPress={() => {
            shareAppHandler()
          }}
          style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AppIcon name="share-social-outline" size={22} />
            <Text style={{
              fontFamily: AppFonts.Roboto_Med,
              fontSize: AppSizes.small,
              marginLeft: 5
            }}>{t("Share")} </Text>
          </View>
        </Pressable>
        <Pressable onPress={logoutPressHandler} style={{ paddingVertical: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AppIcon name="exit-outline" size={22} />
            <Text style={{
              fontFamily: AppFonts.Roboto_Med,
              fontSize: AppSizes.small,
              marginLeft: 5
            }}>Sign Out</Text>
          </View>
        </Pressable>
        <View
          style={{
            marginVertical: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: AppColorsTheme2.primary, fontWeight: "bold" }}>
            {t("Version")} {appCurrentVersion}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: "white",
    borderWidth: 4,
    marginVertical: 20,
    borderColor: AppColorsTheme2.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { fontWeight: "600", },
});
