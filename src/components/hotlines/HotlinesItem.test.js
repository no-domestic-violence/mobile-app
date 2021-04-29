import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HotlinesItem from './index';

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
  it('should render hotline item from props', () => {
    const { getByText } = render(<HotlinesItem item={mockHotlineItem} />);
    expect(getByText(mockHotlineItem.organisation_name)).not.toBeNull();
    expect(
      getByText(`${mockHotlineItem.city}, tel:${mockHotlineItem.phone}`)
    ).not.toBeNull();
    expect(getByText(`${mockHotlineItem.website}`)).not.toBeNull();
  });
  it('should make a call on press with the right number', () => {
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
