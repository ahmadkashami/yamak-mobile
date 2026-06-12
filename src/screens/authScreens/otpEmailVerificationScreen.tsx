import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
// import { OtpInput } from "react-native-otp-entry";
import OTPTextInput from "react-native-otp-textinput"
import { showMessage, hideMessage } from "react-native-flash-message";

import Screen from '../../components/Screen'
import { AppColorsTheme2 } from '../../constants/Colors'
import { AppFonts } from '../../constants/fonts'
import { AppSizes } from '../../constants/Sizes'
import FilledButton from '../../components/ui/common/FilledButton'
import { checkCode, emailVerify } from '../../apis/Auth.api'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { httpErrorHandler } from '../../helpers/AppHelpers';
import { useAuthenticationStoreAsync } from '../../store/auth.store';

import LoadingLoatie from '../../components/ui/LoadingLootie';

import GoBackButton from '../../components/ui/GoBackButton';
import { useCounter } from '../../hooks/useCounter';
import AppText from '../../components/ui/AppText';


const OtpEmailVerificationScreen = ({ route }) => {
    const [code, setCode] = useState("")
    const { counter, setCounter } = useCounter()
    const { inputs: values } = route?.params
    const [loading, setIsLoading] = useState(false)


    const authenticate = useAuthenticationStoreAsync((state) => state.authenticate)
    const { t } = useTranslation()
    useEffect(() => {
        setCounter(60)
    }, [])

    async function verifyCode() {
        if (!code || code.length < 4) {
            showMessage({ message: "invalid code number", type: "danger" })
            return
        }
        try {
            setIsLoading(true)
            const response = await emailVerify(values.email, code)
            const { accessToken, user } = response.data
            authenticate(accessToken, user)
            showMessage({ message: "login success", type: "success" })
        } catch (error) {
            const errorMessage = httpErrorHandler(error)
            showMessage({ message: errorMessage, type: "danger" })
        } finally {
            setIsLoading(false)

        }
    }
    return (
        <Screen style={{}}>
            <KeyboardAwareScrollView>
                <GoBackButton />
                <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: AppColorsTheme2.offWhite }}>
                    {loading && <LoadingLoatie />}
                    <View style={{ paddingTop: "15%", }}>
                        <View style={{ width: 220, height: 220, borderRadius: 125, backgroundColor: AppColorsTheme2.secondary200, justifyContent: "center", alignItems: "center" }}>
                            <Image style={{ width: 200, height: 200 }} source={require("../../assets/images/appLogo.png")} />
                        </View>
                    </View>
                    <View style={{ marginVertical: 20, width: "70%" }}>
                        <Text style={{ fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.xLarge, textAlign: "center", marginBottom: 8, color: AppColorsTheme2.secondary }}>
                            {/* Account Verification */}
                            {t("AccountVerification")}

                        </Text>
                        <Text style={styles.subTitle}>
                            {/* please enter the 4 digit sent to :  */}
                            {t("PleaseEnterThe4")}
                        </Text>
                        <Text style={styles.subTitle}> {values.email}</Text>
                    </View>
                    <View style={{ width: "70%", }}>
                        {/* <OtpInput
                            numberOfDigits={4}
                            onTextChange={(text) => setCode(text)}
                            focusColor={AppColorsTheme2.secondary}
                            theme={{ pinCodeContainerStyle: { borderWidth: 3 } }}
                        /> */}
                        <OTPTextInput
                            handleTextChange={(text) => setCode(text)}
                            tintColor={AppColorsTheme2.secondary}
                        />

                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <FilledButton onPress={verifyCode} style={{ width: "30%" }} >
                            {t("Verify")}
                        </FilledButton>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        {counter > 0 ? (<AppText textStyle={styles.subTitle}>{counter}</AppText>) : (<Text style={styles.subTitle}>
                            {/* Didnt receive the mail ? */}
                            {t("DidntReceiveMain")}
                            {" "}
                            <Pressable
                                onPress={() => { setCounter(60) }}
                                style={({ pressed }) => [styles.resendButton, pressed && styles.pressed]}>
                                <Text style={{ ...styles.subTitle, color: AppColorsTheme2.secondary, textDecorationLine: "underline" }}>{t("Resend")} </Text>
                            </Pressable>
                        </Text>)}

                    </View>
                </View>
            </KeyboardAwareScrollView>
        </Screen>
    )
}

export default OtpEmailVerificationScreen

const styles = StyleSheet.create({
    subTitle: { fontFamily: AppFonts.Roboto_Med, color: AppColorsTheme2.gray, fontSize: AppSizes.medium, textAlign: "center" },
    resendButton: { justifyContent: "center", alignItems: "center" },
    pressed: { opacity: 0.7 }

})