import React from 'react';
import { render } from '@testing-library/react-native';
import ExternalLinkText from './index';

describe('External Link Text component', () => {
  const url = 'www.help.de';
  const title = 'www.help.de';
  // const openExternalLink = jest.fn();
  it('renders component', () => {
    const { getByText } = render(<ExternalLinkText title={title} url={url} />);
    const text = getByText('www.help.de');
    expect(text).not.toBeNull();
    // TODO: to test on press when design is ready
  });

  it('should match snapshot', () => {
    const result = render(
      <ExternalLinkText title={title} url={url} />
    ).toJSON();
    expect(result).toMatchSnapshot();
  });
});
