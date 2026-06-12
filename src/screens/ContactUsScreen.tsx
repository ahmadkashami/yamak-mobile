import { FlatList, Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screen from '../components/Screen'
import { AppFonts } from '../constants/fonts'
import { AppSizes } from '../constants/Sizes'
import { AppColorsTheme2 } from '../constants/Colors'
import AppIcon from '../components/ui/appIcon'
import AppPressable from '../components/ui/AppPressable'
import GoBackButton from '../components/ui/GoBackButton'
import AppSeparator from '../components/ui/AppSeparator'
import { useTranslation } from 'react-i18next'
import AppText from '../components/ui/AppText'
import AppHeader from '../components/AppHeader'
import { horizontalScale } from '../helpers/Scalling'
import FollowUsFotter from '../components/ui/FollowUsFotter'

const ContactUsScreen = ({ navigation }) => {
    const { t, i18n } = useTranslation()
    const currentLang = i18n.language

    function iconPressHandler(url: string) {
        Linking.openURL(url)
    }

    return (
        <View style={{ flex: 1, backgroundColor: AppColorsTheme2.offWhite, }}>
            <AppHeader navigation={navigation} title={t("ContactUs")} showBack={true} />


            <View style={{ paddingHorizontal: horizontalScale(24), flex: 1 }}>

                <View style={{ flex: 1, marginTop: 40 }}>
                    <FlatList data={customerServicesList} renderItem={({ item }) => <ContactUsItem item={item} />} />

                </View>
            </View>
            <FollowUsFotter />
            {/* <View style={{ marginBottom: 20 }}>
                <AppText >
                    {t("FollowUs")}
                </AppText>
                <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
                    <AppPressable
                        onPress={iconPressHandler.bind(this, "https://twitter.com/yamak_kw")}
                        style={styles.iconContainer}>
                        <Image style={{ width: 30, height: 30 }} source={require("../assets/images/x.png")} />
                    </AppPressable>
                    <AppPressable

                        onPress={iconPressHandler.bind(this, "https://www.linkedin.com/in/yamak-undefined-a0923929a/")}
                        style={styles.iconContainer}>
                        <Image style={{ width: 50, height: 50 }} source={require("../assets/icons/linkedin.png")} />
                    </AppPressable>
                    <AppPressable
                        onPress={iconPressHandler.bind(this, "https://www.instagram.com/yamak.app/")}
                        style={styles.iconContainer}>
                        <Image style={{ width: 40, height: 40 }} source={require("../assets/icons/instagram.png")} />
                    </AppPressable>
                    <AppPressable onPress={iconPressHandler.bind(this, "https://www.facebook.com/profile.php?id=61552273411460")} style={styles.iconContainer}>
                        <Image style={{ width: 40, height: 40 }} source={require("../assets/icons/facebook.png")} />
                    </AppPressable>
                </View>

            </View> */}
        </View>
    )
}


const ContactUsItem = ({ item }: { item: { phone: string, name: string } }) => {


    const { t, i18n } = useTranslation()
    const currentLang = i18n.language

    async function contactPressHandler(phone: string) {
        Linking.openURL(`tel:${phone.trim()}`)
    }

    return (<Pressable
        onPress={() => contactPressHandler(item.phone)}
        style={{ marginBottom: 10, flexDirection: "row", borderBottomWidth: 0.5, paddingVertical: 10 }}>
        <View style={{ borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
            <Image source={require("../assets/images/appLogo.png")} resizeMode="contain" style={{ width: 80, height: 80 }} />
        </View>
        <View style={{ justifyContent: "center", flex: 1, padding: 10, }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AppText nlines={2} textStyle={{ fontFamily: AppFonts.Roboto_Med, marginLeft: 10, fontSize: AppSizes.medium, marginVertical: 8, textTransform: "uppercase" }}>
                    {item.name[currentLang]}
                </AppText>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AppIcon name='phone' type="FontAwesome" size={20} />
                <AppText textStyle={{ fontFamily: AppFonts.Roboto_Med, marginVertical: 2, marginLeft: 10 }}>
                    {item.phone}
                </AppText>
            </View>

        </View>

    </Pressable >)
}



export default ContactUsScreen


const customerServicesList = [
    {
        name: {
            en: "customer service - salmiya",
            ar: "خدمة الزبائن - السالميه"
        },
        phone: "(+965) 50535103"
    },
    {
        name: {
            en: "customer service - hawally",
            ar: "خدمة الزبائن - حولي"
        },
        phone: "(+965) 50759505"
    },
    {
        name: {
            en: "customer service - farwaniya",
            ar: "خدمة الزبائن - فروانيه"
        },
        phone: "(+965) 50759505"
    },
    {
        name: {
            en: "customer service - sabah salem",
            ar: "خدمة الزبائن - صباح سالم"
        },
        phone: "(+965) 66917953"
    },

]




const styles = StyleSheet.create({
    iconContainer: { width: 60, height: 60, borderRadius: 30, justifyContent: "center", alignItems: "center", marginRight: 8 }
})