import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Services } from "../../constants/data";
import i18next from "i18next";
import { AppColors } from "../../constants/Colors";

const FilterItem = ({
  item,
  activeId,
  setActiveId,
}: {
  item: Services;
  activeId: number;
  setActiveId: (id: number) => void;
}) => {
  let currnetLang = i18next.language;
  if (currnetLang !== ("ar" || "en")) {
    currnetLang = "en";
  }
  return (
    <Pressable
      onPress={setActiveId.bind(this, item.id)}
      style={[
        styles.container,
        activeId === item.id && { backgroundColor: AppColors.secondary },
      ]}
    >
      <Text
        style={[
          styles.text,
          activeId === item.id && { color: AppColors.white },
        ]}
      >
        {item.name[`${currnetLang}`]}
      </Text>
    </Pressable>
  );
};

export default FilterItem;

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    borderWidth: 4,
    padding: 4,
    borderRadius: 10,
    minWidth: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: AppColors.primary,
  },
  text: {
    textTransform: "capitalize",
    fontSize: 18,
    fontWeight: "300",
  },
});
