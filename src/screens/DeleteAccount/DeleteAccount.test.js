import React from 'react';
import { render } from '@testing-library/react-native';
import { AuthProvider } from 'state/';
import DeleteAccount from './index';

describe('Delete Account screen', () => {
  // TODO: fix passing username
  const component = (
    <AuthProvider>
      <DeleteAccount />
    </AuthProvider>
  );
  it('should match snapshot', () => {
    const result = render(component).toJSON();
    expect(result).toMatchSnapshot();
  });
});
