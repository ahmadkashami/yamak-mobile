import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppColors, AppColorsTheme2 } from "../constants/Colors";
import { useFetch } from "../hooks/useFetch.hook";
import { AppSizes } from "../constants/Sizes";
import { AppFonts } from "../constants/fonts";
import Screen from "../components/Screen";
import useFetchV2 from "../hooks/useFetchV2";
import NoContentFound from "../components/ui/NoContent";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames, StackNames } from "../constants/ScreenNames";

const NotificationsScreen = () => {

  // const { data } = useFetch({ endPoint: "user-notifications/mine", method: "get" })
  const { responseData: data } = useFetchV2({ url: "user-notifications/mine", method: "get" })
  const { t } = useTranslation()
  const navigation = useNavigation()

  const notifications = data?.list

  return (
    <Screen >
      <ScrollView contentContainerStyle={{ padding: 20 }} style={{ flex: 1, backgroundColor: AppColorsTheme2.offWhite }}>

        {
          (notifications && notifications?.length !== 0) ? notifications.map((item, index) => notificationRenderItem(item, index)) : <NoContentFound onPress={() => { navigation.navigate(StackNames.Home_Stack, { screen: ScreenNames.Home_Screen }) }} buttonMessage={t("GoHome")} title={t("NoNotification")} message={t("NotificationWillAppear")} />
        }

      </ScrollView>
    </Screen>
  );
};



export default NotificationsScreen;


function EmptyNotificationsArea() {

  return (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Text> no notifications yet
  </Text></View>)
}

function notificationRenderItem(notification: { title: string, body: string }, index: number) {
  return (
    <Pressable key={index} style={({ pressed }) => [styles.itemContainer, pressed && styles.pressed]}>
      <View style={{ flexDirection: "row", flex: 1, }}>
        <View style={{ height: 15, width: 15, backgroundColor: AppColorsTheme2.secondary, borderRadius: 10, marginRight: 10 }}></View>
        <View>
          <View style={{ flex: 1, width: "95%" }}>
            <Text style={{ fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.medium, marginBottom: 4 }}>
              {notification.title}
            </Text>
            <Text numberOfLines={2} style={{ fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.small, marginBottom: 4, }}>
              {notification.body}
            </Text>

          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontFamily: AppFonts.Roboto_Med }}>
              {new Date().toDateString()}
            </Text>
            <Image style={{ width: 50, height: 50, position: "absolute", right: 10, top: -20 }} source={require("../assets/images/appLogo.png")} />
          </View>

        </View>
      </View>


    </Pressable>
  )
}

const styles = StyleSheet.create({
  itemContainer: { minHeight: 160, padding: 20, borderRadius: 10, backgroundColor: AppColorsTheme2.primary200, marginBottom: 10 },
  pressed: { opacity: 0.7 }
});
