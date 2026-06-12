import { FlexAlignType, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { AppFonts } from '../../constants/fonts'
import { AppSizes } from '../../constants/Sizes'
import { AppColorsTheme2 } from '../../constants/Colors'
import { useLanguage } from '../../hooks/useLanguage.hook'



const AppText = ({ onPress, weight = "normal", children, size = AppSizes.medium, color = AppColorsTheme2.black, textStyle, style, alignItems = "center", nlines = undefined }: props) => {
    const { isArabic } = useLanguage()

    return (
        <View style={[{ justifyContent: "center", alignItems: alignItems }, style && style]}>
            <Text onPress={onPress} numberOfLines={nlines} style={[{ fontFamily: AppFonts.Roboto_Med, fontSize: size, color, fontWeight: weight }, isArabic && styles.arabicRight, textStyle && textStyle,]}>{children}</Text>
        </View>
    )
}

export default AppText
interface props {
    onPress?: () => void, nlines?: number, alignItems?: FlexAlignType, children: ReactNode, size?: number, textStyle?: TextStyle, style?: ViewStyle, color?: string,
    weight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
}
const styles = StyleSheet.create({
    arabicRight: {
        textAlign: "left"
    }
})