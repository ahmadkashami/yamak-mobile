import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";

import { AppColors } from "../constants/Colors";
import FillledButton from "../components/ui/FillledButton";
import { AuthContext } from "../store/auth-context";
import { updateEmail, updateProfile, User } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { register } from "../apis/Auth.api";

const FormAuthScreen = ({ route }: any) => {
  const [inputs, setInputs] = useState({ name: "", email: "" });
  const { authenticate } = useContext(AuthContext);
  const { phone, token } = route.params;

  // const { data, isLoading, error, isError, refetch } = useQuery(
  //   "LoginUser",
  //   () => register(inputs.name, inputs.email, phone),
  //   { enabled: false }
  // );

  const user = auth.currentUser;
  function inputChangeHandler(text: string, name: string) {
    setInputs((prev) => ({ ...prev, [`${name}`]: text }));
  }

  async function submitPressHandler() {
    if (!inputs.email || !inputs.name) {
      Alert.alert("invalid inputs", "please enter all fields required");
      return null;
    }
    await updateProfile(user as User, { displayName: inputs.name }).then(
      async (res) => {
        await updateEmail(user as User, inputs.email);
        try {
          const { data: user, access_token } = await register(
            inputs.name,
            inputs.email,
            phone
          );
          access_token && authenticate(access_token);
        } catch (error) {
          console.log(error);

          Alert.alert(error.message);
        }
      }
    );
  }
  return (
    <ImageBackground
      source={require("../constants/images/formBg.jpeg")}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 40,
          padding: 10,
        }}
      >
        <Text style={styles.lable}>please enter your info</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
          // backgroundColor: "red",
        }}
      >
        <KeyboardAvoidingView style={{}}>
          <View
            style={{
              // shadowOpacity: 10,

              width: 400,
              height: 300,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: 20,
            }}
          >
            <View
              style={{
                flex: 3,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  marginBottom: 10,
                  color: AppColors.black,
                  fontWeight: "bold",
                }}
              >
                Name
              </Text>

              <View
                style={{
                  width: "80%",
                  height: 50,
                  borderWidth: 1,
                  marginBottom: 30,
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: "white",
                }}
              >
                <TextInput
                  autoCorrect={false}
                  onChangeText={(text) => {
                    inputChangeHandler(text, "name");
                  }}
                  style={{ width: "100%", height: "100%" }}
                  placeholder="enter name"
                />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  marginBottom: 10,
                  color: AppColors.black,
                  fontWeight: "bold",
                }}
              >
                Email
              </Text>
              <View
                style={{
                  width: "80%",
                  height: 50,
                  borderWidth: 1,
                  marginBottom: 10,
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: AppColors.white,
                }}
              >
                <TextInput
                  autoCorrect={false}
                  onChangeText={(text) => {
                    inputChangeHandler(text, "email");
                  }}
                  style={{ width: "100%", height: "100%" }}
                  placeholder="enter email"
                />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FillledButton
                onPress={submitPressHandler}
                style={{ width: 200 }}
              >
                submit
              </FillledButton>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
};

export default FormAuthScreen;

const styles = StyleSheet.create({
  lable: {
    textTransform: "capitalize",
    overflow: "hidden",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",

    color: AppColors.secondary,
    borderWidth: 3,
    padding: 20,
    borderColor: AppColors.secondary,

    letterSpacing: 2,
  },
});
