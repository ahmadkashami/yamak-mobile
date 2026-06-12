import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FC, useContext, useEffect, useState } from "react";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { StackNavigationProp } from "@react-navigation/stack";

import { auth } from "../../firebase/firebase.config";
import LoadingLoatie from "../ui/LoadingLootie";
import ErrorMessage from "../ui/ErrorMessage";
import FillledButton from "../ui/FillledButton";
import { AuthContext } from "../../store/auth-context";
import KeyBordAvoidingWraper from "../ui/KeyBordAvoidingWraper";
import { useTranslation } from "react-i18next";
import { login } from "../../apis/Auth.api";
import { AppColors } from "../../constants/Colors";

const CodeAuthModel: FC<any> = ({
  verificationId,
  isOpened,
  phone,
  closeModelHandler,
}) => {
  const [verfyCode, setVerfyCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const naviagation = useNavigation<StackNavigationProp<any>>();
  const { authenticate, token } = useContext(AuthContext);
  const { t } = useTranslation();

  async function handleVerfication() {
    if (!verfyCode) {
      setErrorMessage("invalid inputs ...");
      return null;
    }
    try {
      setIsLoading(true);
      const credintal = PhoneAuthProvider.credential(verificationId, verfyCode);
      const response = await signInWithCredential(auth, credintal);
      const res = JSON.parse(JSON.stringify(response));
      const { idToken, isNewUser } = res._tokenResponse;
      closeModelHandler();
      // setIsCodeModelOpen(false);
      setIsLoading(false);

      if (isNewUser) {
        naviagation.replace("FormAuthScreen", {
          phone,
          token: idToken,
        });
      } else {
        // const { data: user, access_token } = await login(phone);

        // access_token && authenticate(access_token);
        console.log({ idToken });

        idToken && authenticate(idToken);
      }
    } catch (error) {
      //@ts-ignore
      Alert.alert(error.message);
      if (error.name === "FirebaseError") setErrorMessage("Wrong Code ...");
    }
    setIsLoading(false);
  }
  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  }, [errorMessage]);
  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   style={[styles.modelContainer]}
    // >
    <KeyBordAvoidingWraper>
      <Modal transparent={true} animationType="fade" visible={isOpened}>
        <View style={[styles.modelContainer]}>
          <View
            style={{
              width: "80%",
              height: 300,
              backgroundColor: "white",
              borderRadius: 20,
              padding: 16,
              borderWidth: 1,
            }}
          >
            {isLoading && (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LoadingLoatie />
              </View>
            )}
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  color: "tomato",
                  padding: 10,
                }}
              >
                {t("SmsCode")}
              </Text>
              <Pressable
                onPress={() => {
                  closeModelHandler();

                  // setIsCodeModelOpen(false);
                }}
                style={{ position: "absolute", right: 2, top: 2 }}
              >
                <Ionicons name="md-close" color={"black"} size={30} />
              </Pressable>
            </View>
            <View
              style={{
                padding: 30,
                flex: 1,
              }}
            >
              <View style={{ marginTop: 20 }}>
                <TextInput
                  maxLength={6}
                  onChangeText={(text) => {
                    setVerfyCode(text);
                  }}
                  style={{
                    backgroundColor: AppColors.offGray,
                    borderWidth: 1,
                    height: 60,
                    borderRadius: 10,
                    padding: 10,
                    textAlign: "center",
                    letterSpacing: 4,
                    fontSize: 35,
                  }}
                />
              </View>
              {errorMessage && (
                <View>
                  <ErrorMessage
                    style={{ backgroundColor: "transparent" }}
                    message={errorMessage}
                  />
                </View>
              )}
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                paddingHorizontal: 40,
              }}
            >
              <FillledButton
                onPress={() => {
                  handleVerfication();
                }}
              >
                {t("Verfiy")}
              </FillledButton>
            </View>
          </View>
        </View>
      </Modal>
    </KeyBordAvoidingWraper>
  );
};

export default CodeAuthModel;

const styles = StyleSheet.create({
  modelContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  resendButton: {
    paddingVertical: 6,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
});
