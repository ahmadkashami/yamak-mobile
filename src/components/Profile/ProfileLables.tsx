import { StyleSheet, Text, View, Pressable, I18nManager, Image } from "react-native";
import React from "react";

import { AppSizes } from "../../constants/Sizes";
import { AppFonts } from "../../constants/fonts";
import AppIcon from "../ui/appIcon";
import { AppColorsTheme2 } from "../../constants/Colors";

interface props {
  type?: "Ionicons" | "AntDesign" | "MaterialIcons" | "Entypo" | "FontAwesome" | "Fontisto" | "MaterialCommunityIcons",
  iconName: string;
  iconColor?: string;
  text: string;
  size?: number,
  color?: string,
  imageSource?: any,
  iconType?: "icon" | "image",
  onPress: () => void
}

const ProfileLables = ({
  iconType = "icon",
  imageSource,
  iconName,
  iconColor = "black",
  text,
  size = 20,
  color = "white",
  type = "MaterialIcons",
  onPress,
}: props) => {

  const buttonIcon = iconType == "icon" ? (<AppIcon name={iconName} size={size} color={color} type={type} />
  ) : (<Image style={{ width: 35, height: 35 }} resizeMode='contain' source={imageSource} />)

  return (<Pressable
    onPress={onPress}
    style={({ pressed }) => {
      return [styles.labelContainer, pressed && styles.pressed];
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
      <View
        style={{
          width: 40,
          backgroundColor: iconColor,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderRadius: 20,
          marginRight: 20,
        }}
      >
        {buttonIcon}
      </View>
      <Text style={{ fontSize: AppSizes.medium, color: AppColorsTheme2.black, fontFamily: AppFonts.Roboto_Med }}>{text}</Text>
    </View>
    <AppIcon
      type="FontAwesome5"
      name={I18nManager.isRTL ? "chevron-left" : "chevron-right"}
      size={20}
      color="black"
    />
  </Pressable>
  );
};

export default ProfileLables;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.6,
  },
  labelContainer: {
    width: "100%",
    minHeight: 80,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
  },
});
