import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import { AppColorsTheme2 } from "../../constants/Colors";
import AppText from "./AppText";
import LottieAnimation from "./LottieAnimation";

const NoContentFound = ({ title = "", message = "", buttonMessage = "", onPress }: { title: string, message: string, buttonMessage?: string, onPress?: () => void }) => {
  const { t } = useTranslation();
  return (
    <View
      style={styles.container}
    >
      <View style={{ alignSelf: "center" }}>
        <LottieAnimation
          file={require("../../constants/lootiesFiles/NoContetnLottie.json")}
        />
      </View>

      <AppText textStyle={styles.textTitle}>
        {t(title)}
      </AppText>
      <AppText
        nlines={2}
        textStyle={styles.textBody}
      >
        {t(message)}
      </AppText>
      {buttonMessage && <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.buttonContainer,
          pressed && styles.pressed,
        ]}
      >
        <AppText textStyle={styles.textButton}>{t(buttonMessage)}</AppText>
      </Pressable>}
    </View>
  );
};

export default NoContentFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: AppColorsTheme2.offWhite,
    alignSelf: "center"
  },
  buttonContainer: {
    alignSelf: "center",
    marginVertical: 30,
    width: 250,
    height: 50,
    backgroundColor: AppColorsTheme2.secondary,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: { color: AppColorsTheme2.white, fontWeight: "bold", fontSize: 18 },
  textTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  pressed: { opacity: 0.7 },
  textBody: {
    alignSelf: "center",
    fontSize: 16,
    textAlign: "center",
    width: "70%",
  }
});
