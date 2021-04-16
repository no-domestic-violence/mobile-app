import React from 'react';
import { act, render } from '@testing-library/react-native';
import { SosProvider } from 'state';
import CreateContact from './index';

const mockRoute = {
  params: {},
};
const mockState = {
  contacts: [
    {
      _id: '2f213dsafdsfasdfdas34e',
      name: 'soyoon',
      phone: '123412351235',
      message: 'help me',
    },
  ],
};

const promise = Promise.resolve();
const getContacts = jest.fn(() => promise);
const addContacts = jest.fn(() => promise);
const editContact = jest.fn(() => promise);
const deleteContact = jest.fn(() => promise);

describe('<CreateContact /> when isAddMode', () => {
  it('should match snapshot', async () => {
    const result = render(
      <SosProvider
        getContacts={getContacts}
        addContacts={addContacts}
        editContact={editContact}
        deleteContact={deleteContact}
        state={mockState}>
        <CreateContact route={mockRoute} />
      </SosProvider>
    ).toJSON();
    expect(result).toMatchSnapshot();
    await act(() => promise);
  });
  it('should save contact when submit button is pressed', async () => {
    const tree = render(
      <SosProvider
        getContacts={getContacts}
        addContacts={addContacts}
        editContact={editContact}
        deleteContact={deleteContact}
        state={mockState}>
        <CreateContact route={mockRoute} />
      </SosProvider>
    );
    const submitButton = tree.getByTestId('contact-submit-button');
    expect(submitButton).toBeTruthy();
    await act(() => promise);
  });
});
