import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import AppIcon from './appIcon'
import { useTranslation } from 'react-i18next'


const GoBackButton = ({ style, position }: { style?: ViewStyle, position?: "right" | "left" }) => {

    const navigation = useNavigation()
    const { i18n } = useTranslation()
    function goBackPressHandler() {
        navigation.goBack()
    }

    const backStyle = style ? style : styles.container
    const name = (position == "right" && style && i18n.language == "en") ? 'chevron-forward' : (position == "right" && style && i18n.language == "ar") ? 'chevron-back' : i18n.language == "en" ? 'chevron-back' : "chevron-forward"
    return (
        <Pressable
            onPress={goBackPressHandler}
            style={[backStyle]}>
            <AppIcon color='white' name={name} />
        </Pressable>
    )
}

export default GoBackButton

const styles = StyleSheet.create({
    container: {
        zIndex: 999,
        position: "absolute",
        flex: 1, left: 20,
        borderWidth: 1,
        padding: 4,
        borderRadius: 10,
        backgroundColor: "gray"
    }
})