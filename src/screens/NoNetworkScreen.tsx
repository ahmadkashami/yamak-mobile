import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FilledButton from '../components/ui/common/FilledButton'
import { useTranslation } from 'react-i18next'
import RNRestart from 'react-native-restart';

import Wifi_icon from "../assets/images/wifi.svg"
import AppText from '../components/ui/AppText'
import { AppSizes } from '../constants/Sizes'
const NoNetworkScreen = () => {
    const { t } = useTranslation()
    function onSubmit() {
        RNRestart.restart();
    }
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View >
                <Wifi_icon width={200} height={400} />
            </View>
            <View style={{ width: "80%", marginBottom: 20 }}>
                <AppText style={{ marginBottom: 8 }} textStyle={{ textAlign: "center", fontSize: AppSizes.xLarge }}>
                    {t("Whoops")}
                </AppText>
                <AppText textStyle={{ textAlign: "center" }}>
                    {t("NoInternetConnectionWasFound")}
                </AppText>
            </View>

            <FilledButton style={{ height: 50 }} onPress={onSubmit} >
                <Text>{t("TryAgain")}</Text>
            </FilledButton>
        </View>
    )
}

export default NoNetworkScreen

const styles = StyleSheet.create({})