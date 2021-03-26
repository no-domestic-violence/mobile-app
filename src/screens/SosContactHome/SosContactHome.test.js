// it is the same file, just needed to extract it from the testing scope and added again cuz something was failing

import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider as SosProvider } from 'state/SosContext';
import SosContactHome from './index';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));

describe('<SosContactHome />', () => {
  it('should match snapshot', async () => {
    const result = await render(
      <SosProvider>
        <SosContactHome />
      </SosProvider>
    ).toJSON();
    await expect(result).toMatchSnapshot();
  });
});
