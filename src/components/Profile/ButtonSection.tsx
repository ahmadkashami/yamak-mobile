import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import ProfileLables from "./ProfileLables";
import LanguagePicker from "../languagePicker";
import { useNavigation } from "@react-navigation/native";
import { AppColorsTheme2 } from "../../constants/Colors";
import { ScreenNames } from "../../constants/ScreenNames";
import { useAuthenticationStoreAsync } from "../../store/auth.store";
import AppAlert from "../ui/AppAlert";
import { deleteAccount } from "../../apis/users.api";
import { httpErrorHandler } from "../../helpers/AppHelpers";
import { showMessage } from "react-native-flash-message";
import AppPickerEnvModal from "../ui/AppPickerModal";
import AppCustomIpModal from "../ui/AppCustomIpModal";
import { AppEnv, isDev } from "../../constants/CommonConsstats";

const ButtonSection = () => {
  const [isPickingLanguage, setIsPickingLanguage] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false)
  const [isIpModalOpen, setIsIpModalOpen] = useState(false)
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  const { t } = useTranslation();
  const navigation = useNavigation();
  function pickingLanguageHandler(isPicking: boolean) {
    setIsPickingLanguage(isPicking);
  }
  function navigateOnPressButton(screeName: string) {
    navigation.navigate(screeName);
  }
  const removeAuthentication = useAuthenticationStoreAsync((state) => state.removeAuthentication)

  function logoutHandler() {
    Alert.alert("are you sure you want logout", undefined, [{ text: "Ok", onPress: removeAuthentication }, { style: "destructive", text: "cancel" }])
  }
  async function deleteAccountPressHandler() {
    try {
      const response = await deleteAccount()
      if (response?.data?.isDeleted)
        removeAuthentication()
    } catch (error) {
      const errorMessage = httpErrorHandler(error)
      showMessage({ message: errorMessage, type: "danger" })
    } finally {
      setDeletingAccount(false)
    }


  }

  async function OnEnvPress() {
    setIsPickerOpen((prev) => !prev)
  }
  console.log({ AppEnv });


  return (
    <>
      <View style={{ padding: 24 }}>
        {
          isDev && <>
            <ProfileLables
              iconName={"setting"}
              type={"AntDesign"}
              iconColor={AppColorsTheme2.secondary}
              text={t("environment") + ` (${AppEnv})`}
              onPress={() => { OnEnvPress() }}

            />
            <AppPickerEnvModal isOpen={isPickerOpen} setIsOpen={OnEnvPress} setIsIpModalOpen={setIsIpModalOpen} />
            <AppCustomIpModal isOpen={isIpModalOpen} setIsIpModalOpen={setIsIpModalOpen} />

          </>
        }


        {/* <ProfileLables
          iconName={"notifications"}
          iconColor={AppColorsTheme2.secondary}
          text={t("notifications")}
          onPress={navigateOnPressButton.bind(this, ScreenNames.Notification_Screen)}
        /> */}
        <ProfileLables
          imageSource={require("../../assets/images/AppLogoIcon.png")}
          iconType="image"
          iconName={"about"}
          iconColor={AppColorsTheme2.primary}
          text={t("AboutYamakApp")}
          onPress={navigateOnPressButton.bind(this, ScreenNames.ABOUT_YAMAK_APP)}
        />

        <ProfileLables
          iconName={"language"}
          iconColor={AppColorsTheme2.secondary}
          text={t("language")}
          onPress={() => pickingLanguageHandler(true)}
        />

        <ProfileLables
          type="AntDesign"
          iconName={"solution1"}
          iconColor={AppColorsTheme2.primary}
          text={t("JoinUs")}
          onPress={navigateOnPressButton.bind(this, ScreenNames.JOIN_US_SCREEN)}
        />
        <ProfileLables
          iconName={"deleteuser"}
          type={"AntDesign"}
          iconColor={AppColorsTheme2.secondary}
          text={t("DeleteAccount")}
          onPress={() => setDeletingAccount(true)}
        />
        <ProfileLables
          iconName={"logout"}
          iconColor={AppColorsTheme2.primary}
          text={t("Logout")}
          onPress={logoutHandler}
        />
      </View>

      <AppAlert visible={deletingAccount} onConfirm={() => { deleteAccountPressHandler() }} onCancel={() => setDeletingAccount(false)} title={t("DeleteAccount") as string} message={t("AreYouSureDeleteAccount")} />


      {isPickingLanguage && (
        <LanguagePicker
          isPickingLanguage={isPickingLanguage}
          pickingLanguageHandler={pickingLanguageHandler}
        />
      )}
    </>
  );
};

export default ButtonSection;

const styles = StyleSheet.create({
  textLable: { color: "gray", letterSpacing: 2 },
});
