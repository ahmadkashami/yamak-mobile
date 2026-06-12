import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface props {
    type?: "Ionicons" | "AntDesign" | "MaterialIcons" | "Entypo" | "FontAwesome" | "Fontisto" | "MaterialCommunityIcons" | "FontAwesome5",
    name?: string, size?: number, color?: string, onPress: () => void,
    style?: ViewStyle
}


const PressbleAppIcon = ({ size = 25, color = "black", name = "home", type = "Ionicons", onPress, style }: props) => {
    let iconType = iconTypeEnum[type](name, size, color)
    return (
        <Pressable style={style} onPress={onPress}>
            {iconType}
        </Pressable>
    )
}

export default PressbleAppIcon

export const iconTypeEnum = {
    AntDesign: (name: string, size: number, color: string) => <AntDesign name={name} size={size} color={color} />,
    Ionicons: (name: string, size: number, color: String) => <Ionicons name={name} size={size} color={color} />,
    MaterialIcons: (name: string, size: number, color: string) => <MaterialIcons name={name} size={size} color={color} />,
    Entypo: (name: string, size: number, color: string) => <Entypo name={name} size={size} color={color} />,
    FontAwesome: (name: string, size: number, color: string) => <FontAwesome name={name} size={size} color={color} />,
    Fontisto: (name: string, size: number, color: string) => <Fontisto name={name} size={size} color={color} />,
    MaterialCommunityIcons: (name: string, size: number, color: string) => <MaterialCommunityIcons name={name} size={size} color={color} />,
    FontAwesome5: (name: string, size: number, color: string) => <MaterialCommunityIcons name={name} size={size} color={color} />,


}
const styles = StyleSheet.create({})