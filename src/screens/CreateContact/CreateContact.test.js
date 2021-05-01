import React from 'react';
import { act, render } from '@testing-library/react-native';
import { SosProvider, SosContext } from 'state';
import CreateContact from './index';

const mockRoute = {
  params: {},
};
const mockRouteWithId = {
  params: { id: 'fakeid' },
};

const mockNavigation = {
  goBack: jest.fn(),
};

const mockState = {
  errorMessage: 'Contact does not exist',
  contacts: [
    {
      _id: 'fakeid',
      name: 'test',
      phone: '1234213413523',
      message: 'hello',
    },
  ],
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

describe('<CreateContact />', () => {
  it('should match snapshot', async () => {
    const result = render(
      <SosProvider {...initProps}>
        <CreateContact route={mockRoute} navigation={mockNavigation} />
      </SosProvider>
    ).toJSON();
    expect(result).toMatchSnapshot();
    await act(() => promise);
  });
  it('should display errorMessage when there is server error', async () => {
    const { getByText } = render(
      <SosContext.Provider value={{ state: mockState, ...initProps }}>
        <CreateContact route={mockRouteWithId} navigation={mockNavigation} />
      </SosContext.Provider>
    );
    expect(getByText(/contact does not exist/i)).toBeTruthy();
    await act(() => promise);
  });
});
