import React from 'react'
import { View } from "react-native"
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from "./CarouselCardItem"


const CarouselCards = ({ data }) => {
    const isCarousel = React.useRef(null)

    return (
        <View style={{ marginLeft: -80 }} >
            <Carousel
                layout="default"
                layoutCardOffset={2}
                ref={isCarousel}
                data={data}
                renderItem={CarouselCardItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                inactiveSlideShift={0}
                useScrollView={true}
                autoplay={true}
            />
        </View>
    )
}


export default CarouselCards