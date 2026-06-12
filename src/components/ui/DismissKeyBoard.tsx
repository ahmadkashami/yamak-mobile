import { Keyboard, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const DismissKeyBoard = ({ children }: { children: React.ReactNode }) => {
  return (
    <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
      {children}
    </Pressable>
  );
};

export default DismissKeyBoard;

const styles = StyleSheet.create({});
