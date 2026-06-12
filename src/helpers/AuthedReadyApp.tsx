import { StyleSheet, } from 'react-native'
import React, { useEffect } from 'react'
import { useUserLocationStore } from '../store/userLocation.store';
import userCurrentLocation from '../hooks/userCurrentLocation';

import DrawerStackNavigator from '../navigations/drawerStackNavigator';
import { setStorageValues } from './AppAsyncStoreage';
import { AsyncStorageConstants, NotificationTopicConstants, isIos } from '../constants/CommonConsstats';
import useNotification from '../notification/useNotification';
import { updateUserProfile } from '../apis/users.api';
import { initFreshChat } from '../services/freshchat/freshchat.config';
import { initSentry } from '../services/sentry/sentry.config';


const AuthedReadyApp = () => {

    const { fcmToken, listenToBackgroundNotifications, subscribeTopic, listenToForegroundNotifications, onNotificationOpenedAppFromQuit, onNotificationOpenedAppFromBackground, checkApplicationNotificationPermission } = useNotification()

    //first render no dependences
    useEffect(() => {
        listenToNotifications();
        initFreshChat()
        initSentry()
    }, [])

    useEffect(() => {
        if (fcmToken) {
            updateUserProfile({ fcmToken: fcmToken })
        }

    }, [fcmToken]);

    const listenToNotifications = () => {
        try {
            checkApplicationNotificationPermission()
            subscribeTopic(NotificationTopicConstants.yamakAll)
            onNotificationOpenedAppFromQuit();
            listenToBackgroundNotifications();
            listenToForegroundNotifications();
            onNotificationOpenedAppFromBackground();
        } catch (error) {
            console.log(error);
        }
    };
    //userLocation
    const updateUserLocation = useUserLocationStore((state) => state?.updateUserLocation)
    const { currentLocation } = userCurrentLocation()
    useEffect(() => {
        if (currentLocation) {
            const location = { latitude: currentLocation?.latitude, longitude: currentLocation?.longitude }
            updateUserLocation(location)
            setStorageValues(AsyncStorageConstants.userLocation, JSON.stringify(location))
        }
    }, [currentLocation]);


    return (
        <DrawerStackNavigator />
    )
}

export default AuthedReadyApp

const styles = StyleSheet.create({})