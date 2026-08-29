#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const androidDir = path.join(root, 'android');
const env = { ...process.env };
const isWindows = process.platform === 'win32';

function prependExisting(...entries) {
  const existing = entries.filter(Boolean).filter((entry) => fs.existsSync(entry));
  if (existing.length > 0) {
    env.PATH = [...existing, env.PATH || ''].filter(Boolean).join(path.delimiter);
  }
}

function findWindowsJdk17() {
  const bases = [
    path.join('C:', 'Program Files', 'Microsoft'),
    path.join('C:', 'Program Files', 'Java'),
    path.join('C:', 'Program Files', 'Eclipse Adoptium'),
  ];

  for (const base of bases) {
    if (!fs.existsSync(base)) continue;
    const match = fs
      .readdirSync(base, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => path.join(base, entry.name))
      .find((entry) => /(?:jdk|temurin).*17/i.test(entry) && fs.existsSync(path.join(entry, 'bin', 'java.exe')));
    if (match) return match;
  }

  return undefined;
}

prependExisting(path.dirname(process.execPath));

if (isWindows && !env.GRADLE_USER_HOME && env.USERPROFILE) {
  env.GRADLE_USER_HOME = path.join(env.USERPROFILE, '.gradle');
}

const localAndroidSdk =
  isWindows && env.LOCALAPPDATA
    ? path.join(env.LOCALAPPDATA, 'Android', 'Sdk')
    : undefined;
const androidSdk = env.ANDROID_HOME || env.ANDROID_SDK_ROOT || localAndroidSdk;

if (androidSdk && fs.existsSync(androidSdk)) {
  env.ANDROID_HOME = env.ANDROID_HOME || androidSdk;
  env.ANDROID_SDK_ROOT = env.ANDROID_SDK_ROOT || androidSdk;
  prependExisting(
    path.join(androidSdk, 'platform-tools'),
    path.join(androidSdk, 'emulator'),
    path.join(androidSdk, 'cmdline-tools', 'latest', 'bin'),
  );
}

if (env.JAVA_HOME) {
  prependExisting(path.join(env.JAVA_HOME, 'bin'));
} else if (isWindows) {
  const jdk17 = findWindowsJdk17();
  if (jdk17) {
    env.JAVA_HOME = jdk17;
    prependExisting(path.join(jdk17, 'bin'));
  }
}

prependExisting(androidDir);

const args = process.argv.slice(2);
const hasPortArg = args.some((arg, index) => arg === '--port' || arg.startsWith('--port=') || args[index - 1] === '--port');
if (!env.RCT_METRO_PORT && !hasPortArg) {
  env.RCT_METRO_PORT = '8082';
}

const hasModeArg = args.some((arg, index) => arg === '--mode' || arg.startsWith('--mode=') || args[index - 1] === '--mode');
const hasVariantArg = args.some((arg, index) => arg === '--variant' || arg.startsWith('--variant=') || args[index - 1] === '--variant');
if (!hasModeArg && !hasVariantArg) {
  args.unshift('--mode=developmentdebug');
}

const cli = require.resolve('react-native/cli.js', { paths: [root] });
const result = spawnSync(process.execPath, [cli, 'run-android', ...args], {
  cwd: root,
  env,
  stdio: 'inherit',
});

process.exit(result.status ?? 1);
