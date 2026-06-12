import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IServices } from '../../constants/data'
import { AppFonts } from '../../constants/fonts'
import { useServicesStore } from '../../store/services.store'
import { useNavigation } from '@react-navigation/native'
import { AppColorsTheme2 } from '../../constants/Colors'
import { ScreenNames } from '../../constants/ScreenNames'
import { useTranslation } from 'react-i18next'
import { horizontalScale } from '../../helpers/Scalling'
import AppText from '../ui/AppText'
import { AppSizes } from '../../constants/Sizes'

const ServiceItem = ({ item }: { item: IServices }) => {
    const { logo, name, _id } = item
    const { i18n } = useTranslation()
    const navigation = useNavigation()

    const selectedServiceId = useServicesStore((state) => state.selectedServiceId)
    const setSelectServiceId = useServicesStore((state) => state.setSelectServiceId)

    return (
        <Pressable onPress={() => {
            setSelectServiceId(_id)
            navigation.navigate(ScreenNames.Map_Screen, { id: _id })
        }} style={({ pressed }) => [styles.container, pressed && styles.pressed, selectedServiceId == item._id && { borderBottomWidth: 2, borderColor: AppColorsTheme2.secondary }]}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: item.logo }} />
            </View>
            <AppText size={AppSizes.xSmall} textStyle={styles.imageLable}>{name[i18n.language]}</AppText>
        </Pressable>
    )
}

export default ServiceItem

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: horizontalScale(8),
    },
    imageContainer: {
        height: 80,
        width: 80,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: AppColorsTheme2.secondary,
        overflow: "hidden"

    },
    image: {
        resizeMode: "contain",
        height: 60,
        width: 60,
    },
    imageLable: { fontFamily: AppFonts.Roboto_Med, marginVertical: 4 },
    pressed: {
        opacity: 0.7
    }
})