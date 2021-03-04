module.exports = {
  verbose: true,
  preset: 'jest-expo',
  transform: {
    '^.+\\.svg$': 'jest-svg-transformer',
  },
  moduleDirectories: ['node_modules', 'src'],
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.setup.js',
  ],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest/setup.js'],
};
