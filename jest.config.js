module.exports = {
  verbose: true,
  preset: 'jest-expo',
  transform: {
    '^.+\\.svg$': 'jest-svg-transformer',
  },
  moduleDirectories: ['node_modules', 'src'],
  collectCoverage: true,
  coverageReporters: ['html', 'text-summary', 'lcovonly'],
  collectCoverageFrom: ['src/**/*.{js,ts,jsx,tsx}', '!**/node_modules/**'],
  testPathIgnorePatterns: ['./node_modules/'],
  setupFilesAfterEnv: [
    '<rootDir>/jest/setup.js',
    '@testing-library/jest-native/extend-expect',
  ],
  resetMocks: true,
};
