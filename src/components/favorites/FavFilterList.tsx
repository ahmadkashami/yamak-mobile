import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { FC, useMemo, useState } from "react";
import { Services } from "../../constants/data";
import FilterItem from "./FilterItem";
const firstElement: Services = {
  id: 0,
  name: {
    ar: "الكل",
    en: "all",
  },
};
const FavFilterList = ({
  data,
  activeId,
  setActiveId,
}: {
  data: Services[];
  activeId: number;
  setActiveId: (id: number) => void;
}) => {
  const listData = useMemo(() => {
    const exitFitstElement = data.find((item) => item.id === 0);
    return !exitFitstElement ? [firstElement, ...data] : data;
  }, [data]);

  return (
    <View style={{ paddingVertical: 5 }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={listData}
        renderItem={({ item }) => {
          return (
            <FilterItem
              item={item}
              activeId={activeId}
              setActiveId={setActiveId}
            />
          );
        }}
      />
    </View>
  );
};

export default FavFilterList;

const styles = StyleSheet.create({});
