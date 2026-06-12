import { View, Text, StyleSheet, I18nManager } from 'react-native'
import React from 'react'
import RNRestart from 'react-native-restart';

import AppPressable from './AppPressable'
import { AppColorsTheme2 } from '../../constants/Colors'
import { useTranslation } from 'react-i18next'
import { getStorageValues, setStorageValues } from '../../helpers/AppAsyncStoreage'
import { AsyncStorageConstants } from '../../constants/CommonConsstats'
import { AppLanguages } from '../../constants/languages'
import { useLanguage } from '../../hooks/useLanguage.hook';
import AppText from './AppText';

const ChangeLanguageLable = () => {
    const { i18n } = useTranslation()
    const { currentLanguage } = useLanguage()
    const languageLabel = currentLanguage == "en" ? "عربي" : "English"

    async function handleLanguagePress() {

        const appLanguage = await getStorageValues(AsyncStorageConstants.languageKey)
        const changeLang = appLanguage === AppLanguages.english ? AppLanguages.arabic : AppLanguages.english

        i18n.changeLanguage(changeLang).then(async (res) => {
            if (changeLang === "ar") {
                I18nManager.forceRTL(true);
                I18nManager.allowRTL(true);
                I18nManager.swapLeftAndRightInRTL(true);
            } else {
                I18nManager.forceRTL(false);
                I18nManager.allowRTL(false);
            }
            await setStorageValues(AsyncStorageConstants.languageKey, changeLang);
            RNRestart.restart();
        });

    }
    return (
        <AppPressable
            onPress={() => handleLanguagePress()}
            style={styles.languageStyle}>
            <AppText size={currentLanguage == "en" ? 18 : 16}>
                {languageLabel}
            </AppText>
        </AppPressable>
    )
}

export default ChangeLanguageLable

const styles = StyleSheet.create({
    languageStyle: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        left: 0,
        position: "absolute", top: "10%", width: 70,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 4,
        backgroundColor: AppColorsTheme2.secondary,
        height: 40,

    },
})
