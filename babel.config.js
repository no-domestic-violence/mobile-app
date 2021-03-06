module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset', 'babel-preset-expo'],
    env: {
      production: {
        plugins: ['transform-remove-console'],
      },
    },
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.json'],
          alias: {
            '': './src',
            _assets: './src/assets',
            _components: './src/components',
            _routes: './src/routes',
            _screens: './src/screens',
            _styles: './src/styles',
            _api: './src/api',
            _config: './src/config',
            _mock: './src/mock',
            _state: './src/state',
            _services: './src/services',
            _hooks: './src/hooks',
            helpers: './src/helpers',
          },
        },
      ],
    ],
  };
};
