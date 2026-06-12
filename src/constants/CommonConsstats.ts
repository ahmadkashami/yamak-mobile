import { Dimensions, Platform } from 'react-native';
import { getBuildNumber, getVersion } from 'react-native-device-info';
import Config from "react-native-config";

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get('screen').height;
const isIos = Platform.OS === "ios"
const isDev = Config.NODE_ENV !== "production"
const AppEnv = Config.NODE_ENV

const AsyncStorageConstants = {
    env: "environment",
    isLunched: "isLunched",
    languageKey: "lang",
    userLocation: "userLocation",
    appleLoginKeys: "appleLoginKeys",
    fcmToken: "fcmToken"

}

const NotificationTopicConstants = {
    yamakAll: "yamak-all",

}
const AppLimitList = 10
const iosAppStoreLink = "https://apps.apple.com/kw/app/yamak-%D9%8A%D9%85%D9%83/id6473277118"
const androidPlayStoreLink = "https://play.google.com/store/apps/details?id=com.yamak.mobapp"
const yamakWebsite = "https://yamak-kw.com"

const appVersion = getVersion()
const appBuildNumber = getBuildNumber()

export {
    AsyncStorageConstants,
    deviceWidth,
    deviceHeight,
    isIos,
    iosAppStoreLink,
    appVersion,
    androidPlayStoreLink,
    appBuildNumber,
    isDev,
    AppEnv,
    AppLimitList,
    NotificationTopicConstants,
    yamakWebsite
}