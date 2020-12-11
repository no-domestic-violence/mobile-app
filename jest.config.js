module.exports = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest/preprocessor.js',
    '^.+\\.svg$': '<rootDir>/svgTransform.js',
  },
};
