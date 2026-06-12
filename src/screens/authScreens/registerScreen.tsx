import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import FooterArea from '../../components/auth/FooterArea';
import FilledButton from '../../components/ui/common/FilledButton';
import { AppSizes } from '../../constants/Sizes';
import AppIcon from '../../components/ui/appIcon';
import { AppFonts } from '../../constants/fonts';
import { AppColorsTheme2 } from '../../constants/Colors';
import CountryPicker from '../../components/auth/CountryPicker';
import { registerValidationSchema } from '../../validationSchemas/loginSchema';
import { registerUser } from '../../apis/Auth.api';
import { httpErrorHandler } from '../../helpers/AppHelpers';
import { showMessage } from 'react-native-flash-message';
import { ScreenNames } from '../../constants/ScreenNames';
import { useTranslation } from 'react-i18next';
import LoadingLoatie from '../../components/ui/LoadingLootie';
import AppText from '../../components/ui/AppText';
import { I18nManager } from 'react-native';
import OutLinedButton from '../../components/ui/OutLinedButton';
import AppPressable from '../../components/ui/AppPressable';
import AppSeparator from '../../components/ui/AppSeparator';
import { useSocialAuth } from '../../hooks/useSocialAuth';
import { isIos } from '../../constants/CommonConsstats';
import { verticalScale } from '../../helpers/Scalling';
import GoBackButton from '../../components/ui/GoBackButton';

import { useLanguage } from '../../hooks/useLanguage.hook';
import ChangeLanguageLable from '../../components/ui/ChangeLanguageLable';



const initialsFromValues = {
    email: "",
    name: "",
    phone: "",
    isAgreed: false,
    password: "",
    callingCode: "+965",
    gender: "male"
}


const RegisterScreen = () => {
    const formRef = useRef();

    const navigation = useNavigation()
    const { t, i18n } = useTranslation()
    const { handleRegisterWithGoogle, handleAuthWithApple } = useSocialAuth("register")

    async function onSubmitHandler(values, { setSubmitting }) {

        try {
            const response = await registerUser(values)
            if (!response?.data?.user) {
                showMessage({ message: "something went wrong", type: "danger" })
                return
            }
            navigation.navigate(ScreenNames.Email_OTP_Screen, { inputs: values })
            return "ok"
        } catch (error) {
            const errorMessage = httpErrorHandler(error)
            showMessage({ message: errorMessage, type: "danger" })
        } finally {
            setSubmitting(false)
        }
    }




    return (
        <>
            <View style={{ flex: 1 }}>
                {/* <SafeAreaProvider style={{ flex: 1 }}> */}
                <View style={styles.container}>
                    {/* <GoBackButton style={{ left: "5%", top: 50, zIndex: 1 }} /> */}
                    <View style={{ position: "absolute", width: "100%", height: "28%", backgroundColor: AppColorsTheme2.primary, borderBottomEndRadius: 40, borderBottomStartRadius: 40 }}>
                        <View style={styles.imageContainer}>

                            <Image
                                style={styles.image}
                                source={require("../../assets/images/appLogo.png")}
                            />
                        </View>
                    </View>

                    <KeyboardAwareScrollView >

                        <ChangeLanguageLable />
                        <GoBackButton position={"right"} style={styles.BackButtonStyle} />

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
                                }}>{t("CreateNewAccount")}</Text>
                            </View>
                            <View style={{ backgroundColor: "white", marginHorizontal: 40, opacity: 0.8, justifyContent: "center", alignItems: "center", borderRadius: 20, paddingVertical: 20, marginBottom: 20 }}>
                                <Formik
                                    innerRef={formRef}
                                    initialValues={initialsFromValues}
                                    validationSchema={registerValidationSchema}
                                    onSubmit={(values, props) => {
                                        onSubmitHandler(values, props)
                                    }}
                                >
                                    {({

                                        values,
                                        handleSubmit,
                                        handleChange,
                                        isValid,
                                        errors,
                                        touched,
                                        setFieldValue
                                        , setFieldTouched,
                                        isSubmitting,
                                        setSubmitting
                                    }) => (
                                        <>
                                            {isSubmitting && <LoadingLoatie />}
                                            <View style={{ width: "50%" }}>
                                                <AppText textStyle={{ textAlign: "center" }}>
                                                    {t("LoginWith")}
                                                </AppText>
                                                <View style={{ justifyContent: "space-around", alignItems: "center", }}>
                                                    {/* <AppPressable
                                                        onPress={() => handleRegisterWithGoogle()}
                                                        style={{ justifyContent: "center", alignItems: "center", width: 50, height: 50, padding: 8 }}>
                                                        <AppIcon size={30} name='google' type="FontAwesome" />
                                                    </AppPressable> */}
                                                    <AppPressable
                                                        onPress={() => handleRegisterWithGoogle()}
                                                        style={{ justifyContent: "center", alignItems: "center", padding: 8 }}>
                                                        <View style={{ flexDirection: "row", backgroundColor: AppColorsTheme2.secondary, minWidth: 200, alignItems: "center", justifyContent: "center", borderRadius: 80, paddingHorizontal: 10, paddingVertical: 4 }}>
                                                            <AppIcon style={{ marginRight: 8 }} size={25} color="white" name='google' type="FontAwesome" />
                                                            <AppText color="white" >{t("RegisterwithGoogle")}</AppText>
                                                        </View>
                                                    </AppPressable>

                                                    {isIos ? (<AppPressable
                                                        onPress={() => handleAuthWithApple("login")}
                                                        style={{ justifyContent: "center", alignItems: "center", padding: 8 }}>
                                                        <View style={{ flexDirection: "row", backgroundColor: AppColorsTheme2.primary, minWidth: 200, alignItems: "center", justifyContent: "center", borderRadius: 80, paddingHorizontal: 10, paddingVertical: 4 }}>
                                                            <AppIcon style={{ marginRight: 8 }} size={25} color="white" name='apple' type="FontAwesome" />
                                                            <AppText color="white" >{t("RegisterwithApple")}</AppText>
                                                        </View>

                                                    </AppPressable>) : null}

                                                </View>
                                            </View>
                                            <AppSeparator />

                                            <Text style={{ color: "tomato" }}>{
                                                (touched.name && errors.name) && (`${errors.name}`)
                                            }</Text>
                                            <View style={styles.inputContainer}>
                                                <View style={{ flex: 1 }}>
                                                    <TextInput
                                                        autoCapitalize='none'
                                                        onChangeText={handleChange("name")}
                                                        value={values.name}
                                                        placeholder={t("Name")}
                                                        onBlur={() => setFieldTouched("name")}
                                                        placeholderTextColor={"#a4a3a8"}
                                                        style={styles.inputs}

                                                    />
                                                </View>
                                                <AppIcon name="person" color="gray" />
                                            </View>
                                            <Text style={{ color: "tomato" }}>{
                                                (touched.email && errors.email) && (`${errors.email}`)
                                            }</Text>
                                            <View style={styles.inputContainer}>
                                                <View style={{ flex: 1, justifyContent: "center" }}>
                                                    <TextInput
                                                        autoCapitalize="none"
                                                        value={values.email}
                                                        onChangeText={handleChange("email")}
                                                        placeholder={t("Email")}
                                                        placeholderTextColor={"#a4a3a8"}
                                                        style={styles.inputs}
                                                        onBlur={() => setFieldTouched("email")}
                                                    />
                                                </View>
                                                <AppIcon name="mail" type="Ionicons" color="gray" />
                                            </View>
                                            <Text style={{ color: "tomato" }}>{
                                                touched.password && errors.password && (`${errors.password}`)
                                            }</Text>
                                            <View style={styles.inputContainer}>
                                                <View style={{ flex: 1, justifyContent: "center" }}>
                                                    <TextInput
                                                        style={styles.inputs}
                                                        autoCapitalize="none"
                                                        placeholderTextColor={"#a4a3a8"}
                                                        value={values.password}
                                                        onBlur={() => setFieldTouched("password")}
                                                        onChangeText={handleChange("password")}
                                                        placeholder={t("Password")}
                                                        secureTextEntry={true} />
                                                </View>
                                                <AppIcon name="lock" type="FontAwesome" color="gray" />
                                            </View>
                                            <Text style={{ color: "tomato" }}>{
                                                touched.phone && errors.phone && (`${errors.phone}`)
                                            }</Text>
                                            <View style={styles.inputContainer}>
                                                <CountryPicker setSelectedFlag={(code) => {
                                                    setFieldValue("callingCode", code)
                                                }} />
                                                <Text style={{ fontSize: AppSizes.medium }}>({values.callingCode}){"  "}</Text>
                                                <View style={{ flex: 1, justifyContent: "center" }}>

                                                    <TextInput
                                                        value={values.phone}
                                                        placeholder={t("Phone")}
                                                        keyboardType="number-pad"
                                                        placeholderTextColor={"#a4a3a8"}
                                                        style={styles.inputs}
                                                        onBlur={() => setFieldTouched("phone")}
                                                        onChangeText={handleChange("phone")}
                                                    />
                                                </View>

                                                <AppIcon name="phone" type="FontAwesome" color="gray" />
                                            </View>
                                            <View style={{ flexDirection: "row", width: "75%", alignItems: "center", marginVertical: 8 }}>
                                                <BouncyCheckbox
                                                    size={25}
                                                    fillColor={AppColorsTheme2.secondary}
                                                    onBlur={() => setFieldTouched("isAgreed")}
                                                    onPress={(isChecked: boolean) => { setFieldValue("isAgreed", isChecked) }}
                                                />
                                                <AppText size={AppSizes.small}>
                                                    {t("AgreeOnConditions")}
                                                </AppText>
                                            </View>

                                            <View style={{ paddingVertical: 10 }}>
                                                <FilledButton
                                                    style={{ backgroundColor: isValid ? AppColorsTheme2.secondary : "#fde6b9" }}
                                                    disabled={!isValid}
                                                    onPress={handleSubmit}

                                                >{t("Register")}</FilledButton>
                                            </View>
                                            <View style={{ paddingVertical: 10 }}>
                                                <OutLinedButton
                                                    onPress={() => navigation.goBack()}
                                                >{t("Login")}</OutLinedButton>
                                            </View>
                                        </>
                                    )}
                                </Formik>
                                <FooterArea />
                            </View>


                            {/* <AppAlert  {...{ visible: verifyModalOpen, title: "Email Confirmation", message: `Code  will be sent to ${formRef.current?.values?.email} . Do you want to continue with this email ?`, onCancel: onCancelVerifyHandler, onConfirm: onConfirmVerifyHandler.bind(this, formRef.current?.values) }} /> */}
                        </View>



                    </KeyboardAwareScrollView>
                </View>
                {/* </SafeAreaProvider> */}
            </View>

        </>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({

    container: { flex: 1, backgroundColor: "#f4f1f6" },
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
    inputContainer: { height: 40, borderWidth: 1, width: "75%", borderRadius: 5, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, marginBottom: 10 },

    BackButtonStyle: {
        // borderTopLeftRadius: 10,
        // borderBottomLeftRadius: 10,
        right: 10,
        position: "absolute",
        top: "7%",
        width: 40,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 4,
        backgroundColor: AppColorsTheme2.gray11,
        height: 40,
    },

})