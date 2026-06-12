import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { verticalScale } from '../../../helpers/Scalling'
import CarItem from './CarItem'
import AppText from '../../ui/AppText'
import NoFavorites from '../../favorites/NoFavorites'
import NoContentFound from '../../ui/NoContent'
import { useTranslation } from 'react-i18next'

const UserCarsList = ({ data, filteredItem = [], refreshHandler, refreshing, deleteCarHandler, OnEmptyPress = () => { } }) => {

    const { t } = useTranslation()

    if (data.length === 0) return <NoContentFound title={t("NoUserCars")} message={t("UserCarWillAppear")} buttonMessage='AddCar' onPress={OnEmptyPress} />;

    const isFiltering = filteredItem?.length !== 0

    return (
        <View style={styles.container}>

            {isFiltering ? (
                <FlatList
                    refreshControl={<RefreshControl onRefresh={refreshHandler} refreshing={refreshing} />}
                    showsVerticalScrollIndicator={false}
                    data={filteredItem}
                    renderItem={({ item, index }) => {
                        return (<CarItem item={item} index={index} onDelete={deleteCarHandler} />)
                    }}
                    keyExtractor={(item, index) => `${index}` + `-${item.model}`}
                    style={{ flex: 1 }}
                />) : (<FlatList
                    refreshControl={<RefreshControl onRefresh={refreshHandler} refreshing={refreshing} />}
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={({ item, index }) => {
                        return (<CarItem item={item} index={index} onDelete={deleteCarHandler} />)
                    }}
                    keyExtractor={(item, index) => `${index}` + `-${item.model}`}
                    style={{ flex: 1 }}
                />)}


        </View>
    )
}

export default UserCarsList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: verticalScale(10)
        // padding: 16,
    },
})