import React from 'react';
import { render } from '@testing-library/react-native';
import TermsAndConditionsScreen from './index';

jest.mock('react-i18next');

describe('<TermsAndConditionsScreen />', () => {
  it('should match snapshot', () => {
    const result = render(<TermsAndConditionsScreen />).toJSON();
    expect(result).toMatchSnapshot();
  });
});
