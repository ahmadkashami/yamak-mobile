import React from "react";
import { SafeAreaView, ScrollView, ViewProps, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";

const AppBlock = ({
    children,
    style,
    flex = 1,
    row,
    justify,
    justifyContent,
    align,
    alignItems,
    content,
    alignContent,
    wrap,
    width,
    height,
    position,
    top,
    right,
    bottom,
    left,
    // add the next props
    color,
    outlined,
    card,
    radius,
    overflow,
    safe,
    scroll,
    shadow,
    ...props
}: IBlock) => {
    const blockStyle = StyleSheet.flatten([
        flex !== undefined && { flex },
        row && { flexDirection: "row" },
        justify !== undefined && { justifyContent: justify },
        justifyContent !== undefined && { justifyContent },
        align !== undefined && { alignItems: align },
        alignItems !== undefined && { alignItems },
        content !== undefined && { alignContent: content },
        alignContent !== undefined && { alignContent },
        wrap !== undefined && { flexWrap: wrap },
        width !== undefined && { width },
        height !== undefined && { height },
        position !== undefined && { position },
        top !== undefined && { top },
        right !== undefined && { right },
        bottom !== undefined && { bottom },
        left !== undefined && { left },
        color !== undefined && { backgroundColor: color },
        outlined && {
            borderWidth: 1,
            borderColor: color,
            backgroundColor: 'transparent',
        },
        card && {
            backgroundColor: 'white',
            borderRadius: 16,
            padding: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 7,
            },
            shadowOpacity: 0.07,
            shadowRadius: 4,
            elevation: 2
        },
        radius !== undefined && { borderRadius: radius },
        overflow !== undefined && { overflow },
        shadow !== undefined && { ...shadow },
        // the style property will overwrite all above styles
        style
    ]);

    // renders SafeAreaView if safe props is true
    if (safe) {
        return (
            <SafeAreaView style={blockStyle} {...props}>
                {children}
            </SafeAreaView>
        );
    }

    // renders ScrollView if scroll props is true
    if (scroll) {
        return (
            <ScrollView style={blockStyle} {...props}>
                {children}
            </ScrollView>
        );
    }

    return (
        <View style={blockStyle} {...props}>
            {children}
        </View>
    );
};



interface IBlock extends ViewProps {
    flex?: ViewStyle["flex"];
    row?: boolean;
    justify?: ViewStyle["justifyContent"];
    justifyContent?: ViewStyle["justifyContent"];
    align?: ViewStyle["alignItems"];
    alignItems?: ViewStyle["alignItems"];
    content?: ViewStyle["alignContent"];
    alignContent?: ViewStyle["alignContent"];
    wrap?: ViewStyle["flexWrap"];
    width?: ViewStyle["width"];
    height?: ViewStyle["height"];
    position?: ViewStyle["position"];
    top?: ViewStyle["top"];
    right?: ViewStyle["right"];
    bottom?: ViewStyle["bottom"];
    left?: ViewStyle["left"];
    color?: ViewStyle["backgroundColor"];
    outlined?: boolean;
    card?: boolean;
    radius?: ViewStyle["borderRadius"];
    overflow?: ViewStyle["overflow"];
    safe?: boolean;
    scroll?: boolean;
    shadow?: {
        color?: ViewStyle["shadowColor"],
        offset?: ViewStyle["shadowOffset"],
        opacity?: ViewStyle["shadowOpacity"],
        radius?: ViewStyle["shadowRadius"]
    },
    children?: React.ReactNode;
}

// add this type to the component props
// const Block = ({ ...}: IBlock) => {
//     const blockStyle = StyleSheet.flatten([
//         // ...
//     ]) as ViewStyle;
//     // the rest of the code
// }



export default AppBlock;