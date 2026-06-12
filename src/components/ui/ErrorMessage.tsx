import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";

const ErrorMessage: FC<any> = ({ message, style }) => {
  return <Text style={[styles.text, style]}>{message}</Text>;
};

export default ErrorMessage;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    minWidth: 200,
    fontSize: 18,
    color: "red",
    backgroundColor: "gray",
    borderRadius: 20,
    opacity: 0.4,
    overflow: "hidden",
    padding: 10,
  },
});
