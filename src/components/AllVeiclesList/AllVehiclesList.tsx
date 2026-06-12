import { ActivityIndicator, Alert, Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useUserLocationStore } from '../../store/userLocation.store'
import { useVehicleStore } from '../../store/vehicles.store'
import useFetchV2 from '../../hooks/useFetchV2'
import { AppApiPath } from '../../apis/apisPath'
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import VehicleItem from '../home/VehicleItem'
import { getAllVehicles } from '../../apis/vehicles.api'
import { AppColorsTheme2 } from '../../constants/Colors'
import { AppLimitList } from '../../constants/CommonConsstats'


const AllVehiclesList = ({ setAllVehicles, allVehicles, onEndReached }) => {
    const { height } = Dimensions.get('window');

    const [refreshing, setRefreshing] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const onEndReachedCalledDuringMomentum = useRef(true)


    // const [params, setParams] = useState({
    //     latitude: userLocation?.latitude,
    //     longitude: userLocation?.longitude,
    // });
    // const { responseData: vehiclesList, loading } = useFetchV2({
    //     url: AppApiPath.vehiclesListApi, method: "get", params: { latitude: params.latitude, longitude: params.longitude, page: currentPage, limit: 1 }
    // })

    // useEffect(() => {
    //     setParams({
    //         latitude: userLocation?.latitude,
    //         longitude: userLocation?.longitude,
    //     });
    // }, [userLocation?.latitude, userLocation?.longitude]);

    // useEffect(() => {
    //     console.log({ vehiclesList: vehiclesList });
    //     if (vehiclesList) {
    //         setAllVehicles((prevVehicles) => [...prevVehicles, ...vehiclesList?.list]);
    //         setTotalCount(vehiclesList?.metaData?.totalCount)
    //     }

    // }, [vehiclesList])

    function pullToRefreshFunction() {
        setRefreshing(true)
        setTimeout(() => {
            getAllVehicles({ page: 1, limit: AppLimitList }).then(res => {
                setAllVehicles(res);
                setRefreshing(false)
            }).catch(e => {
                setRefreshing(false)
            })

        }, 1500)
    }

    // async function handleEndReach() {
    //     console.log("end");

    //     if (isLoadingMore) { return }
    //     setIsLoadingMore(true);
    //     const contentToAppend = await getAllVehicles({ page: currentPage + 1, limit: AppLimitList });
    //     if (contentToAppend?.length > 0) {
    //         setAllVehicles((prevVehicles) => [...prevVehicles, ...contentToAppend]);
    //         setCurrentPage(currentPage + 1);

    //     }
    //     setIsLoadingMore(false);
    // }

    return (
        <View style={{
            flex: 1,
            backgroundColor: AppColorsTheme2.offWhite,
            // marginHorizontal: 16,
            height: height
        }}>
            <FlatList
                onEndReachedThreshold={0.5}
                style={{ marginHorizontal: 16 }}
                onEndReached={() => {
                    if (!onEndReachedCalledDuringMomentum.current) {
                        onEndReached()
                        onEndReachedCalledDuringMomentum.current = true
                    }
                }}
                onMomentumScrollBegin={() => { onEndReachedCalledDuringMomentum.current = false }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={pullToRefreshFunction}
                    />}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={allVehicles}
                renderItem={renderItem}
            />
            {isLoadingMore ? <ActivityIndicator /> : null}
        </View>

    )
}

const renderItem = ({ item }: any) => (
    <VehicleItem isVertical={true} item={item} />
);


export default AllVehiclesList

const styles = StyleSheet.create({})