import {
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import React, { Children } from "react";

const KeyBordAvoidingWraper = ({ children, style }: any) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={style}
    >
      <ScrollView style={{}}>
        <Pressable onPress={Keyboard.dismiss}>{children}</Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyBordAvoidingWraper;

const styles = StyleSheet.create({});
