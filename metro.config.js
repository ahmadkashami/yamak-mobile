const { getDefaultConfig } = require("@react-native/metro-config");

const config = getDefaultConfig(__dirname);

// Fix: Metro was watching generated .cxx directories under node_modules causing
// FallbackWatcher ENOENT for CMakeTmp and bundle.hbc errors on clean builds
config.resolver.blockList = [/.*\.cxx\/.*/, /.*\/android\/\.cxx\/.*/, /.*\/android\/app\/\.cxx\/.*/];
config.watchFolders = [__dirname];

module.exports = config;
