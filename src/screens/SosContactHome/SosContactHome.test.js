// it is the same file, just needed to extract it from the testing scope and added again cuz something was failing

import React from 'react';
import { act, render } from '@testing-library/react-native';
import { SosProvider, SosContext } from 'state';
import SosContactHome from './index';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));

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
// https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
describe('<SosContactHome />', () => {
  it('should match snapshot', async () => {
    const result = render(
      <SosProvider getContacts={getContacts}>
        <SosContactHome />
      </SosProvider>
    ).toJSON();
    expect(result).toMatchSnapshot();
    await act(() => promise);
  });
  it('should display errorMessage when there is server error', async () => {
    const { getByText } = render(
      <SosContext.Provider value={{ state: mockState, getContacts }}>
        <SosContactHome />
      </SosContext.Provider>
    );
    expect(getByText(/contact does not exist/i)).toBeTruthy();
    await act(() => promise);
  });
});
