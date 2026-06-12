import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import AnimatedLottieView from "lottie-react-native";

const LottieAnimation = ({
  file,
  style,
}: {
  file: any;
  style?: StyleProp<ViewStyle>;
}) => {
  const animation = useRef<AnimatedLottieView>(null);
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    animation.current?.play();
    animation.current;
  }, []);
  return (
    <View style={[styles.animationContainer, style]}>
      <LottieView resizeMode="cover" autoPlay ref={animation} source={file} />
    </View>
  );
};

export default LottieAnimation;

const styles = StyleSheet.create({
  animationContainer: {
    width: 340,
    height: 340,
    alignItems: "center",
    justifyContent: "center",
  },
});
