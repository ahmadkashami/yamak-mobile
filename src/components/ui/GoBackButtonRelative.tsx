import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import AppIcon from './appIcon'
import { useTranslation } from 'react-i18next'


const GoBackButtonRelative = ({ style }: { style?: ViewStyle }) => {

    const navigation = useNavigation()
    const { i18n } = useTranslation()

    function goBackPressHandler() {
        navigation.goBack()
    }


    return (
        <Pressable
            onPress={goBackPressHandler}
            style={[styles.container, style && style]}>
            <AppIcon color='white' name={i18n.language == "en" ? 'chevron-back' : "chevron-forward"} />
        </Pressable>
    )
}

export default GoBackButtonRelative

const styles = StyleSheet.create({
    container: { left: 16, borderWidth: 1, padding: 4, borderRadius: 10, width: 35, height: 35, backgroundColor: "gray" }
})