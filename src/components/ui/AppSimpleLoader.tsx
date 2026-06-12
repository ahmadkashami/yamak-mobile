import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import AnimatedLottieView from "lottie-react-native";


const AppSimpleLoader = ({ style }: { style?: ViewStyle }) => {
    const animation = useRef<AnimatedLottieView>(null);
    useEffect(() => {
        animation.current?.play();
    }, []);
    return (
        <View style={[styles.animationContainer, style && style]}>
            <LottieView
                resizeMode="cover"
                autoPlay
                ref={animation}
                source={require("../../constants/lootiesFiles/loaderSimple.json")}
            />
        </View>
    );
};

export default AppSimpleLoader;

const styles = StyleSheet.create({
    animationContainer: {
        position: "absolute",
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99
    },
});
