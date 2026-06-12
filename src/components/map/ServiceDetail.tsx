import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { AppColors, AppColorsTheme2 } from "../../constants/Colors";
import i18next from "i18next";
import { AppFonts } from "../../constants/fonts";
import { IServices } from "../../constants/data";
import { AppSizes } from "../../constants/Sizes";

const ServiceDetail = ({
  service,
  onPress,
  activeService,
}: {
  service: IServices;
  onPress: (id: string) => void;
  activeService: string;
}) => {

  let currnetLang = i18next.language;
  if (currnetLang !== ("ar" || "en")) {
    currnetLang = "en";
  }

  return (
    <Pressable
      onPress={() => {
        onPress(service._id);
      }}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor:
            activeService === service._id
              ? AppColorsTheme2.secondary
              : AppColors.white,
        },
        pressed && styles.pressed,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color:
              activeService === service._id ? AppColors.white : AppColors.black,
          },
        ]}
      >
        {service.name[`${currnetLang}`]}
      </Text>
    </Pressable>
  );
};

export default ServiceDetail;

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: AppColorsTheme2.primary,
    backgroundColor: AppColors.white,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    fontFamily: AppFonts.Roboto_Med,
    textTransform: "capitalize",
    fontSize: AppSizes.small,
    fontWeight: "700",
    textAlign: "center",
    color: "black",
  },
});
