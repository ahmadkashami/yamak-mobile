import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { AppColorsTheme2 } from "../../../constants/Colors";
import { AppFonts } from "../../../constants/fonts";
import { AppSizes } from "../../../constants/Sizes";
import { StyleProp } from "react-native";
import AppIcon, { IconsTypes } from "../appIcon";

const FilledButton = ({
    icon,
    disabled = false,
    children,
    onPress,
    style,
    iconType,
    iconStyle
}: props) => {
    return (
        <Pressable
            disabled={disabled}
            onPress={onPress}
            style={({ pressed }) => [styles.container, pressed && styles.pressed, style && style]}
        >
            {icon && <AppIcon name={icon} type={iconType} style={{ marginRight: 10 }} />}
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
};

export default FilledButton;

interface props {
    disabled?: boolean
    style?: StyleProp<ViewStyle>
    children: string;
    onPress?: () => void;
    icon?: string
    iconType?: IconsTypes,
    iconStyle?: ViewStyle
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        minWidth: "80%",
        minHeight: 40,
        backgroundColor: AppColorsTheme2.secondary,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
    },
    pressed: { opacity: 0.7 },
    text: {
        color: "white",
        fontFamily: AppFonts.Roboto_Med,
        fontSize: AppSizes.xMedium,
        fontWeight: "800",
        letterSpacing: 2,
        textTransform: "capitalize",
    },
});
