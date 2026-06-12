import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PressbleAppIcon from '../../ui/pressbleAppIcon'
import { AppColorsTheme2 } from '../../../constants/Colors'
import { horizontalScale, verticalScale } from '../../../helpers/Scalling'
import AppText from '../../ui/AppText'

const CarItem = ({ item, index, onDelete }: { item: any, index: number, onDelete: (id: string) => void }) => {
    const isEven = (index + 1) % 2 == 0
    return (
        < View style={[styles.card, isEven && { borderColor: AppColorsTheme2.secondary }]} >
            <View style={{ paddingHorizontal: 10 }}>
                <Image source={require("../../../assets/images/carImage.png")} style={styles.cardImage} />
            </View>
            <View style={styles.cardDetails}>
                <AppText textStyle={styles.carMake}>{item.make}</AppText>
                <AppText textStyle={styles.carModel}>{item.model}</AppText>
                <AppText textStyle={styles.carYear}>{item.year}</AppText>
                <AppText textStyle={styles.carYear}>{new Date(item?.createdAt).toLocaleDateString()}</AppText>

            </View>
            <View style={styles.trashDetails}>
                <PressbleAppIcon onPress={() => onDelete(item._id)} name='trash' color='tomato' />
            </View>
        </View >
    )
}

export default CarItem


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: verticalScale(10)
    },
    card: {
        paddingHorizontal: horizontalScale(10),
        flexDirection: 'row',
        backgroundColor: AppColorsTheme2.white,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        height: 120,
        alignItems: "center",
        borderWidth: 2,
        borderColor: AppColorsTheme2.primary
    },
    cardImage: {
        width: 80,
        height: 60,
        resizeMode: 'cover',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    cardDetails: {
        flex: 1,
        padding: 12,
    },
    trashDetails: {
        flex: 0.2,
        padding: 12,
    },
    carMake: {
        marginBottom: 4,
        fontSize: 18,
        fontWeight: 'bold',
        color: AppColorsTheme2.black,
    },
    carModel: {
        marginBottom: 4,

        fontSize: 16,
        color: '#666',
    },
    carYear: {
        marginBottom: 4,
        fontSize: 14,
        color: '#999',
    },
})