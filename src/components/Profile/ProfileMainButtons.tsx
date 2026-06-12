import { Linking, Pressable, Share, StyleSheet, Text, View, Platform } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'

import AppIcon from '../ui/appIcon'
import { AppColors, AppColorsTheme2 } from '../../constants/Colors'
import { AppFonts } from '../../constants/fonts'
import { ScreenNames } from '../../constants/ScreenNames'
import AppSeparator from '../ui/AppSeparator'
import { androidPlayStoreLink, iosAppStoreLink, isIos } from '../../constants/CommonConsstats'

const ProfileMainButtons = () => {

    const navigator = useNavigation()
    const { t } = useTranslation()

    function pressButtonNavigateHandlerHandler(screenName: string) {
        navigator.navigate(screenName)
    }


    function aboutUsPressHandler() {
        Linking.openURL("https://yamak-kw.com")
    }
    async function shareAppHandler() {
        try {
            const url = isIos ? iosAppStoreLink : androidPlayStoreLink
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
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", }}>
                <Pressable
                    onPress={pressButtonNavigateHandlerHandler.bind(this, ScreenNames.MY_CAR_SCREEN)}
                    style={{ justifyContent: "center", alignItems: "center" }}>
                    <View style={styles.iconContainer}>
                        <AppIcon name="car" type='FontAwesome5' />
                    </View>
                    <Text style={styles.text}>{t("MyCar")}</Text>
                </Pressable>
                <View style={{ borderWidth: 1, borderColor: AppColorsTheme2.gray }} />
                <Pressable
                    onPress={shareAppHandler}
                    style={{ justifyContent: "center", alignItems: "center", minWidth: 70 }}>
                    <View style={styles.iconContainer}>
                        <AppIcon name='sharealt' type="AntDesign" />
                    </View>
                    <Text style={styles.text}>{t("Share")}</Text>
                </Pressable>
                <View style={{ borderWidth: 1, borderColor: AppColorsTheme2.gray }} />
                <Pressable
                    onPress={pressButtonNavigateHandlerHandler.bind(this, ScreenNames.Favorites_Screen)}
                    style={{ justifyContent: "center", alignItems: "center" }}>
                    <View style={styles.iconContainer}>
                        <AppIcon name='heart-outline' />
                    </View>
                    <Text style={styles.text}>{t("Favorites")}</Text>
                </Pressable>
            </View>
            <AppSeparator />
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", }}>
                <Pressable
                    onPress={pressButtonNavigateHandlerHandler.bind(this, ScreenNames.Edit_Profile_Screen)}
                    style={{ justifyContent: "center", alignItems: "center" }}>
                    <View style={styles.iconContainer}>
                        <AppIcon type="Ionicons" name='person' />
                    </View>
                    <Text style={styles.text}>{t("ِEditProfile")}</Text>
                </Pressable>
                <View style={{ borderWidth: 1, borderColor: AppColorsTheme2.gray }} />

                <Pressable
                    onPress={pressButtonNavigateHandlerHandler.bind(this, ScreenNames.ContactUs_Screen)}
                    style={{ justifyContent: "center", alignItems: "center" }}>
                    <View style={styles.iconContainer}>
                        <AppIcon type="MaterialIcons" name='support-agent' />
                    </View>
                    <Text style={styles.text}>{t("ContactUs")}</Text>
                </Pressable>
                <View style={{ borderWidth: 1, borderColor: AppColorsTheme2.gray }} />

                <Pressable
                    onPress={aboutUsPressHandler}
                    style={{ justifyContent: "center", alignItems: "center" }}>
                    <View style={styles.iconContainer}>
                        <AppIcon type="AntDesign" name='exclamationcircleo' />
                    </View>
                    <Text style={styles.text}>{t("AboutUs")}</Text>
                </Pressable>
            </View>

        </View>
    )
}

export default ProfileMainButtons

const styles = StyleSheet.create({
    text: {
        fontFamily: AppFonts.Roboto_Med,
        paddingVertical: 4,
        color: "gray"
    },
    container: {
        paddingHorizontal: 24, padding: 20, marginHorizontal: 24, borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
        backgroundColor: 'white',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        minWidth: 80


    }
})