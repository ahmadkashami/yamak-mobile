import {
    I18nManager,
    Image,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useRef, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { showMessage, } from "react-native-flash-message";
import { Formik } from "formik";
import RNRestart from 'react-native-restart';

import FilledButton from "../../components/ui/common/FilledButton";
import { AppFonts } from "../../constants/fonts";
import { AppSizes } from "../../constants/Sizes";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../../constants/ScreenNames";
import { emailLogin, sendResetPassword } from "../../apis/Auth.api";
import AppIcon from "../../components/ui/appIcon";
import { loginValidationSchema } from "../../validationSchemas/loginSchema";
import { AppColorsTheme2 } from "../../constants/Colors";
import { Pressable } from "react-native";
import { useAuthenticationStoreAsync } from "../../store/auth.store";
import { httpErrorHandler } from "../../helpers/AppHelpers";
import BottomSheet from "../../components/ui/BottomSheet";
import EmailForgotPassword from "../../components/auth/EmailForgotPassword";
import OutLinedButton from "../../components/ui/OutLinedButton";
import { useTranslation } from "react-i18next";
import LoadingLoatie from "../../components/ui/LoadingLootie";
import React from "react";
import { useSocialAuth } from "../../hooks/useSocialAuth";
import AppText from "../../components/ui/AppText";
import AppPressable from "../../components/ui/AppPressable";
import AppSeparator from "../../components/ui/AppSeparator";
import { useErrorStore } from "../../store/AppError.store";
import { useLanguage } from "../../hooks/useLanguage.hook";
import { AppLanguages } from "../../constants/languages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorageValues, setStorageValues } from "../../helpers/AppAsyncStoreage";
import { AsyncStorageConstants, isIos } from "../../constants/CommonConsstats";
import { verticalScale } from "../../helpers/Scalling";



const LoginScreen = () => {

    const [verifyModalOpen, setVerifyModalOpen] = useState(false)
    const [resetEmail, setResetEmail] = useState()
    const setError = useErrorStore((state) => state.setError)

    const formRef = useRef();
    const bottomSheetRef = useRef()

    const { handleSignInWithGoogle, handleAuthWithApple } = useSocialAuth("login")

    const { currentLanguage } = useLanguage()
    const { i18n, t } = useTranslation()
    const navigation = useNavigation()
    const authenticate = useAuthenticationStoreAsync((state) => state.authenticate)

    const languageLabel = currentLanguage == "en" ? "عربي" : "English"

    function onCancelVerifyHandler() {
        setVerifyModalOpen(false)
    }

    async function onSubmitRestPassword() {
        try {
            if (!resetEmail) return
            await sendResetPassword(resetEmail)
            bottomSheetRef.current.close()
            navigation.navigate(ScreenNames.Reset_OTP_Screen, { email: resetEmail })

        } catch (error) {
            const errorMessage = httpErrorHandler(error)
            showMessage({ message: errorMessage, type: "danger" })
        }

    }
    async function onConfirmVerifyHandler(values, { setSubmitting }) {
        try {
            const response = await emailLogin(values)
            if (!response?.data?.isVerified) {
                navigation.navigate(ScreenNames.Email_OTP_Screen, { inputs: values })
                return
            }
            const { accessToken, user } = response.data
            authenticate(accessToken, user)
        } catch (error) {
            const errorMessage = httpErrorHandler(error)
            setError(errorMessage)
            // showMessage({ message: , type: "danger" })
        } finally {
            setSubmitting(false)
        }
    }
    async function handleLanguagePress(currentLanguage: string) {

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
        <>
            {/* <SafeAreaProvider style={{ flex: 1 }}> */}

            {/* {isLoading && <ActivityIndicator />} */}
            <View style={styles.container}>
                <View style={{ position: "absolute", width: "100%", height: "28%", backgroundColor: AppColorsTheme2.primary, borderBottomEndRadius: 40, borderBottomStartRadius: 40, }}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={require("../../assets/images/appLogo.png")}
                        />
                    </View>
                </View>
                <KeyboardAwareScrollView>
                    <AppPressable
                        onPress={() => handleLanguagePress(currentLanguage)}
                        style={styles.languageStyle}>
                        <AppText size={currentLanguage == "en" ? 18 : 16}>
                            {languageLabel}
                        </AppText>
                    </AppPressable>
                    <View
                        style={{
                            zIndex: 0,
                            marginTop: verticalScale(120),
                            width: "100%",
                        }}
                    >
                        <View>
                            <Text style={{
                                fontFamily: AppFonts.Roboto_Med,
                                textAlign: "center", fontSize: AppSizes.xLarge, color: AppColorsTheme2.white, marginBottom: 8
                            }}>{t("Login")}</Text>

                        </View>

                        {/* <WelcomeArea subTitle={t("loginWithEmailPassword")} /> */}
                        <View style={{ paddingVertical: verticalScale(20), backgroundColor: AppColorsTheme2.white, marginHorizontal: 40, opacity: 0.8, justifyContent: "center", alignItems: "center", borderRadius: 20 }}>

                            <Formik
                                innerRef={formRef}
                                initialValues={{ email: "", password: "" }}
                                validationSchema={loginValidationSchema}
                                onSubmit={(values, props) => {
                                    onConfirmVerifyHandler(values, props)

                                }}
                            >
                                {({
                                    values,
                                    handleSubmit,
                                    handleChange,
                                    isValid,
                                    errors,
                                    touched,
                                    isSubmitting,
                                    setFieldTouched
                                }) => (
                                    <>
                                        {isSubmitting && <LoadingLoatie />}
                                        <View style={{ width: "50%" }}>
                                            <AppText textStyle={{ textAlign: "center" }}>
                                                {t("LoginWith")}
                                            </AppText>
                                            <View style={{ justifyContent: "space-around", alignItems: "center", }}>
                                                <AppPressable
                                                    onPress={() => handleSignInWithGoogle()}
                                                    style={{ justifyContent: "center", alignItems: "center", padding: 8 }}>
                                                    <View style={{ flexDirection: "row", backgroundColor: AppColorsTheme2.secondary, minWidth: 200, alignItems: "center", justifyContent: "center", borderRadius: 80, paddingHorizontal: 10, paddingVertical: 4 }}>
                                                        <AppIcon style={{ marginRight: 8 }} size={25} color="white" name='google' type="FontAwesome" />
                                                        <AppText color="white" >{t("SigninwithGoogle")}</AppText>
                                                    </View>
                                                </AppPressable>
                                                {isIos ? (<AppPressable
                                                    onPress={() => handleAuthWithApple("login")}
                                                    style={{ justifyContent: "center", alignItems: "center", padding: 8 }}>
                                                    <View style={{ flexDirection: "row", backgroundColor: AppColorsTheme2.primary, minWidth: 200, alignItems: "center", justifyContent: "center", borderRadius: 80, paddingHorizontal: 10, paddingVertical: 4 }}>
                                                        <AppIcon style={{ marginRight: 8 }} size={25} color="white" name='apple' type="FontAwesome" />
                                                        <AppText color="white" >{t("SigninwithApple")}</AppText>
                                                    </View>

                                                </AppPressable>) : null}
                                            </View>
                                        </View>
                                        <AppSeparator />

                                        <Text style={{ fontFamily: AppFonts.Roboto_Med, color: "tomato" }}>{
                                            (touched.email && errors.email) && (`${errors.email}`)
                                        }</Text>
                                        <View style={{ height: 40, borderWidth: 1, width: "75%", borderRadius: 5, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, marginBottom: 10 }}>
                                            <View style={{ flex: 1, justifyContent: "center" }}>
                                                <TextInput
                                                    autoCapitalize='none'
                                                    onChangeText={handleChange("email")}
                                                    value={values.email}
                                                    style={styles.inputs}
                                                    placeholderTextColor={"#a4a3a8"}
                                                    onBlur={() => setFieldTouched("email")}
                                                    placeholder={t("Email")}
                                                />
                                            </View>
                                            <AppIcon name="mail" color="gray" />
                                        </View>
                                        <Text style={{ fontFamily: AppFonts.Roboto_Med, color: "tomato" }}>{
                                            touched.password && errors.password && (`${errors.password}`)
                                        }</Text>
                                        <View style={{ height: 40, borderWidth: 1, width: "75%", borderRadius: 5, flexDirection: "row", alignItems: "center", paddingHorizontal: 10 }}>
                                            <View style={{ flex: 1, justifyContent: "center" }}>
                                                <TextInput
                                                    autoCapitalize="none"
                                                    onChangeText={handleChange("password")}
                                                    placeholder={t("Password")}
                                                    placeholderTextColor={"#a4a3a8"}
                                                    onBlur={() => setFieldTouched("password")}
                                                    style={styles.inputs}
                                                    secureTextEntry={true} />
                                            </View>
                                            <AppIcon name="lock" type="FontAwesome" color="gray" />
                                        </View>
                                        <View style={{ width: "75%", paddingTop: 4 }}>
                                            <Pressable onPress={() => { bottomSheetRef.current.present() }}>
                                                <AppText textStyle={{ fontSize: AppSizes.small, color: AppColorsTheme2.secondary, marginTop: 4 }}>
                                                    {t("ForgotPassword")}
                                                </AppText>
                                            </Pressable>

                                        </View>

                                        <View style={{ paddingVertical: 20 }}>
                                            <FilledButton
                                                style={{ backgroundColor: isValid ? AppColorsTheme2.secondary : "#fde6b9" }}
                                                disabled={!isValid}
                                                onPress={handleSubmit}
                                            > {t("Login")}</FilledButton>
                                        </View>
                                        <View style={{}}>
                                            <View style={{ marginBottom: 16 }}>
                                                <Text style={{ alignSelf: "center", fontFamily: AppFonts.Roboto_Med, fontWeight: "700", fontSize: AppSizes.medium, color: AppColorsTheme2.primary }}>{t("DontHaveAccount")} </Text>
                                            </View>
                                            <OutLinedButton onPress={() => navigation.navigate(ScreenNames.Register_Screen)}  >
                                                {t("Register")}
                                            </OutLinedButton>

                                        </View>
                                    </>
                                )}
                            </Formik>
                        </View>
                        {/* <AppAlert  {...{ visible: verifyModalOpen, title: "Email Confirmation", message: `Code  will be sent to ${formRef.current?.values?.email} . Do you want to continue with this email ?`, onCancel: onCancelVerifyHandler, onConfirm: onConfirmVerifyHandler.bind(this, formRef.current?.values) }} /> */}
                    </View>


                    {/* <FooterArea /> */}
                </KeyboardAwareScrollView>


            </View>

            {/* </SafeAreaProvider> */}
            <BottomSheet ref={bottomSheetRef} snapPoint={["60%", "75%"]} >
                <EmailForgotPassword onSubmit={onSubmitRestPassword} setEmail={setResetEmail} />
            </BottomSheet>
        </>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: AppColorsTheme2.offWhite },
    innerContainer: {
        width: "100%",
        height: 300,
        justifyContent: "center",
        alignItems: "center",
    },
    inputBox: {
        flexDirection: "row",
        backgroundColor: "white",
        width: "90%",
        height: 60,
        padding: 16,
        marginVertical: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    imageContainer: { marginTop: "8%" },
    image: { width: 150, height: 150, resizeMode: "contain", alignSelf: "center", },
    footerText: { fontSize: AppSizes.small, textAlign: "center", fontFamily: AppFonts.Roboto_Med },
    inputs: { color: AppColorsTheme2.black, flex: 1, width: "100%", fontWeight: "600", textAlign: I18nManager.isRTL ? "right" : "left" },
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

    }
});
