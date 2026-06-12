import { useTranslation } from "react-i18next"


export function useLanguage() {
    const { i18n } = useTranslation()
    const currentLanguage = i18n.language


    return { currentLanguage, isArabic: currentLanguage == "ar" }
}