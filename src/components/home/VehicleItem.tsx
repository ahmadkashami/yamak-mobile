import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppFonts } from '../../constants/fonts'
import { AppColorsTheme2 } from '../../constants/Colors'
import AppIcon from '../ui/appIcon'
import { AppSizes } from '../../constants/Sizes'
import { useNavigation } from '@react-navigation/native'
import { ScreenNames } from '../../constants/ScreenNames'
import FillledButton from '../ui/FillledButton'
import AppSeparator from '../ui/AppSeparator'
import { useTranslation } from 'react-i18next'
import { verticalScale } from '../../helpers/Scalling'
import { fixNumbers } from '../../helpers/AppHelpers'
import AppText from '../ui/AppText'

const VehicleItem = ({ item, isVertical = false }: { item: any, isVertical: boolean }) => {

    const navigator = useNavigation()
    const { t } = useTranslation()


    function vehiclesPressHandler() {

        navigator.push(ScreenNames.Vehicle_Details_Screen, { _id: item._id })

    }
    return (
        <Pressable onPress={vehiclesPressHandler} style={({ pressed }) => [styles.container, isVertical ? { marginVertical: verticalScale(5) } : { marginRight: 20, width: 350, }, pressed && styles.pressed]}>
            <View style={styles.innerContainer} >
                <View style={{ flex: isVertical ? 1 : 1.5, alignItems: "center", justifyContent: "center" }}>
                    {/* <Image resizeMode='contain' source={require("../../assets/images/YamakTow3.png")} style={{ width: "100%", height: "100%" }} /> */}
                    <Image resizeMode='contain' source={{ uri: item?.iconMap }} style={{ width: "100%", height: "100%" }} />

                </View>
                <View style={{ borderWidth: 1, height: "80%", alignSelf: "center" }} />

                <View style={{ flex: 2, padding: 10 }}>
                    <View style={{ flex: 2 }}>
                        <Text numberOfLines={1} style={{ color: AppColorsTheme2.black, textAlign: "left", fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.medium, textTransform: "capitalize" }}>{t("Name")} : {item.branch.name}</Text>
                        <Text style={{ color: AppColorsTheme2.black, fontWeight: "500", fontFamily: AppFonts.Roboto_Med, textAlign: "left", }}>{t("Services")} : {item.services.length}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <AppSeparator />
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <AppIcon name='location' />
                                <AppText size={AppSizes.xSmall} >{fixNumbers(item?.distance)} {t("KM")}</AppText>
                            </View>
                            <FillledButton onPress={vehiclesPressHandler} style={{ width: 60, height: 30 }}  >{t("View")}</FillledButton>
                        </View>
                    </View>


                </View>
            </View>
        </Pressable >
    )
}

export default VehicleItem

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: AppColorsTheme2.white,
        // borderRadius: 20,


    },
    innerContainer: {
        flexDirection: "row",
        height: 120,
        borderRadius: 20,
    },
    imageLabel: { fontFamily: AppFonts.Roboto_Med, marginVertical: 4 },
    pressed: {
        opacity: 0.7
    }
})