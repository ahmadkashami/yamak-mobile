import { Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import Screen from '../components/Screen'
import AppText from '../components/ui/AppText'
import PressbleAppIcon from '../components/ui/pressbleAppIcon'
import AppSearch from '../components/home/Search'
import { AppColorsTheme2 } from '../constants/Colors'
import { AppSizes } from '../constants/Sizes'
import { deviceWidth } from '../constants/CommonConsstats'
import { horizontalScale, verticalScale } from '../helpers/Scalling'
import BottomSheet from '../components/ui/BottomSheet'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'

import AddNewCarContent from '../components/Profile/myCarList/AddNewCarContent'
import useFetchV2 from '../hooks/useFetchV2'
import { AppApiPath } from '../apis/apisPath'
import { addUserCars, deleteUserCars, getUserCars } from '../apis/userCars.api'
import LoadingLoatie from '../components/ui/LoadingLootie'
import UserCarsList from '../components/Profile/myCarList/CarList'
import { ActivityIndicator } from 'react-native'
import { AppQueryConstatns } from '../constants/queryClient.constants'
import AppHeader from '../components/AppHeader'

const RightIcon = ({ onPress }) => {
    return (
        <PressbleAppIcon color='white' name="add" size={30} onPress={onPress}></PressbleAppIcon>
    )
}
const MyCarScreen = ({ navigation }) => {

    const [refreshing, setRefreshing] = useState(false)
    const [isCallingApi, setIsCallingApi] = useState(false)
    const [carList, setCarList] = useState([])
    const [filteredData, setFilteredData] = useState(carList);
    const { isPending, error, data: queryData } = useQuery({
        queryKey: [AppQueryConstatns.carList],
        queryFn: getUserCars
    })
    const { responseData: data, loading } = useFetchV2({ method: "get", url: AppApiPath.userCarsListApi })

    const bottomSheetRef = useRef()
    const { t } = useTranslation()

    useEffect(() => {
        console.log({ queryData });

        setCarList(data?.list)
    }, [data])


    async function handleSearch(text) {
        if (carList.length == 0) return
        const filteredItems = carList.filter((item) =>
            item?.model?.toLowerCase().includes(text.toLowerCase()) || item?.make?.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filteredItems);

    }


    async function addNewCarHandler(car) {
        const response = await addUserCars(car)
        const carlistResponse = await getUserCars()
        setCarList(carlistResponse?.list)
        setRefreshing(false)
        bottomSheetRef.current.close()
    }

    async function deleteCarHandler(id: string) {
        const response = await deleteUserCars(id)
        const carlistResponse = await getUserCars()
        setCarList(carlistResponse?.list)
    }
    function OpenBottomSheetHandler() {
        bottomSheetRef.current.present()
    }
    const refreshHandler = useCallback(async () => {
        try {
            const carlistResponse = await getUserCars()
            setCarList(carlistResponse?.list)
            setRefreshing(false)

        } catch (error) {
            console.log(error);
        }
    },
        []
    )


    return (
        <View style={{ flex: 1 }}>

            {isCallingApi && <LoadingLoatie />}
            <AppHeader
                navigation={navigation}
                title={t("MyCarList")}
                RightIcon={RightIcon}
                rightIconProps={{ onPress: OpenBottomSheetHandler }}
            />
            <View style={{ paddingHorizontal: 24, flex: 1, backgroundColor: AppColorsTheme2.offWhite }}>


                <View style={{ marginTop: 20 }}>
                    <AppSearch onSearch={handleSearch} label={t("Search")} />
                </View>

                {loading ? (<ActivityIndicator />) : (
                    <UserCarsList OnEmptyPress={OpenBottomSheetHandler} deleteCarHandler={deleteCarHandler} data={carList} filteredItem={filteredData} refreshHandler={refreshHandler} refreshing={refreshing} />
                )}
            </View>
            <BottomSheet ref={bottomSheetRef} snapPoint={["80%"]} >
                <AddNewCarContent onAddCar={addNewCarHandler} />
            </BottomSheet>
        </View >
    )
}

export default MyCarScreen

