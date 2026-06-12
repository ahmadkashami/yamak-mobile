import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppFonts } from '../../constants/fonts'
import { useTranslation } from 'react-i18next'

const WelcomeArea = ({ subTitle }: { subTitle?: string }) => {
    const { t } = useTranslation()
    return (
        <View style={{}}>
            <Text
                style={styles.title}
            >
                {t("HelloAgain")}
            </Text>
            <Text
                numberOfLines={2}
                style={{
                    fontFamily: AppFonts.Roboto_Med,
                    width: 300,
                    textAlign: "center",
                    fontSize: 19,
                    letterSpacing: 4,
                    marginTop: 8,
                    textTransform: "capitalize",
                }}
            >
                {t("WelcomeBackLogin")}
            </Text>
            <Text
                numberOfLines={2}
                style={{
                    width: 300,
                    textAlign: "center",
                    color: "gray",
                    fontSize: 15,
                    marginTop: 20,

                }}
            >
                {subTitle ? subTitle : "Add your phone number . We`ll send you a verification code"}
            </Text>
        </View>

    )
}

export default WelcomeArea

const styles = StyleSheet.create({
    title: {
        marginTop: 20,
        fontSize: 25,
        fontWeight: "600",
        letterSpacing: 2,
        textAlign: "center",
    },
})