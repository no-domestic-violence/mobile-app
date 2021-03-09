import React from 'react';
import { render } from '@testing-library/react-native';
import SosContactList from './SosContactList';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));

describe('<SosContactList />', () => {
  it('should match snapshot', () => {
    const result = render(<SosContactList />).toJSON();
    expect(result).toMatchSnapshot();
  });
  it('should have both of two contact list elements', () => {
    const { getByTestId } = render(<SosContactList />);
    expect(getByTestId('first-contact')).not.toBeNull();
    expect(getByTestId('second-contact')).not.toBeNull();
  });
});
