module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  settings: {
    "import/resolver": {
      "babel-module": {},
      node: {
        paths: ["src"],
        alias: {
          _assets: "./src/assets/",
          _components: "./src/components/",
          _routes: "./src/routes/",
          _screens: "./src/screens/"
        }
      }
    }
  }
};
