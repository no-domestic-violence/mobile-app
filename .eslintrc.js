module.exports = {
  root: true,
  extends: 'airbnb',
  plugins: ['react', 'react-native', 'react-hooks'],
  parser: 'babel-eslint',
  env: {
    jest: true,
    'react-native/react-native': true,
  },
  rules: {
    'react/jsx-filename-extension': 'off',
    "no-console": [
      "warn",
      { "allow": ["clear", "info", "error"] }
     ],
     'arrow-body-style': 'off',
     'comma-dangle': 'off',
    'padded-blocks': 'off',
    'arrow-body-style': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    'react-native/no-raw-text': 2,
    'react-native/no-single-element-style-arrays': 2,
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
      node: {
        paths: ['src'],
        alias: {
          _assets: './src/assets/',
          _components: './src/components/',
          _routes: './src/routes/',
          _screens: './src/screens/',
          _styles: './src/styles/',
          _api: './src/api',
          _config: './src/config',
          _mock: './src/mock',
          _state: './src/state',
          _services: './src/services',
          _hooks: './src/hooks',
        },
      },
    },
  },
  globals: {
    fetch: false,
  },
};
