import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ImagePath from "../constants/AppImgs"
import Screen from '../components/Screen'
import { AppGlobalStyles } from '../constants/Styles'
import ProfileLables from '../components/Profile/ProfileLables'
import { useTranslation } from 'react-i18next'
import { AppColorsTheme2 } from '../constants/Colors'
import { ScreenNames } from '../constants/ScreenNames'
import AppHeader from '../components/AppHeader'
import FollowUsFotter from '../components/ui/FollowUsFotter'

const AboutYamakAppScreen = ({ route, navigation }) => {

    const { t } = useTranslation();

    function navigateOnPressButton(screeName: string) {
        navigation.navigate(screeName);
    }


    return (
        <View style={{ flex: 1 }}>
            <AppHeader navigation={navigation} title={t("AboutYamakApp")} showBack={true} />
            <ScrollView >

                <View style={{ flex: 1, padding: 18 }}>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Image style={{ width: 150, height: 150, }} source={ImagePath.AppLogoPng} />
                    </View>
                    <ProfileLables
                        type="MaterialIcons"
                        iconName={"policy"}
                        iconColor={AppColorsTheme2.primary}
                        text={t("PrivacyAndPolicy")}
                        onPress={navigateOnPressButton.bind(this, ScreenNames.Privacy_And_Policy_Screen)}
                    />
                    <ProfileLables
                        iconName={"person"}
                        iconColor={AppColorsTheme2.primary}
                        text={t("ContactUs")}
                        onPress={navigateOnPressButton.bind(this, ScreenNames.Privacy_And_Policy_Screen)}
                    />
                    <ProfileLables
                        iconName={"chat"}
                        iconColor={AppColorsTheme2.primary}
                        text={t("ChatWithUs")}
                        onPress={navigateOnPressButton.bind(this, ScreenNames.FRESHCHAT_SCREEN)}
                    />
                    <ProfileLables
                        type="Entypo"
                        iconName={"bug"}
                        iconColor={AppColorsTheme2.primary}
                        text={t("ReportABug")}
                        onPress={() => { Alert.alert("bug alert") }}
                    />
                </View>

            </ScrollView>
            <FollowUsFotter />
        </View>
    )
}

export default AboutYamakAppScreen

const styles = StyleSheet.create({})