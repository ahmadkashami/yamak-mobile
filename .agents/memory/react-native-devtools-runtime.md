---
name: React Native DevTools runtime
description: Replit’s Linux runtime needs desktop shared libraries for the React Native 0.86 DevTools launcher.
---

React Native 0.86 Metro can start successfully while its optional DevTools launcher fails if Linux desktop libraries are absent. In Replit, provide the required Nix runtime libraries through system dependencies rather than changing application code.

**Why:** The DevTools binary is a native desktop process, while Metro itself is JavaScript and does not need those libraries.

**How to apply:** If Metro logs a missing `.so` from `@react-native/debugger-shell`, install the matching Nix runtime dependency, restart the workflow, and verify the final log.