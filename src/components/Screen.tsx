import { StyleSheet, Platform, SafeAreaView, ViewStyle, StatusBar } from "react-native";

import { ReactNode } from "react";
import { AppColorsTheme2 } from "../constants/Colors";


interface Props {
  children: ReactNode,
  style?: ViewStyle
}

const Screen = ({ children, style }: Props) => {
  return (
    <>
      <StatusBar
        animated={true}
        barStyle="dark-content"
      />
      <SafeAreaView style={[styles.container, styles.AndroidSafeArea, style]}>
        {children}
      </SafeAreaView>
    </>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColorsTheme2.offWhite
  },
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,

  },
});
