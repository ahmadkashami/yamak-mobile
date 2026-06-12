import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";

import TruckDto from "../../dtos/Truck.Dto";
import FavCard from "./FavCard";

interface FavoritesList {
  Fovaties: TruckDto[];
}
const FavoriteList: FC<FavoritesList> = ({ Fovaties }) => {
  if (Fovaties.length === 0)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontWeight: "500" }}>No Favorites Yet</Text>
      </View>
    );
  return (
    <FlatList
      contentContainerStyle={{
        justifyContent: "center",
      }}
      data={Fovaties}
      renderItem={({ item, index }) => (
        <View style={styles.ItemConaienr}>
          <FavCard item={item} isOdd={index % 2 === 0} />
        </View>
      )}
    />
  );
};

export default FavoriteList;

const styles = StyleSheet.create({
  ItemConaienr: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
});
