import React from 'react';
import { render, act, fireEvent } from '@testing-library/react-native';
import HotlinesList from './index';

describe('Hotlines seach screen', () => {
  test('it renders searchBar', async () => {
    const { getByPlaceholderText } = await render(<HotlinesList />);
    await act(async () => {
      const searchInput = getByPlaceholderText(
        'Type city or organisation name'
      );
      expect(searchInput).not.toBeNull();
      fireEvent.changeText(searchInput, 'CHANGE_TEXT');
    });
  });
  test('renders flat list', async () => {
    const { getByTestId } = await render(<HotlinesList />);
    await act(async () => {
      expect(getByTestId('hotlinesFlatList')).not.toBeNull();
    });
  });
  it('should match snapshot', () => {
    const result = render(<HotlinesList />).toJSON();
    expect(result).toMatchSnapshot();
  });
});
