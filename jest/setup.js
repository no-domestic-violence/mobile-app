import 'react-native-gesture-handler/jestSetup';
import '@testing-library/jest-dom/extend-expect';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));

global.console = { error: jest.fn() };



jest.mock('react-native-reanimated', () => {
  // eslint-disable-next-line
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the
//  native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
