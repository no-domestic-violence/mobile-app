import React from 'react';
import { render } from '@testing-library/react-native';
import UserInfo from './index';

describe('User information component', () => {
  const username = 'Celeste';

  const renderComponent = () => {
    return <UserInfo username={username} />;
  };
  it('should render name of user from props', () => {
    const { getByText } = render(renderComponent());
    expect(getByText(username)).not.toBeNull();
  });
  it('should match snapshot', () => {
    const result = render(renderComponent()).toJSON();
    expect(result).toMatchSnapshot();
  });
});
