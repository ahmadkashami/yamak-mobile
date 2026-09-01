import React from 'react'
import { FlatList, View } from "react-native"
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from "./CarouselCardItem"

const AUTOPLAY_DELAY = 5000
const AUTOPLAY_INTERVAL = 3000

const CarouselCards = ({ data = [] }: { data?: any[] }) => {
    const carousel = React.useRef<FlatList<any>>(null)
    const activeIndex = React.useRef(0)

    React.useEffect(() => {
        if (data.length < 2) return

        activeIndex.current = Math.min(activeIndex.current, data.length - 1)
        let autoplayInterval: ReturnType<typeof setInterval> | undefined
        const autoplayDelay = setTimeout(() => {
            autoplayInterval = setInterval(() => {
                activeIndex.current = (activeIndex.current + 1) % data.length
                carousel.current?.scrollToIndex({
                    animated: true,
                    index: activeIndex.current,
                })
            }, AUTOPLAY_INTERVAL)
        }, AUTOPLAY_DELAY)

        return () => {
            clearTimeout(autoplayDelay)
            if (autoplayInterval) clearInterval(autoplayInterval)
        }
    }, [data.length])

    return (
        <View style={{ marginLeft: -80 }} >
            <FlatList
                ref={carousel}
                data={data}
                renderItem={CarouselCardItem}
                keyExtractor={(item, index) => String(item?.id ?? item?._id ?? index)}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: (SLIDER_WIDTH - ITEM_WIDTH) / 2,
                }}
                decelerationRate="fast"
                disableIntervalMomentum
                snapToInterval={ITEM_WIDTH}
                getItemLayout={(_, index) => ({
                    length: ITEM_WIDTH,
                    offset: ITEM_WIDTH * index,
                    index,
                })}
                onMomentumScrollEnd={event => {
                    activeIndex.current = Math.min(
                        data.length - 1,
                        Math.round(
                            Math.abs(event.nativeEvent.contentOffset.x) / ITEM_WIDTH,
                        ),
                    )
                }}
            />
        </View>
    )
}


export default CarouselCards
