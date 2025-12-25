module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['react-native-worklets/plugin', {}, 'rn-worklets'],
    ['react-native-reanimated/plugin', { relativeSourceLocation: true }, 'rn-reanimated'],
  ],
};
