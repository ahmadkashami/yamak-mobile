import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { languageDetectorPlugin } from "../helpers/LnguageDetector";
import { en, ar } from "./localization";

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

i18next
  .use(initReactI18next)
  .use(languageDetectorPlugin)
  .init({
    preload: ['en'],
    compatibilityJSON: 'v3',
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
