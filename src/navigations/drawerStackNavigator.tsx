import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useLayoutEffect, useState } from "react";
import OnBoardingScreen from "../screens/OnBoardingScreen";
import { useAppReadyStore } from "../store/appReady.store";
import DrawerNavigator from "./DrawerNavigator";


const Stack = createStackNavigator();
const DrawerStackNavigator = () => {
    let isFirstLunch = useAppReadyStore((state) => state.isFirstLunch)

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {isFirstLunch && <Stack.Screen
                name="onboarding"
                component={OnBoardingScreen}
            />}


            <Stack.Screen
                name="drawer"
                component={DrawerNavigator}
            />
        </Stack.Navigator>
    );
};


export default DrawerStackNavigator