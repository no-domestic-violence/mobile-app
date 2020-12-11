import React from 'react';
import { render } from '@testing-library/react-native';
import SosContactHome from './index';
import { Provider as AuthProvider } from 'state/AuthContext';

jest.mock('react-i18next');

describe('<SosContactHome />', () => {
  it('should match snapshot', () => {
    const result = render(
      <AuthProvider>
        <SosContactHome />
      </AuthProvider>,
    ).toJSON();
    expect(result).toMatchSnapshot();
  });
});
