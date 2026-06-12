import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Image } from 'react-native'
import { AppColorsTheme2 } from '../../constants/Colors';
import { AppFonts } from '../../constants/fonts';
import { AppSizes } from '../../constants/Sizes';
import { useAuthenticationStoreAsync } from '../../store/auth.store';
import AppSearch from './Search';

const Welcome = () => {
  const { t } = useTranslation();
  const user = useAuthenticationStoreAsync((state) => state.user)
  return (
    <View style={{ paddingHorizontal: 30, marginTop: 10 }}>
      <View style={{ flexDirection: "row" }} >
        <View style={{ flex: 1 }}>
          <Text style={styles.text1}>{t("Hello")} {user ? user.name : t("User")} </Text>
          {/* <Text numberOfLines={2} style={styles.text2}>{t("WelcomeLabel")} </Text> */}
        </View>
        {/* <View style={styles.imageContainer}>
          <Image source={require("../../assets/images/appLogo.png")} resizeMode={"cover"} style={styles.image} />
        </View> */}

      </View>
      {/* <View style={styles.sectionContainer}>
        <AppSearch />
      </View> */}
    </View>
  )
}

export const styles = StyleSheet.create({
  text1: {
    fontFamily: AppFonts.Roboto_Med,
    fontSize: 20,
    color: AppColorsTheme2.black,
    textAlign: "left"
  },
  text2: {
    fontFamily: AppFonts.Roboto_Med,
    fontSize: AppSizes.large,
    maxWidth: 220,
    width: 300,
    marginVertical: 10,
    color: AppColorsTheme2.primary,
    textAlign: "left"
  },
  sectionContainer: {
    marginVertical: 20
  },
  image: {
    height: 60,
    width: 60,
    resizeMode: "contain"

  },
  imageContainer: {
    height: 45,
    width: 45,
    borderRadius: 22.5,
    // borderWidth: 3,
    // backgroundColor: AppColorsTheme2.secondary,
    // borderColor: AppColorsTheme2.primary,
    justifyContent: "center",
    alignItems: "center"
  }
});



export default Welcome