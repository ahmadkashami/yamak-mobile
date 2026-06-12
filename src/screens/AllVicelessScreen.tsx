import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Screen from '../components/Screen'
import HeaderList from '../components/HeaderList'
import AllVehiclesList from '../components/AllVeiclesList/AllVehiclesList'
import { useUserLocationStore } from '../store/userLocation.store'
import useFetchV2 from '../hooks/useFetchV2'
import { AppApiPath } from '../apis/apisPath'
import { ActivityIndicator } from 'react-native'
import { AppLimitList } from '../constants/CommonConsstats'


const AllVicelessScreen = () => {
    const [totalCount, setTotalCount] = useState(0)
    const userLocation = useUserLocationStore((state) => state.userLocation)
    const [currentPage, setCurrentPage] = useState(1)
    const [allVehicles, setAllVehicles] = useState([])
    const [sortType, setSortingType] = useState("asc")

    const [params, setParams] = useState({
        latitude: userLocation?.latitude,
        longitude: userLocation?.longitude,
    });
    const { responseData: vehiclesList, loading, refetch } = useFetchV2({
        url: AppApiPath.vehiclesListApi, method: "get", params: { sort: sortType, latitude: params.latitude, longitude: params.longitude, page: currentPage, limit: AppLimitList }
    })

    function onEndReachedHandler() {
        const startIndex = (currentPage - 1) * AppLimitList
        if (startIndex >= totalCount) return
        setCurrentPage(currentPage + 1)
    }

    useEffect(() => {
        setParams({
            latitude: userLocation?.latitude,
            longitude: userLocation?.longitude,
        });
    }, [userLocation?.latitude, userLocation?.longitude]);

    useEffect(() => {
        if (vehiclesList) {
            setAllVehicles(vehiclesList?.list);
            setTotalCount(vehiclesList?.metaData?.totalCount)
        }
    }, [vehiclesList, sortType])

    useEffect(() => {
        if (vehiclesList) {
            setAllVehicles((prev) => [...prev, ...vehiclesList?.list]);
        }
    }, [currentPage])

    useEffect(() => {
        refetch()
    }, [sortType])
    function handleSorting(sortType: string) {
        setSortingType(sortType)
    }

    return (
        <Screen style={{ backgroundColor: "white" }}>
            <HeaderList showSearch={false} onSortPress={handleSorting} count={totalCount} />
            {loading ? <ActivityIndicator /> : (<AllVehiclesList setAllVehicles={setAllVehicles} allVehicles={allVehicles} onEndReached={onEndReachedHandler} />
            )}
        </Screen>
    )
}

export default AllVicelessScreen

const styles = StyleSheet.create({})