module.exports = {
  root: true,
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['react', 'react-native', 'react-hooks', 'testing-library'],
  parser: 'babel-eslint',
  env: {
    jest: true,
    'react-native/react-native': true,
  },
  ignorePatterns: ['.coverage/*'],
  rules: {
    'react/jsx-filename-extension': 'off',
    'no-console': ['warn', { allow: ['clear', 'info', 'error'] }],
    'arrow-body-style': 'off',
    'comma-dangle': 'off',
    'padded-blocks': 'off',
    'arrow-body-style': 'off',
    'import/no-cycle': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 'off', //make it strict at some point
    'react-native/no-color-literals': 0, //make it strict at some point
    'import/prefer-default-export': 0, //make it strict at some point
    'react-native/no-raw-text': 2,
    'react/prop-types': 0,
    'react-native/no-single-element-style-arrays': 2,
    'react/jsx-props-no-spreading': ['error', { custom: 'ignore' }],
    "testing-library/await-async-query": "error",
    "testing-library/no-await-sync-query": "error",
    "testing-library/no-debug": "warn",
    "testing-library/no-dom-import": "off"
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
          helpers: './src/helpers',
        },
      },
    },
  },
  globals: {
    fetch: false,
  },
};
