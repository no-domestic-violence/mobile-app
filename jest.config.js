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
  testPathIgnorePatterns: ['./node_modules/'],
  setupFilesAfterEnv: [
    '<rootDir>/jest/setup.js',
    '@testing-library/jest-native/extend-expect',
  ],
};
