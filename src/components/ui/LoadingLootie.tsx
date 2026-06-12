import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import AnimatedLottieView from "lottie-react-native";
const LoadingLoatie = ({ style }: { style?: ViewStyle }) => {
  const animation = useRef<AnimatedLottieView>(null);
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    animation.current?.play();
    animation.current;
  }, []);
  return (
    <View style={[styles.animationContainer, style && style]}>
      <LottieView
        resizeMode="cover"
        autoPlay
        ref={animation}
        source={require("../../constants/lootiesFiles/LoadignSec.json")}
      />
    </View>
  );
};

export default LoadingLoatie;

const styles = StyleSheet.create({
  animationContainer: {
    position: "absolute",
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99
  },
});
