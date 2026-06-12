import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { AppColorsTheme2 } from '../../constants/Colors'
import { AppFonts } from '../../constants/fonts'
import VehicleItem from './VehicleItem'
import { useTranslation } from 'react-i18next'
import { AppSizes } from '../../constants/Sizes'
import { useUserLocationStore } from '../../store/userLocation.store'
import { horizontalScale, verticalScale } from '../../helpers/Scalling'
import useFetchV2 from '../../hooks/useFetchV2'
import { AppApiPath } from '../../apis/apisPath'
import { ActivityIndicator } from 'react-native'
import { useVehicleStore } from '../../store/vehicles.store'
import { useNavigation } from '@react-navigation/native'
import { ScreenNames } from '../../constants/ScreenNames'
import AppText from '../ui/AppText'
import NearByVehiclePH from '../placeHolders/NearByVehiclePH'


const renderItem = ({ item }: any) => (
    <VehicleItem isVertical={false} item={item} />
);
const VehiclesList = ({ horizontal = true, title = "", selectedId = "" }) => {
    const { t } = useTranslation()
    const navigation = useNavigation()
    const userLocation = useUserLocationStore((state) => state.userLocation)
    const setVehicles = useVehicleStore((state) => state.setVehicles)
    let vehicles = useVehicleStore((state) => state.vehicles)
    const [params, setParams] = useState({
        latitude: userLocation?.latitude,
        longitude: userLocation?.longitude,
    });
    const { responseData: vehiclesList, loading } = useFetchV2({
        url: AppApiPath.vehiclesListApi, method: "get", params
    })

    vehicles = useMemo(() => {
        return vehicles?.filter(el => el?._id !== selectedId)
    }, [selectedId, vehicles])


    useEffect(() => {
        setParams({
            latitude: userLocation?.latitude,
            longitude: userLocation?.longitude,
        });
    }, [userLocation?.latitude, userLocation?.longitude]);

    useEffect(() => { setVehicles(vehiclesList?.list) }, [vehiclesList])

    if (loading) {
        return (
            <NearByVehiclePH />
        )

    }
    if (!title) {
        title = t("VehiclesNearBy")
    }


    return (
        <View style={styles.sectionContainer}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <AppText textStyle={styles.labelText}>
                    {title}
                </AppText>
                <Pressable
                    onPress={() => {
                        navigation.navigate(ScreenNames.ALL_VEHICLES_SCREEN)
                    }}
                >
                    <Text style={styles.ViewLabelText}>
                        {t("ViewAll")}
                    </Text>
                </Pressable>

            </View>

            <FlatList

                showsHorizontalScrollIndicator={false}
                horizontal={horizontal}
                data={vehicles}
                renderItem={renderItem}
            />
        </View>
    )
}

export default VehiclesList

const styles = StyleSheet.create({
    labelText: {
        fontSize: AppSizes.medium,
        fontFamily: AppFonts.Roboto_Med
    },
    ViewLabelText: {
        fontSize: AppSizes.small,
        color: AppColorsTheme2.secondary,
        fontFamily: AppFonts.Roboto_Med
    },
    sectionContainer: {
        borderRadius: 10,
        marginVertical: verticalScale(10),
        marginHorizontal: horizontalScale(20),
        // backgroundColor: "white"
    }
})