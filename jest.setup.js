require('react-native-gesture-handler/jestSetup');

jest.mock('@react-native-community/geolocation', () => ({
  getCurrentPosition: jest.fn(),
  requestAuthorization: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
  stopObserving: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-device-info', () => ({
  getBuildNumber: jest.fn(() => '1'),
  getVersion: jest.fn(() => '0.0.1'),
}));

jest.mock('react-native-config', () => ({
  NODE_ENV: 'test',
  SENTRY_DSN: '',
  FRESHCHAT_APPI_ID: '',
  FRESHCHAT_APP_KEY: '',
  IOS_CLIENT_ID: '',
  ANDROID_CLIENT_ID: '',
  WEB_CLIENT_ID: '',
}));

jest.mock('react-native-maps', () => {
  const React = require('react');
  const {View} = require('react-native');
  const MockMapView = React.forwardRef((props, ref) =>
    React.createElement(View, {...props, ref}),
  );
  const MockMarker = props => React.createElement(View, props);

  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
    PROVIDER_GOOGLE: 'google',
  };
});

jest.mock('@react-native-community/netinfo', () => ({
  __esModule: true,
  default: {
    addEventListener: jest.fn(() => jest.fn()),
    fetch: jest.fn(() =>
      Promise.resolve({isConnected: true, isInternetReachable: true}),
    ),
  },
  addEventListener: jest.fn(() => jest.fn()),
  fetch: jest.fn(() =>
    Promise.resolve({isConnected: true, isInternetReachable: true}),
  ),
}));

jest.mock('react-native-snap-carousel', () => {
  const React = require('react');
  const {View} = require('react-native');

  return function MockCarousel({data = [], renderItem}) {
    return React.createElement(
      View,
      null,
      data.map((item, index) =>
        React.createElement(
          View,
          {key: item?.id ?? item?._id ?? index},
          renderItem?.({item, index}),
        ),
      ),
    );
  };
});

jest.mock('@react-native-clipboard/clipboard', () => ({
  __esModule: true,
  default: {
    getString: jest.fn(() => Promise.resolve('')),
    setString: jest.fn(),
  },
  getString: jest.fn(() => Promise.resolve('')),
  setString: jest.fn(),
}));

jest.mock('react-native-freshchat-sdk', () => ({
  Freshchat: {
    init: jest.fn(),
    setUser: jest.fn((user, callback) => callback?.(null)),
    showConversations: jest.fn(),
  },
  FreshchatConfig: class FreshchatConfig {
    constructor(appId, appKey) {
      this.appId = appId;
      this.appKey = appKey;
    }
  },
  FreshchatUser: class FreshchatUser {},
  ConversationOptions: class ConversationOptions {},
}));

jest.mock('@react-native-firebase/messaging', () => {
  const messaging = jest.fn(() => ({
    isDeviceRegisteredForRemoteMessages: true,
    registerDeviceForRemoteMessages: jest.fn(() => Promise.resolve()),
    getToken: jest.fn(() => Promise.resolve('test-token')),
    subscribeToTopic: jest.fn(() => Promise.resolve()),
    onMessage: jest.fn(() => jest.fn()),
    setBackgroundMessageHandler: jest.fn(() => jest.fn()),
    onNotificationOpenedApp: jest.fn(() => jest.fn()),
    getInitialNotification: jest.fn(() => Promise.resolve(null)),
    requestPermission: jest.fn(() => Promise.resolve(1)),
    setOpenSettingsForNotificationsHandler: jest.fn(),
  }));

  messaging.AuthorizationStatus = {
    NOT_DETERMINED: -1,
    DENIED: 0,
    AUTHORIZED: 1,
    PROVISIONAL: 2,
  };

  return {
    __esModule: true,
    default: messaging,
  };
});

jest.mock('react-native-push-notification', () => ({
  __esModule: true,
  default: {
    configure: jest.fn(),
    createChannel: jest.fn((config, callback) => callback?.(true)),
    localNotification: jest.fn(),
    localNotificationSchedule: jest.fn(),
    cancelAllLocalNotifications: jest.fn(),
  },
  configure: jest.fn(),
  createChannel: jest.fn((config, callback) => callback?.(true)),
  localNotification: jest.fn(),
  localNotificationSchedule: jest.fn(),
  cancelAllLocalNotifications: jest.fn(),
}));

jest.mock('@invertase/react-native-apple-authentication', () => ({
  appleAuth: {
    Operation: {LOGIN: 'LOGIN'},
    Scope: {FULL_NAME: 'FULL_NAME', EMAIL: 'EMAIL'},
    State: {AUTHORIZED: 'AUTHORIZED'},
    performRequest: jest.fn(() =>
      Promise.resolve({user: 'test-user', identityToken: ''}),
    ),
    getCredentialStateForUser: jest.fn(() => Promise.resolve('AUTHORIZED')),
  },
}));

jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(() => Promise.resolve(true)),
    signIn: jest.fn(() => Promise.resolve({idToken: ''})),
    signOut: jest.fn(() => Promise.resolve()),
  },
  statusCodes: {},
}));

jest.mock('react-native-splash-screen', () => ({
  __esModule: true,
  default: {
    hide: jest.fn(),
    show: jest.fn(),
  },
  hide: jest.fn(),
  show: jest.fn(),
}));

jest.mock('react-native-change-icon', () => ({
  changeIcon: jest.fn(() => Promise.resolve()),
  getIcon: jest.fn(() => Promise.resolve('Default')),
}));

jest.mock('./src/apis/common.api', () => ({
  getAppSetting: jest.fn(() =>
    Promise.resolve({
      androidVersionCode: '0',
      androidRecommendedVersion: '0',
      iosVersion: '0',
      iosRecommendedVersion: '0',
    }),
  ),
  getAllAdds: jest.fn(() => Promise.resolve([])),
}));

jest.mock('react-native-worklets', () =>
  require('react-native-worklets/lib/module/mock'),
);

jest.mock('react-native-reanimated', () => {
  const reactNative = require('react-native');
  const createAnimatedComponent = component => component;
  const addWhitelistedNativeProps = jest.fn();
  const addWhitelistedUIProps = jest.fn();

  return {
    __esModule: true,
    default: {
      createAnimatedComponent,
      addWhitelistedNativeProps,
      addWhitelistedUIProps,
      View: reactNative.View,
      Text: reactNative.Text,
      Image: reactNative.Image,
      ScrollView: reactNative.ScrollView,
      FlatList: reactNative.FlatList,
    },
    createAnimatedComponent,
    addWhitelistedNativeProps,
    addWhitelistedUIProps,
    useSharedValue: jest.fn(initialValue => ({value: initialValue})),
    useAnimatedStyle: jest.fn(updater => updater?.() ?? {}),
    useAnimatedProps: jest.fn(updater => updater?.() ?? {}),
    useDerivedValue: jest.fn(updater => ({value: updater?.()})),
    useAnimatedReaction: jest.fn(),
    useAnimatedScrollHandler: jest.fn(handler => handler),
    useFrameCallback: jest.fn(),
    withTiming: jest.fn(toValue => toValue),
    withSpring: jest.fn(toValue => toValue),
    withDelay: jest.fn((delay, animation) => animation),
    withRepeat: jest.fn(animation => animation),
    withSequence: jest.fn((...animations) => animations[animations.length - 1]),
    cancelAnimation: jest.fn(),
    runOnJS: jest.fn(fn => fn),
    runOnUI: jest.fn(fn => fn),
    interpolate: jest.fn((value, input, output) => output?.[0] ?? value),
    interpolateColor: jest.fn((value, input, output) => output?.[0]),
    Extrapolate: {CLAMP: 'clamp', EXTEND: 'extend', IDENTITY: 'identity'},
    Easing: reactNative.Easing ?? {},
    setUpTests: jest.fn(),
    Layout: {},
    FadeIn: {},
    FadeOut: {},
    SlideInDown: {},
    SlideOutDown: {},
  };
});

global.__reanimatedWorkletInit = () => {};
