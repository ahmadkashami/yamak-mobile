import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";

import { AppColors } from "../../constants/Colors";
import { Location } from "../../interfaces/map.interface";
import {
  useFavouriteStore,
  useFavouriteStoreAsync,
} from "../../store/Favorites.store";
import AppIcon from "../ui/appIcon";

const FavCard = ({ item, isOdd }: { item: Location; isOdd: boolean }) => {
  const { t } = useTranslation();
  // const { favorites, removeFromFavorites } = useFavouriteStore(
  //   (state) => ({
  //     favorites: state.favorites,
  //     removeFromFavorites: state.removeFromFavorites,
  //   }),
  //   shallow
  // );
  const { removeFromFavorites } = useFavouriteStoreAsync((state) => ({
    removeFromFavorites: state.removeFromFavorites,
  }));

  return (
    <View
      style={[
        styles.container,
        isOdd && { backgroundColor: AppColors.primary },
      ]}
    >
      <View style={styles.leftContainer}>
        <Image
          source={require("../../assets/images/profile2.png")}
          style={{
            width: 70,
            height: 70,
            resizeMode: "contain",
            borderWidth: 1,
            borderRadius: 35,
          }}
        />
      </View>
      <View style={{ padding: 16 }}>
        <Text style={styles.text}>
          {t("Name")} :{item.name}
        </Text>
        <Text style={styles.text}>
          {t("Location")} :{item.name}
          {item.address}
        </Text>
        <Text style={styles.text}>
          {" "}
          {t("Phone")} : {item.phone}
        </Text>
      </View>

      <Pressable
        onPress={() => {
          console.log("pressed");

          removeFromFavorites(item.id);
        }}
        style={{ position: "absolute", top: 5, right: 8 }}
      >
        <AppIcon name="close-sharp" size={28} color="black" />
      </Pressable>
    </View>
  );
};

export default FavCard;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 140,
    borderRadius: 20,
    padding: 10,
    flexDirection: "row",
    borderWidth: 2,
    marginVertical: 15,
    borderColor: AppColors.secondary,
  },
  leftContainer: {
    borderRightWidth: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { marginVertical: 4, textAlign: "left" },
});
