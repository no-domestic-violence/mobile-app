import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SosContactList from '.';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));
const mockNavigation = {
  navigate: jest.fn(),
};
const mockContacts = [
  {
    _id: '61234579jgbh3431',
    name: 'celeste',
    phone: '12345667134',
    message: 'mock message',
  },
];

describe('<SosContactList />', () => {
  it('displays first contact name when there is first contact', () => {
    const { getByText } = render(<SosContactList contacts={mockContacts} />);
    expect(getByText(/celeste/i).props.children).toEqual(mockContacts[0].name);
  });
  it('displays placeholder message when there is one or no contact', () => {
    const { getByText } = render(<SosContactList contacts={mockContacts} />);
    expect(getByText(/please add your trusted contact/i)).toBeTruthy();
  });
  it('displays send sms button when a contact exists', () => {
    const { getByText } = render(<SosContactList contacts={mockContacts} />);
    expect(getByText(/ask for help to your contacts/i)).toBeTruthy();
  });
  it('should not render send sms button when there are no contacts', () => {
    const { getByText } = render(<SosContactList />);
    expect(getByText(/ask for help to your contacts/i)).toBeTruthy();
  });
  it('should navigate to create contact screen with contact id on press existing contact button', async () => {
    const { getByText } = render(
      <SosContactList contacts={mockContacts} navigation={mockNavigation} />
    );
    fireEvent.press(getByText(/celeste/i));
    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('CreateContact', {
        id: '61234579jgbh3431',
      });
    });
  });
  it('should navigate to create contact screen without contact id on press empty contact button', async () => {
    const { getByText } = render(
      <SosContactList contacts={mockContacts} navigation={mockNavigation} />
    );
    fireEvent.press(getByText(/please add your trusted contact/i));
    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('CreateContact', {
        id: null,
      });
    });
  });
  it('should match snapshot', () => {
    const result = render(<SosContactList />).toJSON();
    expect(result).toMatchSnapshot();
  });
});
