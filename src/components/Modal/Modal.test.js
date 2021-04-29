import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Modal from './index';


describe('Modal component', () => {
  const setModalVisible = jest.fn();
  const mockNavigation = {
    navigate: jest.fn(),
  };

  const renderComponent = () => {
    return (
      <Modal
        isVisible={true}
        setModalVisible={setModalVisible}
        navigation={mockNavigation}
      />
    );
  };

  it('should render modal when it is visible', () => {
    const { getByText } = render(renderComponent());
    expect(getByText(/password was successfully changed/i)).not.toBeNull();
  });
  it('should set visibility of modal to false on press and navigate to User', () => {
    const { getByText } = render(renderComponent());
    fireEvent.press(getByText(/Ok/i));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('User');
    expect(setModalVisible).toHaveBeenCalledTimes(1);
    expect(setModalVisible).toHaveBeenCalledWith(false);
  });
  it('should match snapshot', () => {
    const result = render(renderComponent()).toJSON();
    expect(result).toMatchSnapshot();
  });
});
