import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { AppColors, AppColorsTheme2 } from "../../constants/Colors";
import LottieAnimation from "../ui/LottieAnimation";
import { ScreenNames } from "../../constants/ScreenNames";
import AppText from "../ui/AppText";

const NoFavorites = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  return (
    <View
      style={styles.container}
    >
      <View style={{ alignSelf: "center" }}>
        <LottieAnimation
          file={require("../../constants/lootiesFiles/favorites-bg.json")}
        />
      </View>

      <AppText textStyle={styles.textTitle}>
        {t("LooksLikeYouDon'tHaveAnyFavoritesYet")}
      </AppText>
      <AppText
        nlines={2}
        textStyle={styles.textBody}
      >
        {t("BrowseOurMap")}
      </AppText>
      <Pressable
        onPress={() => navigation.navigate(ScreenNames.Map_Screen)}
        style={({ pressed }) => [
          styles.buttonContainer,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.textButton}>{t("BrowseMap")}</Text>
      </Pressable>
    </View>
  );
};

export default NoFavorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: AppColorsTheme2.offWhite
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
  textButton: { color: AppColors.white, fontWeight: "bold", fontSize: 18 },
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
