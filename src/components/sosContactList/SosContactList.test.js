import React from 'react';
import { render } from '@testing-library/react-native';
import SosContactList from '.';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));

describe('<SosContactList />', () => {
  const mockedContacts = [
    { name: 'test name', phone: '12345667', message: 'mock message' },
  ];
  it('displays first contact name when there is first contact', () => {
    const { getByText } = render(<SosContactList contacts={mockedContacts} />);
    expect(getByText('test name').props.children).toEqual(
      mockedContacts[0].name
    );
  });
  it('displays placeholder message when there is one or no contact', () => {
    const { getByText } = render(<SosContactList contacts={mockedContacts} />);
    expect(
      getByText('Please add your trusted contact').props.children
    ).toBeTruthy();
  });
  it('displays send sms button when a contact exists', () => {
    const { getByTestId } = render(
      <SosContactList contacts={mockedContacts} />
    );
    expect(getByTestId('send-sms-button')).toBeTruthy();
  });
  it('should match snapshot', () => {
    const result = render(<SosContactList />).toJSON();
    expect(result).toMatchSnapshot();
  });
  it('should render both of two contact list elements', () => {
    const { getByTestId } = render(<SosContactList />);
    expect(getByTestId('first-contact')).toBeTruthy();
    expect(getByTestId('second-contact')).toBeTruthy();
  });
});
