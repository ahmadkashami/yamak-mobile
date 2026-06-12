import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { AppColorsTheme2 } from '../../constants/Colors'
import { AppFonts } from '../../constants/fonts'
import { AppSizes } from '../../constants/Sizes'
import { useTranslation } from 'react-i18next'

const AvailableServiceList = ({ services, pickedServices, setPickedServices }: any) => {
    const { i18n } = useTranslation()
    function servicePressHandler(item) {
        const isPicked = pickedServices.find(el => el._id == item._id)
        isPicked ? setPickedServices((prev) => [...prev.filter(el => el._id != item._id)]) : setPickedServices((prev) => [...prev, item])
    }

    function isItemPicked(id: string) {
        return pickedServices.find(el => el._id == id)
    }

    return (
        <FlatList showsHorizontalScrollIndicator={false} data={services} horizontal renderItem={({ item }) => {
            return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Pressable
                    onPress={() => servicePressHandler(item)}
                    style={[styles.container, isItemPicked(item._id) && styles.picked]}>
                    <Image resizeMode="center" width={80} height={80} source={{ uri: item.logo }} />

                    <Text style={[styles.text, isItemPicked(item._id) && styles.pickedText]}>
                        {item?.name[i18n.language]}
                    </Text>
                </Pressable>
            </View>

        }} />
    )
}

export default AvailableServiceList

const styles = StyleSheet.create({
    picked: {
        borderColor: AppColorsTheme2.secondary,
        borderWidth: 2
    },
    pickedText: {
        color: AppColorsTheme2.secondary
    },
    text:
    {
        color: AppColorsTheme2.black,
        textTransform: "capitalize",
        fontFamily: AppFonts.Roboto_Med,
        fontSize: AppSizes.medium,
    },
    container: {
        backgroundColor: AppColorsTheme2.white,
        justifyContent: "center", alignItems: "center",
        marginRight: 10, padding: 10, borderRadius: 10,
        width: 150,
        height: 150,

    }

})