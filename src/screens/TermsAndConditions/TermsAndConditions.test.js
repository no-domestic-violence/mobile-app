import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import TermsAndConditionsScreen from './index';

jest.mock('react-i18next');
const mockNavigation = {
  navigate: jest.fn()
}
describe('<TermsAndConditionsScreen />', () => {
  it('should match snapshot', () => {
    const result = render(<TermsAndConditionsScreen />).toJSON();
    expect(result).toMatchSnapshot();
  });
  test('button should be not tappable by default', () => {
    const onPress = jest.fn();
    const tree = render(<TermsAndConditionsScreen />);
    const button = tree.getByTestId('terms-conditions-button');
    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });
  test('button should be tappable when scrolled down near to the bottom', () => {
    const eventData = {
      nativeEvent: {
        layoutMeasurement: {
          height: 0
        },
        contentOffset: {
          y: 200
        },
        contentSize: {
          height: 80
        }
      }
    }
    const { getByTestId } = render(<TermsAndConditionsScreen navigation={mockNavigation}/>);
    fireEvent.scroll(getByTestId('terms-conditions-scroll-view'), eventData);
    fireEvent.press(getByTestId('terms-conditions-button'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Onboarding');
  })
});
