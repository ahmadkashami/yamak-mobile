

import { PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native'
import {
  getMessaging,
  getToken,
  isDeviceRegisteredForRemoteMessages,
  registerDeviceForRemoteMessages,
  subscribeToTopic,
  onMessage,
  setBackgroundMessageHandler,
  onNotificationOpenedApp,
  getInitialNotification,
  requestPermission,
  AuthorizationStatus,
} from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";

import React, { useCallback, useState } from 'react'
import { getStorageValues, setStorageValues } from '../helpers/AppAsyncStoreage';
import { AsyncStorageConstants } from '../constants/CommonConsstats';

const useNotification = () => {
    const [fcmToken, setFcmToken] = useState("")


    const getFcmToken = async () => {
        let token = null;
        await registerAppWithFCM();
        try {
            let storedToken = await getStorageValues(AsyncStorageConstants.fcmToken)
            if (storedToken) {
                setFcmToken(JSON.parse(storedToken))
                return
            }
            token = await getToken(getMessaging());
            if (token) {
                console.log('getFcmToken-->', token);
                await setStorageValues(AsyncStorageConstants.fcmToken, JSON.stringify(token))
                setFcmToken(token)
            }

        } catch (error) {
            console.log('getFcmToken Device Token error ', error);
        }
        return token;
    };





    async function registerAppWithFCM() {
        const messaging = getMessaging();
        console.log(
            'registerAppWithFCM status',
            isDeviceRegisteredForRemoteMessages(messaging),
        );
        if (!isDeviceRegisteredForRemoteMessages(messaging)) {
            await registerDeviceForRemoteMessages(messaging)
                .then(status => {
                    console.log('registerDeviceForRemoteMessages status', status);
                })
                .catch(error => {
                    console.log('registerDeviceForRemoteMessages error ', error);
                });
        }
    }
    const subscribeTopic = useCallback((topic: string) => {
        subscribeToTopic(getMessaging(), topic)
            .then(() => console.log("Subscribed to topic:", topic))
            .catch((e) => {
                console.log(e);
            });
    }, [])
    const listenToForegroundNotifications = async () => {
        const unsubscribe = onMessage(getMessaging(), async remoteMessage => {

            PushNotification.localNotification({
                title: remoteMessage?.notification?.title,
                message: remoteMessage?.notification?.body,
                contentAvailable: true,
                date: new Date(Date.now() + 1 * 1000), // in 1 secs
                allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
                channelId: 'checkNotification',
                soundName: "default",
            });
            console.log(
                'A new message arrived! (FOREGROUND)',
                JSON.stringify(remoteMessage),
            );
        });
        return unsubscribe;
    }

    const listenToBackgroundNotifications = async () => {
        setBackgroundMessageHandler(
            getMessaging(),
            async remoteMessage => {
                console.log(
                    'A new message arrived! (BACKGROUND)',
                    JSON.stringify(remoteMessage),
                );
            },
        );
    }

    const onNotificationOpenedAppFromBackground = async () => {
        const unsubscribe = onNotificationOpenedApp(
            getMessaging(),
            async remoteMessage => {
                console.log(
                    'App opened from BACKGROUND by tapping notification:',
                    JSON.stringify(remoteMessage),
                );
            },
        );
        return unsubscribe;
    };

    const onNotificationOpenedAppFromQuit = async () => {
        const message = await getInitialNotification(getMessaging());

        if (message) {
            console.log('App opened from QUIT by tapping notification:', JSON.stringify(message));
        }
    };

    const checkApplicationNotificationPermission = async () => {
        if (Platform.OS === 'ios') {
            //Request iOS permission
            const authStatus = await requestPermission(getMessaging(), {
                sound: true,
                carPlay: true,
                announcement: true,
            });
            const enabled =
                authStatus === AuthorizationStatus.AUTHORIZED ||
                authStatus === AuthorizationStatus.PROVISIONAL;
            if (enabled) {
                getFcmToken()
                console.log('Authorization status:', authStatus);
            }
        } else if (Platform.OS === 'android') {
            //Request Android permission (For API level 33+, for 32 or below is not required)
            const res = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            );
            if (res === "granted") {
                getFcmToken()
                console.log({ res });
            }
        }

    };



    return {
        fcmToken,
        getFcmToken,
        checkApplicationNotificationPermission,
        listenToForegroundNotifications,
        listenToBackgroundNotifications,
        onNotificationOpenedAppFromBackground,
        onNotificationOpenedAppFromQuit,
        subscribeTopic
    }
}

export default useNotification

const styles = StyleSheet.create({})