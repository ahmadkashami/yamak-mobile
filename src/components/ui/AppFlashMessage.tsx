import { StyleSheet, Text, View } from 'react-native'
import FlashMessage from "react-native-flash-message";
import React, { useEffect, useRef } from 'react'

import { AppFonts } from '../../constants/fonts';
import { AppSizes } from '../../constants/Sizes';
import { useErrorStore } from '../../store/AppError.store';


const AppFlashMessage = () => {

    const flashMessageRef = useRef()
    const error = useErrorStore((state) => state.error)
    const removeError = useErrorStore((state) => state.removeError)

    useEffect(() => {
        if (error) {
            flashMessageRef.current.showMessage({
                message: 'error happened',
                description: error,
                type: "danger",
            });
            setTimeout(() => {
                removeError()
            }, 3000);
        }
    }, [error])


    return (
        <FlashMessage
            ref={flashMessageRef}
            style={styles.flashMessage}
            duration={3000}
            animationDuration={1000}
            titleStyle={styles.flashTitle}
            textStyle={styles.flashText}
            transitionConfig={(animValue, position) => {
                const opacity = animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1]
                });
                const scaleY = animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1]
                });
                return {
                    opacity,
                    transform: [{ scaleY }]
                };
            }}
            icon="auto"
            // icon={({ style }) => {

            //     return <AppIcon style={style} />
            // }} 

            position="top" />

    )
}

export default AppFlashMessage

const styles = StyleSheet.create({
    flashTitle: {
        fontWeight: 'bold',
        textTransform: "capitalize",
        fontSize: AppSizes.medium
    },
    flashText: {
        fontFamily: AppFonts.Roboto_Med,
        fontSize: AppSizes.small
    },
    flashMessage: {
        borderRadius: 12,
        opacity: 0.9,
        borderWidth: 2,
        borderColor: '#222',
        margin: 12
    }
})