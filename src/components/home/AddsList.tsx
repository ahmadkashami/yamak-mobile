import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import CarouselCards from '../ui/carousel-snap/CarouselCards'
import { horizontalScale, verticalScale } from '../../helpers/Scalling'
import useFetchV2 from '../../hooks/useFetchV2'
import { AppApiPath } from '../../apis/apisPath'
import { ActivityIndicator } from 'react-native'
import { useAddsStore } from '../../store/adds.store'
import AddsListPh from '../placeHolders/AddsListPh'
// import AddsListPh from '../placeHolders/AddsListPh'

const AddsList = () => {
    const setAdds = useAddsStore((state) => state.setAdds)
    const adds = useAddsStore((state) => state.adds)
    const { responseData: addsResponse, loading } = useFetchV2({ method: "get", url: AppApiPath.addsListApi })

    useEffect(() => {
        setAdds(addsResponse?.list)
    }, [addsResponse])

    if (loading) {
        return <AddsListPh />
    }

    return (
        <View style={styles.sectionContainer}>
            <CarouselCards data={adds} />
        </View>
    )
}

export default AddsList

const styles = StyleSheet.create({
    sectionContainer: {
        padding: horizontalScale(8),
        borderRadius: 10,
        marginVertical: verticalScale(10),
        marginHorizontal: horizontalScale(20),

    }
})