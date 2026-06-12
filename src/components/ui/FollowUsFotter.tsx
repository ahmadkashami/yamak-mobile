import { Image, Linking, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import ImgPath from "../../constants/AppImgs"
import AppText from './AppText'
import AppPressable from './AppPressable'
import { useTranslation } from 'react-i18next'

const FollowUsFotter = () => {

    const { t, i18n } = useTranslation()

    function iconPressHandler(url: string) {
        Linking.openURL(url)
    }
    return (
        <View style={{ marginBottom: 20 }}>
            <AppText >
                {t("FollowUs")}
            </AppText>
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
                <AppPressable
                    onPress={iconPressHandler.bind(this, "https://twitter.com/yamak_kw")}
                    style={styles.iconContainer}>
                    <Image style={{ width: 30, height: 30 }} source={ImgPath.XPng} />
                </AppPressable>
                <AppPressable

                    onPress={iconPressHandler.bind(this, "https://www.linkedin.com/in/yamak-undefined-a0923929a/")}
                    style={styles.iconContainer}>
                    <Image style={{ width: 50, height: 50 }} source={ImgPath.LinkedInPng} />
                </AppPressable>
                <AppPressable
                    onPress={iconPressHandler.bind(this, "https://www.instagram.com/yamak.app/")}
                    style={styles.iconContainer}>
                    <Image style={{ width: 40, height: 40 }} source={ImgPath.InstagramPng} />
                </AppPressable>
                <AppPressable onPress={iconPressHandler.bind(this, "https://www.facebook.com/profile.php?id=61552273411460")} style={styles.iconContainer}>
                    <Image style={{ width: 40, height: 40 }} source={ImgPath.FaceBookPng} />
                </AppPressable>
            </View>

        </View>
    )
}

export default FollowUsFotter

const styles = StyleSheet.create({
    iconContainer: { width: 60, height: 60, borderRadius: 30, justifyContent: "center", alignItems: "center", marginRight: 8 }
})