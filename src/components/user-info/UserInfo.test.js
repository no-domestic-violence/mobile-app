import React from 'react';
import { render } from '@testing-library/react-native';
import UserInfo from './index';

describe('User information component', () => {
  const username = 'Celeste';
  it('renders name of user from props', () => {
    const { queryByText } = render(<UserInfo username={username} />);
    expect(queryByText(username)).not.toBeNull();
  });
  it('should match snapshot', () => {
    const result = render(<UserInfo username={username} />).toJSON();
    expect(result).toMatchSnapshot();
  });
});
