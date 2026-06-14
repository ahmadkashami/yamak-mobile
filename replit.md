# Yamak Mobile

A React Native mobile application for Yamak — a vehicle/towing roadside assistance service supporting English and Arabic.

## Tech Stack
- **Framework**: React Native 0.86.0
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack, Drawer, Bottom Tabs)
- **State**: Zustand + React Query
- **Auth**: Firebase (Auth, Messaging)
- **Maps**: react-native-maps
- **Bundler**: Metro

## Running the Project

The Metro JS bundler runs via `yarn start`. Since this is a React Native app, it **cannot display in a browser preview** — it must be connected to a physical device or emulator via the Metro server.

### Connect a device
1. Start the workflow (`yarn start`) — Metro will be ready on port 5000
2. On your Android/iOS device run `yarn android` or `yarn ios` (requires Android Studio / Xcode)
3. Or scan the QR code shown in Metro output with Expo Go (if using Expo)

## API / Backend

| Environment | URL |
|---|---|
| **Production** | `https://yamak-kw.com/api/mobile/v1/` |
| **Dev / Staging** | `https://1a4fa7fa-aae9-463a-962c-91a64c55a7fd-00-3lcrqeg4xjn06.pike.replit.dev/api/mobile/v1/` |

The active backend URL is configured in `src/apis/axios.config.ts`. In dev mode, the in-app environment picker (Profile screen) lets you switch between prod, staging, and a custom IP.

## Project Structure
```
src/
  apis/          # Axios config + API call functions
  assets/        # Images, fonts, SVGs
  components/    # Reusable UI components
  constants/     # Colors, sizes, font names
  context/       # React Context providers
  hooks/         # Custom hooks (location, notifications)
  navigations/   # Navigator definitions
  screens/       # Screen components
  store/         # Zustand stores
  translation/   # i18next EN/AR files
```

## User Preferences
