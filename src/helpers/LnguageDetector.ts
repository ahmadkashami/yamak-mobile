import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager } from "react-native";
import { AsyncStorageConstants } from "../constants/CommonConsstats";
import { AppLanguages } from "../constants/languages";

;

const languageDetectorPlugin = {
  type: "languageDetector",
  async: true,
  init: () => { },
  detect: async function (callback: (lang: string) => void) {
    try {
      await AsyncStorage.getItem(AsyncStorageConstants.languageKey).then((language) => {
        if (!language) {
          I18nManager.forceRTL(false);
          I18nManager.allowRTL(false);
          AsyncStorage.setItem(AsyncStorageConstants.languageKey, AppLanguages.english);
          return callback(AppLanguages.english);
        }

        if (language === "ar") {
          I18nManager.forceRTL(true);
          I18nManager.allowRTL(true);
          I18nManager.swapLeftAndRightInRTL(true);
        } else {
          I18nManager.forceRTL(false);
          I18nManager.allowRTL(false);
        }
        return callback(language);

      });
    } catch (error) {
    }
  },
  cacheUserLanguage: async function (language: string, options: any) {
    try {
      await AsyncStorage.setItem(AsyncStorageConstants.languageKey, language);
    } catch (error) {
      console.log("error storing language in detector ==>", error.messsage)
    }
  },
};

export { languageDetectorPlugin };
