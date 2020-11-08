# Pool Project

[![Contributors](https://img.shields.io/github/contributors-anon/creyD/prettier_action)](https://github.com/no-domestic-violence/mobile-app/graphs/contributors)
[![CodeFactor](https://www.codefactor.io/repository/github/no-domestic-violence/mobile-app/badge)](https://www.codefactor.io/repository/github/no-domestic-violence/mobile-app)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

### Description:

React Native app which helps to fight domestic violence

**Tech Stack**

- React Native with Expo

We use:

- the latest version of React Navigation v5
- Context API + hooks for state management
- font awesome for icons
- axios for API calls
- i18next and expo-localization for localization
- react-native-maps for maps(goggle maps for android, native maps for ios)
- expo-location for reading geolocation information from the device.
- react-native-elements for material ui styling (could be changed later)
---

**To run locally**

1. Install dependencies:

```s
yarn install
```

2. Start environment

```s
yarn start
```

3. Before merging to master, check errors

```s
yarn lint
```

**To test in development mode or production mode**

1. It runs by default in development mode

2. To run in production mode 

```s
expo start --no-dev --minify
```

**To test in development mode with device**


1. Login to expo with given credentials :

```s
expo login
```

2. Open expo app from your device and login with the same credentials and you can start manually testing your work

**To test in production mode with device**

Publish the app in production mode with expo

**To build bundles**
```s
expo build:android -t app-bundle
```

```s
expo build:ios (only with paid developer account)
```