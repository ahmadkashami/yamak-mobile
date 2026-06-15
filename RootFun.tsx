import { NavigationContainer } from "@react-navigation/native";
import { useEffect, } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { changeIcon, } from 'react-native-change-icon';

import AuthedReadyApp from "./src/helpers/AuthedReadyApp";
import AuthStackNavigator from "./src/navigations/AuthStackNavigator";
import { useAppReadyStore } from "./src/store/appReady.store";
import { useAuthenticationStoreAsync } from "./src/store/auth.store";
import { getStorageValues, setStorageValues } from "./src/helpers/AppAsyncStoreage";
import { AsyncStorageConstants, isIos } from "./src/constants/CommonConsstats";
import { getAppSetting } from "./src/apis/common.api";
import { useAppReady } from "./src/hooks/useAppReady";
import useNotification from "./src/notification/useNotification";
import { updateUserPushToken } from "./src/apis/users.api";




export function RootFun() {
    const setIsFirstLunch = useAppReadyStore((state) => state.setIsFirstLunch)
    const setAppSetting = useAppReadyStore((state) => state.setAppSetting)
    const token = useAuthenticationStoreAsync((state) => state.token)
    const { appIsReady } = useAppReady()
    const { checkApplicationNotificationPermission } = useNotification()

    useEffect(() => {
        getStorageItem();
        callAppApis();
        setAppIconImage()
    }, [])

    useEffect(() => {
        if (token) {
            registerPushToken();
        }
    }, [token])

    async function registerPushToken() {
        try {
            await checkApplicationNotificationPermission();
            const stored = await getStorageValues(AsyncStorageConstants.fcmToken);
            if (stored) {
                const fcmToken = JSON.parse(stored);
                await updateUserPushToken(fcmToken);
                console.log('Push token registered with backend');
            }
        } catch (error) {
            console.log('Push token registration error:', error);
        }
    }

    const setAppIconImage = async () => {
        try {
            if (isIos)
                changeIcon("Ramadan_AppIcon")
        } catch (error) {
            console.log("error setting icon", error)

        }
    }

    //check first lunch app view onboarding
    const getStorageItem = async () => {
        try {
            const key = await getStorageValues(AsyncStorageConstants.isLunched);
            if (!key) {
                setIsFirstLunch(true);
                await setStorageValues(AsyncStorageConstants.isLunched, "true");
            }
        } catch (error) {
            console.error("Error in getStorageItem:", error);
        }
    };

    async function callAppApis() {
        const response = await getAppSetting()
        setAppSetting(response)
    }
    if (!appIsReady) {
        return null;
    }
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider >
                <Navigation token={token} />
            </BottomSheetModalProvider>
        </GestureHandlerRootView >

    );
}



export function Navigation() {
    const token = useAuthenticationStoreAsync((state) => state.token)
    return (
        <NavigationContainer>
            {token ? <AuthedReadyApp /> : <AuthStackNavigator />}
        </NavigationContainer>
    );
}



//notifications



