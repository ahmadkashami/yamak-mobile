import { Alert, Linking, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppFonts } from '../../constants/fonts'
import { AppSizes } from '../../constants/Sizes'
import { useTranslation } from 'react-i18next'

const FooterArea = () => {
    const { t } = useTranslation()
    return (
        <View>

            <View style={{ justifyContent: "center", alignItems: "center", width: "80%", alignSelf: "center", marginVertical: 20 }}>

                <Text style={styles.footerText}>
                    {/* By  providing phone number you have accept and agree the - */}
                    {t("ByProvidingPhoneNumber")}
                    <Text
                        onPress={() => Linking.openURL("https://yamak-kw.com/terms")}
                        style={{ color: "red", fontFamily: AppFonts.Roboto_Med, textDecorationLine: "underline" }}
                    >
                        {/* Terms of Services */}
                        {t("TermOfService")}
                    </Text>
                    {" "}
                    {t("and")}
                    {" "}
                    <Text
                        onPress={() => Linking.openURL("https://yamak-kw.com/privacy")}
                        style={{ color: "red", fontFamily: AppFonts.Roboto_Med, textDecorationLine: "underline" }}
                    >
                        {/* Privacy and Policy */}
                        {t("PrivacyandPolicy")}
                    </Text>
                    {" "}
                    {t("InUseOfTheApp")}
                </Text>
            </View>

            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: AppSizes.small, textAlign: "center" }}>
                    {/* if you neeed Help please */}
                    {t("IfYouNeedHelp")}
                    <Text
                        onPress={() => Linking.openURL("https://yamak-kw.com")}
                        style={{ color: "dodgerblue" }}
                    >
                        {" "}
                        {/* Contact Help */}
                        {t("ContactHelp")}
                    </Text>
                    -
                </Text>
            </View>
        </View>
    )
}

export default FooterArea

const styles = StyleSheet.create({
    footerText: { fontSize: AppSizes.small, textAlign: "center", fontFamily: AppFonts.Roboto_Med },
    inputs: { flex: 1, fontSize: 16, fontWeight: "600" },
})