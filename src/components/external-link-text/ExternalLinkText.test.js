import React from 'react';
import { render } from '@testing-library/react-native';
import ExternalLinkText from './index';

describe('External Link Text component', () => {
  const url = 'www.help.de';
  const title = 'www.help.de';

  jest.mock('react-native/Libraries/Linking/Linking', () => ({
    openURL: jest.fn(() => new Promise(setImmediate)),
  }));
  it('should render external link', async () => {
    const { getByText } = render(<ExternalLinkText title={title} url={url} />);
    const text = getByText('www.help.de');
    expect(text).not.toBeNull();
  });

  it('should match snapshot', () => {
    const result = render(
      <ExternalLinkText title={title} url={url} />
    ).toJSON();
    expect(result).toMatchSnapshot();
  });
});
