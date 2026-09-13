# Project Context

## Project Name

Yamak Mobile (`yamak-mobile`)

## Project Purpose

Bare React Native mobile application for Yamak's customer-facing services, including authentication, vehicle and service requests, profiles, notifications, and support integrations.

## Tech Stack

- Mobile: React Native 0.87.1, React 19, TypeScript, native Android and iOS projects
- Android: Java, Gradle, Android Gradle Plugin 8.7.0, SDK 36, minimum SDK 24, Hermes
- iOS: Objective-C++, Xcode project and CocoaPods, minimum iOS 15.1
- State and data: Zustand, TanStack Query, Axios, Formik, Yup
- Navigation/UI: React Navigation, Reanimated, Gesture Handler, SVG, native maps, React Native `FlatList` carousel
- Services: React Native Firebase, Google Sign-In, Sentry, Freshchat, push notifications
- Tooling: npm, Jest, ESLint, Prettier, Metro, patch-package

## Project Structure

- `android/`: Android application, Gradle configuration, flavors, manifests, and native Java sources
- `ios/`: Xcode project, targets/schemes, plist files, CocoaPods configuration, and native app delegate
- `scripts/`: local command wrappers, including environment-aware Android launching
- `src/apis/`: API clients, endpoint paths, and Axios configuration
- `src/components/`: reusable UI components
- `src/config/`: application and authentication configuration
- `src/context/` and `src/store/`: shared state and context
- `src/firebase/`: Firebase JavaScript configuration
- `src/hooks/`: reusable application hooks
- `src/navigations/`: authentication, drawer, tab, home, and profile navigation stacks
- `src/screens/`: application screens, including authentication flows
- `src/services/`: Sentry and Freshchat integrations
- `src/translation/`: localization resources

## Main Modules

- Authentication and social sign-in
- User profiles
- Vehicles and user cars
- Service catalog and requests
- Navigation and localized UI
- Push notifications
- Customer support through Freshchat
- Error monitoring through Sentry

## API Structure

- API base URL is supplied by `API_URL` in environment files.
- `src/apis/axios.config.ts` configures the shared HTTP client.
- `src/apis/apisPath.ts` defines endpoint paths.
- Domain clients cover authentication, users, vehicles, user cars, services, common data, and requests.
- This repository is a mobile client and contains no server controllers or database routes.

## Database Structure

No local application database schema or server-side models are present. Persistent business data is accessed through the configured remote API; local state uses React Native storage and Zustand where applicable.

## Authentication & Authorization

- Authentication API calls are defined in `src/apis/Auth.api.ts`.
- Google Sign-In is configured in `src/config/auth.config.ts` using environment-provided client IDs.
- Apple authentication is provided through `@invertase/react-native-apple-authentication`.
- Firebase Authentication and Messaging are integrated through React Native Firebase.
- Authorization tokens and request behavior are handled by the API/Axios layer; preserve existing API contracts and environment values.

## External Services

- Firebase Authentication and Messaging
- Google Sign-In
- Apple Authentication
- Google Maps
- Sentry
- Freshchat
- Android/iOS push notification services
- Environment configuration through `react-native-config`

## Current Migration / Development Status

- React Native is at 0.87.1 in both `package.json` and the installed package; native build compatibility was not verified during the launcher fix.
- The Home advertising carousel uses the React Native core `FlatList`; the obsolete `react-native-snap-carousel` dependency and compatibility patch have been removed.
- Android has development, staging, and production product flavors.
- iOS has Yamak-Dev, Yamak-Stage, and Yamak targets/schemes.
- Android development and production have matching Firebase configuration files.
- iOS development and production have matching Firebase configuration files.
- Staging Firebase configuration is not present for either platform.

## Important Decisions

- Android namespace and native Java package remain `com.yamak` while installable application IDs are environment-specific.
- Android IDs: development `com.yamak.mobdev`, staging `com.yamak.mobstaging`, production `com.yamak.mobapp`.
- iOS IDs: development `com.yamak.mobdev`, staging `com.yamak.mobstage`, production `com.yamak.mobapp`.
- `scripts/run-android.js` supplies the selected flavor's application ID to React Native CLI because the CLI otherwise reads the production base ID from Gradle.
- Metro defaults to port 8082 in the Android wrapper.

## Known Issues / Blockers

- No staging Firebase `google-services.json` or `GoogleService-Info.plist` is present; do not fabricate these files.
- The development and staging iOS Info.plists do not currently declare a Google Sign-In reversed-client-ID URL scheme. Production does.
- The 2026-08-31 development build reached the Arabic login screen through Metro on port 8082. Current RN 0.87.1 x86_64 builds are blocked by intermittent `clang++.exe` process launch denial in Reanimated; the earlier startup result does not validate the current build.
- Live Home carousel interaction remains unverified because the emulator has no authenticated session or supplied test credentials. The unrelated startup API rejection `Cannot read property 'data' of undefined` remains present.
- Existing Gradle deprecation and npm peer dependency warnings are outside the current identifier work.

## Setup Commands

```sh
npm install
npm start -- --port 8082
npm run android -- --mode developmentDebug --port 8082
npm run android:staging
npm run android:prod
npm run ios
npm test
npm run lint
```

For iOS native dependencies, run `pod install` from `ios/` on macOS before building in Xcode.

## Latest Changes

- Date: 2026-09-08
- Changed files: `PROJECT_CONTEXT.md`
- What changed: Reviewed the documented Windows Android startup workflow: start Metro on port 8082, then launch `developmentDebug` in a second terminal with an emulator or device connected.
- Why it changed: Clarified how to run the project locally.
- Risks or notes: No installation or build was performed. Further script and Gradle inspection was blocked by a shell process startup error; release signing and release build outputs remain unverified in this session.

- Date: 2026-08-31
- Changed files: `scripts/run-android.js`, `PROJECT_CONTEXT.md`
- What changed: Added environment-aware Android CLI application-ID selection and documented verified project context.
- Why it changed: React Native CLI launched the production application ID after building the development flavor, causing Android Error type 3.
- Risks or notes: Native package names, bundle IDs, Firebase files, manifests, and Gradle flavor definitions were not changed. The exact development command built, installed, and launched the corrected component.

- Date: 2026-08-31
- Changed files: `android/app/src/main/java/com/yamak/MainApplication.java`, `PROJECT_CONTEXT.md`
- What changed: Routed Android application startup through React Native 0.86's generated `ReactNativeApplicationEntryPoint`, which initializes SoLoader with `OpenSourceMergedSoMapping` and loads the configured architecture.
- Why it changed: New Architecture startup loaded `react_featureflagsjni`, which is merged into `libreactnative.so`, but the old SoLoader initialization searched for a nonexistent standalone library.
- Risks or notes: Android identifiers, Gradle flavors, dependencies, and iOS configuration were not changed. The feature-flags `UnsatisfiedLinkError` was resolved before the subsequent ReactHost startup correction.

- Date: 2026-08-31
- Changed files: `android/app/src/main/java/com/yamak/MainApplication.java`, `PROJECT_CONTEXT.md`
- What changed: Exposed the React Native 0.86 `ReactHost` derived from the existing `DefaultReactNativeHost` for bridgeless New Architecture startup.
- Why it changed: `ReactActivityDelegate` received a null `ReactHost`, so no React root view was created and `setContentView` attempted to add a null child.
- Risks or notes: MainActivity, splash-screen behavior, identifiers, flavors, Firebase, dependencies, and iOS configuration were not changed. `developmentDebug` built and installed successfully; MainApplication and MainActivity remained alive and resumed with no recurrence of either startup crash. A later verification confirmed the login screen renders after the cold Metro bundle completes.

- Date: 2026-08-31
- Changed files: `src/components/ui/carousel-snap/CarouselCards.tsx`, `jest.setup.js`, `package.json`, `package-lock.json`, `patches/react-native-snap-carousel+1.6.1.patch` (removed), `PROJECT_CONTEXT.md`
- What changed: Replaced the obsolete patched carousel with a React Native core horizontal `FlatList`, preserving card sizing, centered presentation, snapping, autoplay timing, wrap-to-first behavior, and RTL-aware scrolling. Removed the obsolete Jest mock and direct carousel, type, and temporary `prop-types` dependencies.
- Why it changed: Installed `react-native-snap-carousel` 1.6.1 uses legacy React APIs and an older `items`/renderer contract that does not match the application's `data` usage or React 19/New Architecture runtime.
- Risks or notes: No replacement dependency was added. Android `developmentDebug` built and installed successfully, Metro served the bundle on port 8082, and the login screen rendered with a live process and no carousel/React fatal error. Home carousel gestures and autoplay could not be observed without an authenticated session.

- Date: 2026-09-08
- Changed files: `scripts/run-android.js`, `PROJECT_CONTEXT.md`
- What changed: Resolve React Native's exported `package.json` and use its declared CLI binary path. Corrected the documented React Native version to the verified 0.87.1.
- Why it changed: Directly resolving `react-native/cli.js` fails with `ERR_PACKAGE_PATH_NOT_EXPORTED` in the installed version.
- Risks or notes: Node syntax checking and the development command with `--help` passed. Flavor application IDs and Metro port handling are preserved. No Android build was run.

- Date: 2026-09-08
- Changed files: `PROJECT_CONTEXT.md` (diagnostic results only)
- What changed: Inspected Reanimated x86_64 generated Ninja rules and tested the NDK compiler directly. `clang++.exe --version` passed. A targeted `ninja -j 1 reanimated` retry compiled eight objects, including the originally failing AnimatedSensorModule, then failed to launch the compiler for UpdatesRegistry.cpp with `CreateProcess: Access is denied`.
- Why it changed: Investigated the reported development build failure without changing dependency or build configuration.
- Risks or notes: Single-job compilation does not eliminate the denial. Recent Code Integrity/Defender event queries returned no block identifying this failure; the responsible mechanism remains unknown. A process trace around the denied launch is the next diagnostic step. No APK was built or installed.

- Date: 2026-09-08
- Changed files: `PROJECT_CONTEXT.md` (capture analysis only)
- What changed: Inspected user-provided `procmon-build.csv`. At 11:08:01, clang PID 8568 loaded its executable and ntdll.dll, then exited with -1073741790 (0xC0000022, access denied); Ninja PID 14312 exited with status 1 immediately afterward. Other compiler processes exited successfully. No ACCESS DENIED Result rows appear; the denial is in the process exit Detail.
- Why it changed: Correlated the reproduced native build failure with Process Monitor evidence.
- Risks or notes: Code Integrity, AppLocker EXE/DLL, Defender, and Application log queries around the failure returned no events. The CSV lacks call stacks; the cause remains unproven. Preserve the original capture as PML with all events for further analysis. No dependency or build configuration changes were made.
