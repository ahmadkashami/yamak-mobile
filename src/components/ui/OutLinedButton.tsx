import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { FC } from "react";
import { AppColors, AppColorsTheme2 } from "../../constants/Colors";
import { AppFonts } from "../../constants/fonts";
import { AppSizes } from "../../constants/Sizes";
import { StyleProp } from "react-native";
import AppIcon from "./appIcon";

const OutLinedButton = ({ disabled = false, onPress, icon, children, style }: {
  disabled?: boolean
  style?: StyleProp<ViewStyle>
  children: string;
  onPress?: () => void;
  icon?: any
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => {
        return [styles.button, pressed && styles.pressed, style && style];
      }}
    >
      {icon && (
        <AppIcon
          type="Ionicons"
          style={styles.icon}
          name={icon}
          size={16}
          color={AppColors.secondary}
        />
      )}
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default OutLinedButton;

const styles = StyleSheet.create({
  button: {
    minWidth: "80%",
    minHeight: 40,
    borderColor: AppColorsTheme2.secondary,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  pressed: { opacity: 0.7 },
  icon: { marginRight: 6 },
  text: {
    color: AppColorsTheme2.secondary,
    fontFamily: AppFonts.Roboto_Med,
    fontSize: AppSizes.medium,
    fontWeight: "600",
    letterSpacing: 2,
    textTransform: "capitalize",
  },
});
