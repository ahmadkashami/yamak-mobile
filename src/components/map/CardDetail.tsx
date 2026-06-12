import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Linking from "expo-linking";
import shallow from "zustand/shallow";

import { FontAwesome5, Ionicons } from "@expo/vector-icons";

import { AppColors } from "../../constants/Colors";
import {
  useFavouriteStore,
  useFavouriteStoreAsync,
} from "../../store/Favorites.store";
import { useTranslation } from "react-i18next";

const CardDetail = ({ item, setSelectedCardId }: CardDetail) => {
  const { t } = useTranslation();
  const { favorites, addToFavotires, removeFromFavorites } =
    useFavouriteStoreAsync(
      (state) => ({
        favorites: state.favorites,
        addToFavotires: state.addToFavotires,
        removeFromFavorites: state.removeFromFavorites,
      }),
      shallow
    );
  const isFavorite = favorites.find((favId) => favId === item.id);
  function alerMessageHandler(
    title: string,
    message: string,
    buttonTitle: string,
    link: string
  ) {
    Alert.alert(title, message, [
      { text: "cancel", style: "destructive" },

      {
        text: buttonTitle,
        style: "default",
        onPress: () => {
          Linking.openURL(`${link}`);
        },
      },
    ]);
  }

  function contactIconsPressHandler(
    title: string,
    message: string,
    buttonTitle: string,
    link: string
  ) {
    alerMessageHandler(title, message, buttonTitle, link);
  }
  function favoritePressHandler() {
    if (isFavorite) {
      removeFromFavorites(item.id);
    } else {
      addToFavotires(item.id);
    }
  }
  return (
    <Pressable style={({ pressed }) => [styles.container]}>
      <View style={styles.rowDirection}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Pressable
            onPress={() => setSelectedCardId(null)}
            style={{ position: "absolute", top: -5, right: 0 }}
          >
            <Ionicons name="close-sharp" size={28} color="black" />
          </Pressable>
          <Pressable
            onPress={() => favoritePressHandler()}
            style={{ position: "absolute", top: -5, left: 4 }}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={28}
              color="red"
            />
          </Pressable>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.title}>{item.address}</Text>
          <View style={{ flexDirection: "row" }}>
            <Pressable
              onPress={() =>
                contactIconsPressHandler(
                  "Phone Call",
                  "Do you want to call this number ?",
                  "Call",
                  `tel:${item.phone}`
                )
              }
              style={({ pressed }) => [
                styles.phoneButton,
                pressed && styles.pressed,
              ]}
            >
              <FontAwesome5 name="phone-alt" size={20} color="black" />
              {/* <Text style={[styles.title]}>{item.phone}</Text> */}
            </Pressable>
            <Pressable
              onPress={() =>
                contactIconsPressHandler(
                  "Whatsapp Message",
                  "Do u want so send message via whatsapp",
                  "Message",
                  `https://wa.me/+965${item.phone}`
                )
              }
              style={({ pressed }) => [
                styles.phoneButton,
                pressed && styles.pressed,
              ]}
            >
              <FontAwesome5 name="whatsapp" size={24} color="green" />
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default CardDetail;

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 120,
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  rowDirection: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: { width: 40, height: 40, borderRadius: 20 },
  title: {
    fontWeight: "bold",
    marginLeft: 4,
    textAlign: "center",
    paddingVertical: 6,
  },
  pressed: { opacity: 0.7 },
  phoneButton: {
    marginRight: 8,
    backgroundColor: AppColors.gray,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  imageContainer: {
    borderRightWidth: 1,
    paddingHorizontal: 10,
    height: "80%",
    justifyContent: "center",
  },
});

export type CardDetail = {
  item: {
    id: number;
    name: string;
    image: string;
    lat: number;
    lon: number;
    phone: string;
    address: string;
  };
  setSelectedCardId: React.Dispatch<React.SetStateAction<number | null>>;
};
