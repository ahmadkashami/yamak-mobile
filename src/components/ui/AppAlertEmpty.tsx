import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { ReactChild, ReactNode } from 'react'
import { AppFonts } from '../../constants/fonts'
import { AppSizes } from '../../constants/Sizes'
import { AppColorsTheme2 } from '../../constants/Colors'


interface props {
    visible?: boolean,
    children: ReactNode,
    filledText?: String,
    OutLineText?: String
    onConfirm?: () => {},
    onCancel?: () => {}
}
const AppAlertEmpty = ({
    visible,
    children,
    filledText,
    OutLineText,
    onConfirm,
    onCancel,
}: props) => {

    return (
        <Modal
            animationType="slide"
            visible={visible}
            transparent
        >
            <Pressable style={styles.outerContainer}>
                <View style={styles.innerContainer}>
                    <View style={{ flex: 0.3, backgroundColor: AppColorsTheme2.primary }}>
                        <View style={{ width: 100, height: 100, borderWidth: 6, borderColor: "white", position: "absolute", alignSelf: "center", top: -50, backgroundColor: AppColorsTheme2.primary, borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
                            <Image style={{ width: 70, height: 70 }} source={require("../../assets/images/exclamation.png")} />
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        {children}
                    </View>

                    <View style={{ flexDirection: "column" }}>
                        {filledText && <Pressable style={({ pressed }) => [styles.confirmButton, pressed && styles.pressed]} onPress={onConfirm}>
                            <Text style={styles.confirmButtonText}>{filledText}</Text>
                        </Pressable>}

                        {OutLineText && <Pressable style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]} onPress={onCancel}>
                            <Text style={styles.cancelButtonText}>{OutLineText}</Text>
                        </Pressable>}
                    </View>
                </View>
            </Pressable>
        </Modal >
    )
}

export default AppAlertEmpty

const styles = StyleSheet.create({
    outerContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'

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
    },
    cancelButton: {
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        color: AppColorsTheme2.secondary
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