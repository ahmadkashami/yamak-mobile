import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import PasswordReset from "../../assets/images/password-reset.svg"
import { AppColorsTheme2 } from '../../constants/Colors'
import { TextInput } from 'react-native-gesture-handler'
import AppIcon from '../ui/appIcon'
import FilledButton from '../ui/common/FilledButton'
import { AppFonts } from '../../constants/fonts'
import { AppSizes } from '../../constants/Sizes'
import { useTranslation } from 'react-i18next'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AppText from '../ui/AppText'


const EmailForgotPassword = ({ onSubmit, setEmail }) => {

    const { t } = useTranslation()

    return (
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, }}  >


            <View style={{ flex: 1, backgroundColor: AppColorsTheme2.white2, }}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "space-around", padding: 16 }} >
                    <View>
                        <View style={{ paddingBottom: 16 }}>
                            <AppText size={AppSizes.xLarge} style={{ alignItems: "flex-start", marginVertical: 4 }}>
                                {t("ForgotPasswordd")}
                            </AppText>
                        </View>

                        <View>
                            <Text style={{ marginVertical: 4, textAlign: "left", color: "gray", fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.large }}>
                                {t("EnterYourEmail")}
                            </Text>
                        </View>


                    </View>
                    <PasswordReset width={100} height={100} />
                    <View>
                        <AppText style={{ marginBottom: 16, alignSelf: "flex-start" }}>
                            {t("Email")}
                        </AppText>
                        <View style={{ height: 60, width: "85%", borderWidth: 1, borderRadius: 20, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, marginBottom: 4 }}>

                            <View style={{ flex: 1, justifyContent: "center" }}>
                                <TextInput
                                    autoCapitalize='none'
                                    onChangeText={(text) => setEmail(text)}
                                    // value={values.email}
                                    style={{ textAlign: "right", marginRight: 10, color: AppColorsTheme2.black, fontSize: AppSizes.medium }}
                                />
                            </View>
                            <AppIcon name="mail" color="gray" />
                        </View>


                    </View>

                    <View>
                        <FilledButton style={{ height: 60 }} onPress={onSubmit} >
                            <Text>{t("Submit")}</Text>
                        </FilledButton>
                    </View>

                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default EmailForgotPassword

const styles = StyleSheet.create({})