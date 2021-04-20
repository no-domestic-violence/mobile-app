import React from 'react';
import { act, render } from '@testing-library/react-native';
import { SosProvider } from 'state';
import CreateContact from './index';

const mockRoute = {
  params: {},
};

const promise = Promise.resolve();
const getContacts = jest.fn(() => promise);
const addContact = jest.fn(() => promise);
const editContact = jest.fn(() => promise);
const deleteContact = jest.fn(() => promise);

const initProps = {
  getContacts,
  addContact,
  editContact,
  deleteContact,
};

describe('<CreateContact /> when isAddMode', () => {
  it('should match snapshot', async () => {
    const result = render(
      <SosProvider {...initProps}>
        <CreateContact route={mockRoute} />
      </SosProvider>
    ).toJSON();
    expect(result).toMatchSnapshot();
    await act(() => promise);
  });
});
