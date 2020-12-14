import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SosContactList from './SosContactList';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));

describe('<SosContactList />', () => {
  it('should match snapshot', () => {
    const result = render(<SosContactList />).toJSON();
    expect(result).toMatchSnapshot();
  });
});
