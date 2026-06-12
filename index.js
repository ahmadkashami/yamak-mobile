/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging'

messaging().setOpenSettingsForNotificationsHandler(async () => {
    // Set persistent value, using the MMKV package just as an example of how you might do it
    MMKV.setBool(openSettingsForNotifications, true)
})


AppRegistry.registerComponent(appName, () => App);
