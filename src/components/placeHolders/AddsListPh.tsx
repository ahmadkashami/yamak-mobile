


import ContentLoader, { Rect, Circle, Path } from 'react-content-loader/native'
import { Code } from 'react-content-loader'

import { AppColorsTheme2 } from '../../constants/Colors'
import { SLIDER_WIDTH } from '../ui/carousel-snap/CarouselCardItem'
import { StyleSheet, View } from 'react-native'
import { horizontalScale, verticalScale } from '../../helpers/Scalling'

const AddsListPh = () => (
    <View style={styles.container}>
        <ContentLoader
            height={200}
            speed={2}
            style={{ borderRadius: 20, overflow: "hidden" }}
            backgroundColor={AppColorsTheme2.primaryLight}
            foregroundColor={'#fff'}
            opacity={0.5}
        // viewBox="0 0 380 70"
        >
            <Path x={50} y={50} />
        </ContentLoader>
    </View>

)
export default AddsListPh

const styles = StyleSheet.create({
    container: {
        padding: horizontalScale(8),

        // marginVertical: verticalScale(10),
        marginHorizontal: horizontalScale(20),
    }
})
