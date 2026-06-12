import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import ServiceItem from './ServiceItem'
import { AppColorsTheme2 } from '../../constants/Colors'
import { AppFonts } from '../../constants/fonts'
import { useServicesStore } from '../../store/services.store'
import { useTranslation } from 'react-i18next'
import { AppSizes } from '../../constants/Sizes'
import { horizontalScale, verticalScale } from '../../helpers/Scalling'
import useFetchV2 from '../../hooks/useFetchV2'
import { AppApiPath } from '../../apis/apisPath'
// import ServiceListPH from '../placeHolders/ServiceListPH'
import { ActivityIndicator } from 'react-native'
import ServiceListPH from '../placeHolders/ServiceListPH'
import AppText from '../ui/AppText'


const renderItem = ({ item }: any) => (
    <ServiceItem item={item} />
);
const ServicesList = () => {
    const { t } = useTranslation();
    const setServices = useServicesStore((state) => state.setServices)
    const services = useServicesStore((state) => state.services)
    const { loading, error, responseData } = useFetchV2({ method: 'get', url: AppApiPath.serviceListApi });



    useEffect(() => {
        setServices(responseData?.list)
    }, [responseData])

    if (loading) {
        return (<ServiceListPH />)

    }

    return (
        <View style={styles.sectionContainer}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <AppText textStyle={styles.labelText}>
                    {t("Services")}
                </AppText>
            </View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={services}
                renderItem={renderItem}
            />
        </View>
    )
}

export default ServicesList

const styles = StyleSheet.create({
    labelText: { fontSize: AppSizes.medium, fontFamily: AppFonts.Roboto_Med },
    ViewLabelText: { fontSize: AppSizes.small, color: AppColorsTheme2.secondary, fontFamily: AppFonts.Roboto_Med },
    sectionContainer: {
        padding: horizontalScale(8),
        borderRadius: 10,
        marginVertical: verticalScale(10),
        marginHorizontal: horizontalScale(20),
        backgroundColor: "white"
    }
})