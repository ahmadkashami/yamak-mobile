import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, Pressable, Linking } from "react-native"
import { AppColorsTheme2 } from '../../../constants/Colors'
import { isValidHttpUrl } from '../../../helpers/AppHelpers'

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const CarouselCardItem = ({ item, index }: { item: any, index: number }) => {

    return (
        <Pressable
            onPress={() => {

                if (!isValidHttpUrl(item.link)) return

                const canOpen = Linking.canOpenURL(item.link)
                if (!canOpen) return
                Linking.openURL(item.link).catch(e => {
                    console.log(e);
                })

            }}
            style={styles.container} key={index}>
            <Image
                source={{ uri: item.photo }}
                resizeMode={"stretch"}
                style={styles.image}
            />
            {/* <Text style={styles.header}>{item.title}</Text> */}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColorsTheme2.primary200,
        borderRadius: 20,
        overflow: "hidden",
        width: ITEM_WIDTH,
        paddingBottom: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        height: 200

    },
    image: {
        width: ITEM_WIDTH,
        height: 200,
    },
    header: {
        color: "#222",
        fontSize: 28,
        fontWeight: "bold",
        paddingLeft: 20,
        paddingTop: 20
    },
    body: {
        color: "#222",
        fontSize: 18,
        paddingLeft: 20,
        paddingRight: 20
    }
})

export default CarouselCardItem