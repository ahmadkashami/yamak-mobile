

import ContentLoader, { Rect, Circle, Path } from 'react-content-loader/native'
import { AppColorsTheme2 } from '../../constants/Colors'
import { SLIDER_WIDTH } from '../ui/carousel-snap/CarouselCardItem'
import { StyleSheet, View } from 'react-native'
import { horizontalScale, verticalScale } from '../../helpers/Scalling'

const NearByVehiclePH = () => (
    <View style={styles.container}>
        <ContentLoader
            height={150}
            speed={2}
            // style={{ borderRadius: 20, overflow: "hidden" }}
            backgroundColor={AppColorsTheme2.primaryLight}
            foregroundColor={'#fff'}
            opacity={0.5}
        >
            <Path x={50} y={50} />
        </ContentLoader>
    </View>

)
export default NearByVehiclePH

const styles = StyleSheet.create({
    container: {
        padding: horizontalScale(8),
        marginHorizontal: horizontalScale(20),
    }
})
