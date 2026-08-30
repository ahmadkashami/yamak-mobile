#!/usr/bin/env node

const fs = require('fs');
const net = require('net');
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

function getArgValue(args, name) {
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === name) return args[index + 1];
    if (arg.startsWith(`${name}=`)) return arg.slice(name.length + 1);
  }

  return undefined;
}

function isPortListening(port) {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host: '127.0.0.1', port });
    let settled = false;

    function done(value) {
      if (settled) return;
      settled = true;
      socket.destroy();
      resolve(value);
    }

    socket.setTimeout(500);
    socket.once('connect', () => done(true));
    socket.once('timeout', () => done(false));
    socket.once('error', () => done(false));
  });
}

prependExisting(path.dirname(process.execPath));
env.NODE_BINARY = env.NODE_BINARY || process.execPath;
env.CMAKE_BUILD_PARALLEL_LEVEL = env.CMAKE_BUILD_PARALLEL_LEVEL || '1';

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

const buildMode = getArgValue(args, '--mode') || getArgValue(args, '--variant') || '';
const isDebugBuild = !buildMode || /debug$/i.test(buildMode);
if (isDebugBuild && !args.includes('--active-arch-only')) {
  args.push('--active-arch-only');
}

async function main() {
  const metroPort = Number(getArgValue(args, '--port') || env.RCT_METRO_PORT || 8082);
  const hasPackagerArg = args.some((arg) => arg === '--no-packager' || arg === '--packager');

  if (!hasPackagerArg && Number.isInteger(metroPort) && await isPortListening(metroPort)) {
    args.push('--no-packager');
  }

  const cli = require.resolve('react-native/cli.js', { paths: [root] });
  const result = spawnSync(process.execPath, [cli, 'run-android', ...args], {
    cwd: root,
    env,
    stdio: 'inherit',
  });

  process.exit(result.status ?? 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
