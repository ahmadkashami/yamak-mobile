import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'

const AppPressable = ({ children, style, onPress }: { children?: React.ReactNode, style?: ViewStyle, onPress?: () => void }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [style, pressed && styles.pressed]} >
            {children}
        </Pressable>
    )
}

export default AppPressable

const styles = StyleSheet.create({
    pressed: { opacity: 0.7 }
})