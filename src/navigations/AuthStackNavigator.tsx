import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { ScreenNames } from "../constants/ScreenNames";
import OtpVerificationScreen from "../screens/authScreens/otpVerificationScreen";
import AuthScreen from "../screens/authScreens/authScreen";
import LoginScreen from "../screens/authScreens/loginScreen";
import OtpEmailVerificationScreen from "../screens/authScreens/otpEmailVerificationScreen";
import OtpResetPasswordScreen from "../screens/authScreens/otpResetPasswordScreen";
import NewPasswordScreen from "../screens/authScreens/NewPasswordScreen";
import RegisterScreen from "../screens/authScreens/registerScreen";

const Stack = createStackNavigator();
const AuthStackNavigator = () => {
  return (

    <Stack.Navigator
      initialRouteName={ScreenNames.Login_Screen}
      // initialRouteName={ScreenNames.Email_OTP_Screen}

      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ScreenNames.Login_Screen} component={LoginScreen} />
      <Stack.Screen name={ScreenNames.Register_Screen} component={RegisterScreen} />

      <Stack.Screen name={ScreenNames.Auth_Screen} component={AuthScreen} />
      <Stack.Screen name={ScreenNames.Email_OTP_Screen} component={OtpEmailVerificationScreen} />
      <Stack.Screen name={ScreenNames.Reset_OTP_Screen} component={OtpResetPasswordScreen} />
      <Stack.Screen name={ScreenNames.NewPassword_Screen} component={NewPasswordScreen} />



      <Stack.Screen
        options={{ animationEnabled: false, }}
        name={ScreenNames.OTP_VERIFICATION_SCREEN}
        component={OtpVerificationScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;

const styles = StyleSheet.create({});
