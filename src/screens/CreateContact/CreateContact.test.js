import React from 'react';
import { act, render, fireEvent, waitFor } from '@testing-library/react-native';
import { SosProvider, SosContext } from 'state';
import CreateContact from './index';

const mockRouteWithoutId = {
  params: {},
};
const mockRouteWithId = {
  params: { id: 'fakeid' },
};

const mockNavigation = {
  goBack: jest.fn(),
};

const mockEmptyState = {
  contacts: [],
};

const mockErrorState = {
  errorMessage: 'Contact does not exist',
  contacts: [],
};

const mockState = {
  contacts: [
    {
      _id: 'fakeid',
      name: 'test',
      phone: '1234213413523',
      message: 'hello',
    },
  ],
};
const mockContact = {
  name: 'celeste',
  message: 'help',
  validNumber: '4915756775988',
  invalidNumber: '123',
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

describe('<CreateContact /> in addMode', () => {
  it('should match snapshot', async () => {
    const result = render(
      <SosProvider {...initProps}>
        <CreateContact route={mockRouteWithoutId} navigation={mockNavigation} />
      </SosProvider>
    ).toJSON();
    expect(result).toMatchSnapshot();
    await act(() => promise);
  });

  it('should not render delete icon', async () => {
    const { queryByTestId } = render(
      <SosProvider {...initProps}>
        <CreateContact route={mockRouteWithoutId} navigation={mockNavigation} />
      </SosProvider>
    );
    expect(queryByTestId('contact-delete-button')).toBeNull();
  });

  it('should show field error messages when all the fields are empty and submit is pressed', async () => {
    const { getByTestId, getByText } = render(
      <SosProvider {...initProps}>
        <CreateContact route={mockRouteWithoutId} navigation={mockNavigation} />
      </SosProvider>
    );
    fireEvent.press(getByTestId('contact-submit-button'));
    await waitFor(() => {
      expect(getByText(/please enter a name/i)).toBeTruthy();
      expect(getByText(/phone number is not valid/i)).toBeTruthy();
      expect(getByText(/please enter a message/i)).toBeTruthy();
    });
  });

  it('should show error message when submit is pressed with invalid phone number', async () => {
    const { getByTestId, getByPlaceholderText, findByText } = render(
      <SosProvider {...initProps}>
        <CreateContact route={mockRouteWithoutId} navigation={mockNavigation} />
      </SosProvider>
    );
    fireEvent.changeText(
      getByPlaceholderText(/phone number/i),
      mockContact.invalidNumber
    );
    fireEvent.press(getByTestId('contact-submit-button'));
    expect(await findByText(/phone number is not valid/i)).toBeTruthy();
  });

  it('should not show error message when submit is pressed with valid phone number', async () => {
    const { getByTestId, getByPlaceholderText, queryByText } = render(
      <SosProvider {...initProps}>
        <CreateContact route={mockRouteWithoutId} navigation={mockNavigation} />
      </SosProvider>
    );
    await act(async () => {
      fireEvent.changeText(
        getByPlaceholderText(/phone number/i),
        mockContact.validNumber
      );
      fireEvent.press(getByTestId('contact-submit-button'));
    });

    expect(queryByText(/phone number is not valid/i)).toBeNull();
  });

  it('handles valid input submission when adding a contact', async () => {
    const { getByTestId, getByPlaceholderText } = render(
      <SosContext.Provider value={{ state: mockEmptyState, ...initProps }}>
        <CreateContact route={mockRouteWithoutId} navigation={mockNavigation} />
      </SosContext.Provider>
    );
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText(/name/i), mockContact.name);
      fireEvent.changeText(
        getByPlaceholderText(/message/i),
        mockContact.message
      );
      fireEvent.changeText(
        getByPlaceholderText(/phone number/i),
        mockContact.validNumber
      );
      fireEvent.press(getByTestId('contact-submit-button'));
    });
    expect(addContact).toBeCalledWith({
      name: mockContact.name,
      message: mockContact.message,
      phone: mockContact.validNumber,
    });
    expect(getContacts).toHaveBeenCalledTimes(1);
    expect(mockNavigation.goBack).toBeCalledTimes(1);
    await act(() => promise);
  });

  it('should display errorMessage when there is server error', async () => {
    const { getByText } = render(
      <SosContext.Provider value={{ state: mockErrorState, ...initProps }}>
        <CreateContact route={mockRouteWithoutId} navigation={mockNavigation} />
      </SosContext.Provider>
    );
    expect(getByText(/contact does not exist/i)).toBeTruthy();
    await act(() => promise);
  });
});

describe('<CreateContact /> in editMode', () => {
  it('should match snapshot', async () => {
    const result = render(
      <SosContext.Provider value={{ state: mockState, ...initProps }}>
        <CreateContact route={mockRouteWithId} navigation={mockNavigation} />
      </SosContext.Provider>
    ).toJSON();
    expect(result).toMatchSnapshot();
    await act(() => promise);
  });
  it('should set values of existing contact elements from the state', async () => {
    const { getByDisplayValue } = render(
      <SosContext.Provider value={{ state: mockState, ...initProps }}>
        <CreateContact route={mockRouteWithId} navigation={mockNavigation} />
      </SosContext.Provider>
    );
    expect(getByDisplayValue(mockState.contacts[0].name)).toBeTruthy();
    expect(getByDisplayValue(mockState.contacts[0].message)).toBeTruthy();
    expect(getByDisplayValue(mockState.contacts[0].phone)).toBeTruthy();
  });
  it('handles delete contact when trash icon is pressed', async () => {
    const { getByTestId } = render(
      <SosContext.Provider value={{ state: mockState, ...initProps }}>
        <CreateContact route={mockRouteWithId} navigation={mockNavigation} />
      </SosContext.Provider>
    );
    await act(async () => {
      fireEvent.press(getByTestId('contact-delete-button'));
    });
    expect(deleteContact).toBeCalledWith({ id : mockRouteWithId.params.id});
    expect(mockNavigation.goBack).toBeCalledTimes(1);
    await act(() => promise);
  });
  it('handles edit contact with valid input submissions', async () => {
    const { getByTestId, getByPlaceholderText } = render(
      <SosContext.Provider value={{ state: mockState, ...initProps }}>
        <CreateContact route={mockRouteWithId} navigation={mockNavigation} />
      </SosContext.Provider>
    );
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText(/name/i), mockContact.name);
      fireEvent.changeText(
        getByPlaceholderText(/message/i),
        mockContact.message
      );
      fireEvent.changeText(
        getByPlaceholderText(/phone number/i),
        mockContact.validNumber
      );
      fireEvent.press(getByTestId('contact-submit-button'));
    });
    expect(editContact).toBeCalledWith({data : {
      name: mockContact.name,
      message: mockContact.message,
      phone: mockContact.validNumber,
       _id: mockRouteWithId.params.id
    }, id : mockRouteWithId.params.id }  );
    expect(mockNavigation.goBack).toBeCalledTimes(1);
    await act(() => promise);
  });
});
