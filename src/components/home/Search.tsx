import { Pressable, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppColorsTheme2 } from '../../constants/Colors'
import AppIcon from '../ui/appIcon'
import { AppFonts } from '../../constants/fonts'
import { useLanguage } from '../../hooks/useLanguage.hook'
import PressbleAppIcon from '../ui/pressbleAppIcon'

interface props { style?: ViewStyle, label: string, onSearch: (text: string) => void }
const AppSearch = ({ label = "", onSearch = (text: string) => { }, style }: props) => {
    const { isArabic } = useLanguage()
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        onSearch(searchTerm)
    }, [searchTerm]);

    const handleBlur = () => {
        // Trigger onSearch when the user finishes typing
        onSearch(searchTerm);
    };
    return (
        <Pressable
            style={[styles.container, style && style]}>
            <TextInput
                onChangeText={(text) => setSearchTerm(text)}
                value={searchTerm}
                placeholder={label}
                placeholderTextColor={AppColorsTheme2.gray11}

                onBlur={handleBlur}
                style={{ color: AppColorsTheme2.black, flex: 1, textAlign: isArabic ? "right" : "left" }} />
            {!searchTerm ? <AppIcon name='search' /> : <PressbleAppIcon name='close' onPress={() => setSearchTerm("")} />}

        </Pressable>
    )
}

export default AppSearch

const styles = StyleSheet.create({
    text: {
        fontFamily: AppFonts.Roboto_Med
    },
    container: { alignItems: "center", borderWidth: 1, height: 50, backgroundColor: AppColorsTheme2.secondary200, borderRadius: 20, paddingHorizontal: 10, flexDirection: "row" }
})