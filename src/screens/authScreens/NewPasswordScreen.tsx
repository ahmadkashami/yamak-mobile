import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import Screen from '../../components/Screen'
import { AppSizes } from '../../constants/Sizes'
import { AppFonts } from '../../constants/fonts'
import { AppColorsTheme2 } from '../../constants/Colors'
import FilledButton from '../../components/ui/common/FilledButton'
import { Formik } from 'formik'
import { loginValidationSchema, resetPasswordValidationSchema } from '../../validationSchemas/loginSchema'
import AppIcon from '../../components/ui/appIcon'
import { httpErrorHandler, showToastMessage } from '../../helpers/AppHelpers'
import { showMessage } from 'react-native-flash-message'
import { resetPassword } from '../../apis/Auth.api'
import { useAuthenticationStoreAsync } from '../../store/auth.store'

const NewPasswordScreen = ({ route }) => {
    const { email } = route?.params
    const authenticate = useAuthenticationStoreAsync((state) => state.authenticate)

    async function onSubmit(values) {

        try {
            const response = await resetPassword(email, values.password)
            const { accessToken, user } = response.data
            authenticate(accessToken, user)
            showToastMessage("success", "Success", "reset paassword successfully updated")

        } catch (error) {
            const errorMessage = httpErrorHandler(error)
            // showMessage({ message: errorMessage, type: "danger" })
            showToastMessage("error", "Error", errorMessage)

        }
    }

    return (
        <Screen >
            <KeyboardAwareScrollView>
                <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: AppColorsTheme2.offWhite }}>
                    <View style={{ paddingTop: "15%", }}>
                        <View style={{ width: 220, height: 220, borderRadius: 125, backgroundColor: AppColorsTheme2.secondary200, justifyContent: "center", alignItems: "center" }}>
                            <Image style={{ width: 200, height: 200 }} source={require("../../assets/images/appLogo.png")} />
                        </View>

                    </View>
                    <View style={{ marginVertical: 20, width: "70%" }}>
                        <Text style={{ fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.xLarge, textAlign: "center", marginBottom: 8, color: AppColorsTheme2.secondary }}>Reset Password</Text>
                        <Text style={styles.subTitle}>please enter your new Password </Text>
                    </View>
                    <Formik
                        initialValues={{ password: "", confirmPassword: "" }}
                        validationSchema={resetPasswordValidationSchema}
                        onSubmit={(values) => {
                            onSubmit(values)

                        }}
                    >
                        {({
                            values,
                            handleSubmit,
                            handleChange,
                            isValid,
                            dirty,
                            errors,
                            touched
                        }) => (
                            <>

                                <Text style={{ color: "tomato" }}>{
                                    (touched.password && errors.password) && (`${errors.password}`)
                                }</Text>
                                <View style={{ height: 40, borderWidth: 1, width: "75%", borderRadius: 5, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, marginBottom: 10 }}>
                                    <View style={{ flex: 1, justifyContent: "center" }}>
                                        <TextInput
                                            autoCapitalize='none'
                                            onChangeText={handleChange("password")}
                                            value={values.password}
                                            placeholder="Password"
                                            secureTextEntry
                                        />
                                    </View>
                                    <AppIcon name="lock" type="FontAwesome" color="gray" />
                                </View>
                                <Text style={{ color: "tomato" }}>{
                                    errors.confirmPassword && (`${errors.confirmPassword}`)
                                }</Text>
                                <View style={{ height: 40, borderWidth: 1, width: "75%", borderRadius: 5, flexDirection: "row", alignItems: "center", paddingHorizontal: 10 }}>
                                    <View style={{ flex: 1, justifyContent: "center" }}>
                                        <TextInput
                                            autoCapitalize="none"
                                            onChangeText={handleChange("confirmPassword")}
                                            placeholder="Confirm Password"
                                            secureTextEntry={true} />
                                    </View>
                                    <AppIcon name="lock" type="FontAwesome" color="gray" />
                                </View>

                                <View style={{ marginVertical: "20%" }}>
                                    <FilledButton
                                        disabled={!isValid}
                                        onPress={handleSubmit}
                                        style={{ width: "30%" }} >
                                        submit
                                    </FilledButton>
                                </View>

                            </>
                        )}
                    </Formik>



                </View>
            </KeyboardAwareScrollView>
        </Screen>
    )
}

export default NewPasswordScreen

const styles = StyleSheet.create({
    subTitle: { fontFamily: AppFonts.Roboto_Med, color: AppColorsTheme2.gray, fontSize: AppSizes.medium, textAlign: "center" },
    resendButton: { justifyContent: "center", alignItems: "center" },
    pressed: { opacity: 0.7 }
})