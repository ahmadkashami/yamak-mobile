import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Clipboard from '@react-native-clipboard/clipboard';
import { useTranslation } from 'react-i18next'

import AppPressable from '../ui/AppPressable'
import { AppFonts } from '../../constants/fonts'
import { AppSizes } from '../../constants/Sizes'
import AppIcon from '../ui/appIcon'
import { AppColorsTheme2 } from '../../constants/Colors'

import { iosAppStoreLink, androidPlayStoreLink } from '../../constants/CommonConsstats'
import { Linking } from 'react-native';
import { useLanguage } from '../../hooks/useLanguage.hook';
import AppText from '../ui/AppText';

const ShareWithus = () => {
    const { t } = useTranslation();
    const { currentLanguage } = useLanguage()

    const appLink = `yamak.page.link/app`

    const shareSubject = {
        en: "check this adds",
        ar: "شاهد هذا الاعلان"
    }

    const shareMessage = {
        en: `download yamak app now :
${appLink}`,
        ar: ` : حمل تطبيق يمك الان  
${appLink}`
    }


    function copyToClipBoardHandler() {
        Clipboard.setString(shareMessage[currentLanguage]);
    }
    function mailToPessHandler() {
        copyToClipBoardHandler()
        Linking.openURL(`mailto:?subject=${shareSubject[currentLanguage]}&body=${shareMessage[currentLanguage]}`)
    }
    function smsToPressHandler() {
        Linking.openURL(`sms:&body=${shareMessage[currentLanguage]}`)
    }
    function whatsappPressHandler() {
        Linking.openURL(`whatsapp://send?&text=${shareMessage[currentLanguage]}`)
    }
    function twitterPressHandler() {
        Linking.openURL(`twitter://post?message=${shareMessage[currentLanguage]}`)
    }

    function messageFacebookHander() {
        Linking.openURL(`fb-messenger://share?link=${shareMessage[currentLanguage]}`)
    }
    return (
        <View style={{ marginBottom: 20 }} >
            <AppText style={{ alignItems: "flex-start" }} textStyle={styles.heading}>{t("ShareWithUS")}</AppText>
            <View style={{ backgroundColor: AppColorsTheme2.white, borderRadius: 10, overflow: 'hidden' }}>
                <View style={{ paddingHorizontal: 16, flexDirection: "row", justifyContent: "space-around" }}>
                    <AppPressable
                        onPress={twitterPressHandler}
                        style={styles.iconContainer}>
                        <Image style={{ width: 20, height: 20 }} source={require("../../assets/images/x.png")} />
                    </AppPressable>

                    <AppPressable
                        onPress={messageFacebookHander}
                        style={styles.iconContainer}>
                        <AppIcon size={30} color='dodgerblue' type="Fontisto" name='messenger' />

                    </AppPressable>
                    <AppPressable
                        onPress={whatsappPressHandler}
                        style={styles.iconContainer}>
                        {/* <Image style={{ width: 30, height: 30 }} source={require("../../assets/icons/facebook.png")} /> */}
                        <AppIcon size={32} color='green' name='logo-whatsapp' />
                    </AppPressable>
                    <AppPressable
                        onPress={smsToPressHandler}
                        style={styles.iconContainer}>
                        <AppIcon name='message1' type="AntDesign" size={28} />
                    </AppPressable>
                    <AppPressable
                        onPress={mailToPessHandler}
                        style={styles.iconContainer}>
                        <AppIcon name='mail' size={30} />
                    </AppPressable>
                    <AppPressable
                        onPress={copyToClipBoardHandler}
                        style={styles.iconContainer}>
                        <AppIcon name='link' size={30} />
                    </AppPressable>

                </View>

            </View>
        </View>
    )
}

export default ShareWithus

const styles = StyleSheet.create({

    heading: { fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.medium, paddingHorizontal: 10, marginBottom: 10, textAlign: "left" },
    iconContainer: { width: 60, height: 60, justifyContent: "center", alignItems: "center", }

})