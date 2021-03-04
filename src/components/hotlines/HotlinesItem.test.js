import React from 'react';
import HotlinesItem from './index';
import { render, fireEvent } from '@testing-library/react-native';

describe('Hotline item component', () => {
  const mockHotlineItem = {
    _id: '5f9db611c7cc881787ba620b',
    city: 'Hamburg',
    country: 'Germany',
    organisation_name: 'Test name 2',
    phone: '+49 543 514 8358',
    website: 'www.help.de',
  };
  const mockMakeCall = jest.fn();
  it('renders hotline item from props', () => {
    const { queryByText, debug } = render(
      <HotlinesItem item={mockHotlineItem} />
    );
    expect(queryByText(mockHotlineItem.organisation_name)).not.toBeNull();
    expect(
      queryByText(`${mockHotlineItem.city}, tel:${mockHotlineItem.phone}`)
    ).not.toBeNull();
    expect(queryByText(`${mockHotlineItem.website}`)).not.toBeNull();
  });
  it('make a call on press with the righ number', () => {
    const { getByTestId } = render(
      <HotlinesItem item={mockHotlineItem} makeCall={mockMakeCall} />
    );
    fireEvent.press(getByTestId('makeCall'));
    expect(mockMakeCall).toHaveBeenCalledTimes(1);
    expect(mockMakeCall).toHaveBeenCalledWith(mockHotlineItem.phone);
  });
  it('should match snapshot', () => {
    const result = render(
      <HotlinesItem item={mockHotlineItem} makeCall={mockMakeCall} />
    ).toJSON();
    expect(result).toMatchSnapshot();
  });
});
