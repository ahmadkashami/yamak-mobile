/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import {
  getMessaging,
  setOpenSettingsForNotificationsHandler,
} from '@react-native-firebase/messaging';

setOpenSettingsForNotificationsHandler(getMessaging(), async () => {});

AppRegistry.registerComponent(appName, () => App);
