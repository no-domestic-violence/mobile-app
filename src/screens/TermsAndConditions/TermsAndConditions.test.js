import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import TermsAndConditionsScreen from './index';

jest.mock('react-i18next');

describe('<TermsAndConditionsScreen />', () => {
  it('should match snapshot', () => {
    const result = render(<TermsAndConditionsScreen />).toJSON();
    expect(result).toMatchSnapshot();
  });
  it('should be not tappable when disabled', () => {
    const onPress = jest.fn();
    const tree = render(<TermsAndConditionsScreen />);
    const button = tree.getByTestId('terms-conditions-button');
    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });
});
