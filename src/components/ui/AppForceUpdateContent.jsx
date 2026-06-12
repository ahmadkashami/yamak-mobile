import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppSizes } from '../../constants/Sizes'
import { AppFonts } from '../../constants/fonts'
import { AppColorsTheme2 } from '../../constants/Colors'
import { useTranslation } from 'react-i18next'

const AppForceUpdateContent = ({
    message = "",
    title = "",
    isForceUpdate = false,
    onCancel,
    onConfirm,
    cancelMessage,
    confirmMessage
}) => {
    const { t } = useTranslation()
    return (
        <Pressable style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                <View style={{ flex: 0.3, backgroundColor: AppColorsTheme2.primary }}>
                    <View style={{ width: 100, height: 100, borderWidth: 6, borderColor: "white", position: "absolute", alignSelf: "center", top: -50, backgroundColor: AppColorsTheme2.primary, borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
                        <Image style={{ width: 60, height: 60 }} source={require("../../assets/images/update.png")} />
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text style={styles.messageText}>{message}</Text>
                </View>

                <View style={{ flexDirection: "column" }}>
                    <Pressable style={({ pressed }) => [styles.confirmButton, pressed && styles.pressed]} onPress={onConfirm}>
                        <Text style={styles.confirmButtonText}>{confirmMessage ? confirmMessage : t("Update")}</Text>
                    </Pressable>
                    {(cancelMessage && !isForceUpdate) ? <Pressable style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]} onPress={onCancel}>
                        <Text style={styles.cancelButtonText}>{cancelMessage ? cancelMessage : t("Cancel")}</Text>
                    </Pressable> : null}

                </View>

            </View>
        </Pressable>
    )
}

export default AppForceUpdateContent


const styles = StyleSheet.create({
    outerContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,

    },
    innerContainer: {
        width: '80%',
        height: 300,
        margin: 48,
        elevation: 24,
        borderRadius: 20,
        backgroundColor: "white",

    },

    titleText: {
        fontFamily: AppFonts.Roboto_Med,
        fontSize: AppSizes.large,
        textTransform: "capitalize",
        marginBottom: 10
        , maxWidth: 220

    },
    messageText: {
        fontFamily: AppFonts.Roboto_Med,
        fontSize: AppSizes.medium
        , maxWidth: 240,
        color: AppColorsTheme2.gray,
        lineHeight: 30,
        textAlign: "center"
    },
    confirmButton: {
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        backgroundColor: AppColorsTheme2.secondary,
        width: "60%",
        alignSelf: "center",
        borderRadius: 20
        , marginBottom: 12
    },
    cancelButton: {
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        color: AppColorsTheme2.secondary,
        marginBottom: 8
    },
    confirmButtonText: {
        fontFamily: AppFonts.Roboto_Med,
        fontSize: AppSizes.medium
        , color: "white"
        , textTransform: "capitalize"
    },
    cancelButtonText: {
        fontFamily: AppFonts.Roboto_Med,
        fontSize: AppSizes.medium,
        color: AppColorsTheme2.secondary,
        textTransform: "capitalize"
    },
    pressed: {
        opacity: 0.7
    }
})