import React from 'react';
import { useTranslation } from 'react-i18next';
import { render } from '@testing-library/react-native';
import LoginScreen from './index';

jest.mock('react-i18next');

describe('<LoginScreen />', () => {
  it('should match snapshot', () => {
    const result = render(<LoginScreen />).toJSON();
    expect(result).toMatchSnapshot();
  });
});
