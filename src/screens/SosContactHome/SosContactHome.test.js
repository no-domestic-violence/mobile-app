// it is the same file, just needed to extract it from the testing scope and added again cuz something was failing

import React from 'react';
import { act, render } from '@testing-library/react-native';
import { SosProvider } from 'state';
import SosContactHome from './index';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));

// https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
describe('<SosContactHome />', () => {
  it('should match snapshot', async () => {
    const promise = Promise.resolve();
    const getContacts = jest.fn(() => promise);
    const result = render(
      <SosProvider getContacts={getContacts}>
        <SosContactHome />
      </SosProvider>
    ).toJSON();
    expect(result).toMatchSnapshot();
    await act(() => promise);
  });
});
