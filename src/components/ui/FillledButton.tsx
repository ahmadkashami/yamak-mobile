import {
  I18nManager,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import React, { FC } from "react";
import { AppColors, AppColorsTheme2 } from "../../constants/Colors";
import { AppSizes } from "../../constants/Sizes";
import { AppFonts } from "../../constants/fonts";
import AppIcon from "./appIcon";
interface props {
  icon?: string;
  children?: JSX.Element;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
};
const FillledButton: FC<props> = ({
  icon,
  children,
  onPress,
  style,
  disabled,
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => {
        return [styles.button, pressed && styles.pressed, style];
      }}
    >
      {icon && !I18nManager.isRTL && (
        <AppIcon style={styles.icon} name={icon} size={25} color={"white"} />
      )}
      <Text style={styles.text}>{children}</Text>
      {icon && I18nManager.isRTL && (
        <AppIcon style={styles.icon} name={icon} size={25} color={"white"} />
      )}
    </Pressable>
  );
};

export default FillledButton;

const styles = StyleSheet.create({
  button: {
    // paddingHorizontal: 12,
    // paddingVertical: 6,
    margin: 4,
    flexDirection: "row",
    backgroundColor: AppColorsTheme2.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    minWidth: 40,
  },
  pressed: { opacity: 0.7 },
  icon: { marginRight: 6 },
  text: {
    color: "white",
    fontSize: AppSizes.small,
    fontFamily: AppFonts.Roboto_Med,
    textTransform: "capitalize"
  },
});
