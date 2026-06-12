import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { AppColors } from "../../constants/Colors";

export interface Props {
  isModelOpen: boolean;
  children: React.ReactNode;
}

const AppModel: FC<Props> = ({ isModelOpen, children }) => {
  return (
    <Modal visible={isModelOpen} animationType={"fade"} transparent={true}>
      <View style={styles.container}>
        <View style={styles.modelWrapper}>{children}</View>
      </View>
    </Modal>
  );
};

export default AppModel;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  modelWrapper: {
    alignSelf: "center",
    height: 250,
    width: 250,
    borderRadius: 20,
    backgroundColor: AppColors.white,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 1,
    shadowOpacity: 1,
  },
});
