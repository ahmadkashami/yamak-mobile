import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Linking } from "react-native";
import SplashScreen from 'react-native-splash-screen'

import AppForceUpdateContent from "../components/ui/AppForceUpdateContent";
import { useModalContext } from "../context/modelContext";
import { getStorageValues, } from "../helpers/AppAsyncStoreage";
import { useAppReadyStore } from "../store/appReady.store";
import { isIos, appVersion, appBuildNumber, iosAppStoreLink, androidPlayStoreLink, AsyncStorageConstants } from "../constants/CommonConsstats";
import { AppLanguages } from "../constants/languages";
import { configureSentry, setSentryUserInfo } from "../services/sentry/sentry.config";
import { useAuthenticationStoreAsync } from "../store/auth.store";
import { SetFreshChatUserInfo } from "../services/freshchat/freshchat.config";

let forceUpdate = false
export function useAppReady(

) {
  const [appIsReady, setAppIsReady] = useState(false);
  // const [isForceUpdate, setIsForceUpdate] = useState(false)
  const appSetting = useAppReadyStore((state) => state.appSetting)
  const { showModal, close } = useModalContext()

  const appSettingVersion = isIos ? parseFloat(appSetting?.iosVersion) : parseFloat(appSetting?.androidVersionCode)
  const appSettingRecommended = isIos ? parseFloat(appSetting?.iosRecommendedVersion) : parseFloat(appSetting?.androidRecommendedVersion)

  const isNewUpdate = appSettingVersion > parseFloat(appVersion)
  const user = useAuthenticationStoreAsync((state) => state.user)


  useEffect(() => {
    getReadyApp()
  }, [appSetting]);
  //initals configrations for the app
  useEffect(() => {
    if (user) {
      setSentryUserInfo(user);
      SetFreshChatUserInfo(user)
    }
  }, [user])


  async function handleUpdatePress() {
    const link = isIos ? iosAppStoreLink : androidPlayStoreLink
    Linking.openURL(link)
  }
  async function handleUpdateLaterPress() {
    close()
  }
  async function getReadyApp() {
    const lang = await getStorageValues(AsyncStorageConstants.languageKey);
    if (!lang) AsyncStorage.setItem(AsyncStorageConstants.languageKey, AppLanguages.english);

    if (isNewUpdate) {
      if (parseFloat(appVersion) < appSettingRecommended) {
        forceUpdate = true
      }
      await showModal({
        content: <AppForceUpdateContent isForceUpdate={forceUpdate} cancelMessage={"update later"} onCancel={handleUpdateLaterPress} onConfirm={handleUpdatePress} message={"Please Update The App To The Newer Version"} title={"Update Required"} />
      })
    }



    if (!forceUpdate) {
      setAppIsReady(true);
      setTimeout(async () => {
        if (!forceUpdate) {
          SplashScreen.hide();

        }
      }, 3000);;
    }
  }



  return { appIsReady, setAppIsReady }
}
