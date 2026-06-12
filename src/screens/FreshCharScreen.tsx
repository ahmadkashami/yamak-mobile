import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ChatBotSvg from "../assets/svgs/ChatBot.svg"
import FilledButton from '../components/ui/common/FilledButton'
import { Freshchat, conversationOptions } from '../services/freshchat/freshchat.config'
import { useTranslation } from 'react-i18next'
import AppHeader from '../components/AppHeader'
import { AppColorsTheme2 } from '../constants/Colors'

const FreshCharScreen = ({ navigation }) => {
    const { t } = useTranslation()

    function handlePress() {

        Freshchat.showConversations(conversationOptions);
    }
    return (
        <View style={{ flex: 1, backgroundColor: AppColorsTheme2.offWhite }}>
            <AppHeader navigation={navigation} title={t("ChatWithUs")} />
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: AppColorsTheme2.offWhite }}>
                <ChatBotSvg width={300} height={300} />
                <FilledButton style={{ marginTop: 30 }} onPress={handlePress}>
                    {t("StartConversation")}
                </FilledButton>
            </View>

        </View>
    )
}

export default FreshCharScreen

const styles = StyleSheet.create({})