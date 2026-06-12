

import ContentLoader, { Rect, Circle, Path } from 'react-content-loader/native'
import { AppColorsTheme2 } from '../../constants/Colors'
import { SLIDER_WIDTH } from '../ui/carousel-snap/CarouselCardItem'
import { FlatList, StyleSheet, View, ViewStyle } from 'react-native'
import { horizontalScale, verticalScale } from '../../helpers/Scalling'

const CirclePh = () => (

    <ContentLoader
        height={80}
        width={80}
        style={{ marginHorizontal: horizontalScale(8) }}
        speed={2}
        // style={{ borderRadius: 20, overflow: "hidden" }}
        backgroundColor={AppColorsTheme2.primaryLight}
        foregroundColor={'#efef'}
        opacity={0.7}

    >
        <Circle cx="40" cy="40" r="40" />
    </ContentLoader>

)


const ServiceListPH = ({ style }: { style: ViewStyle }) => {

    return (
        <View style={[styles.container, style]}>
            <FlatList showsHorizontalScrollIndicator={false} horizontal data={[1, 2, 3, 4, 5]} renderItem={() => <CirclePh />} />
        </View>
    )
}

export default ServiceListPH

const Spacer = ({ height = 16 }) => <View style={{ height }} />;

const styles = StyleSheet.create({
    container: {
        height: 120,
        padding: 8,
        borderRadius: 10,
        marginVertical: verticalScale(10),
        marginHorizontal: horizontalScale(20),
        backgroundColor: "white"
    },

});
