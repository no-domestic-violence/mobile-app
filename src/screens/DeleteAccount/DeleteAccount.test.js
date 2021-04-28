import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AuthContext } from 'state/index';
import DeleteAccount from './index';

const navigation = {
  goBack: jest.fn()
} ;
const deleteAccount = jest.fn();
const state = {
  username: 'celeste',
};
describe('Delete Account screen', () => {
  const component = (
    <AuthContext.Provider value={{ state, deleteAccount }}>
      <DeleteAccount navigation={navigation} />
    </AuthContext.Provider>
  );

  it('should match snapshot', () => {
    const result = render(component).toJSON();
    expect(result).toMatchSnapshot();
  });

  it('should render default elements and navigate back on btn press', () => {
    const { getByText, getAllByText } = render(component);
    expect(getByText(state.username));
    expect(getByText(/are you certain you want to delete your account?/i));
    expect(getAllByText(/delete account/i).length).toBe(2);
  });
  it('should navigate back on back btn press', () => {
    const { getByTestId } = render(component);
    fireEvent.press(getByTestId('backBtn'));
    expect(navigation.goBack).toBeCalled();
  });
  it('should call deleteAccount action creator on press', () => {
    const { getByTestId } = render(component);
    fireEvent.press(getByTestId('deleteAccount'));
    expect(deleteAccount).toBeCalledWith({ username: state.username });
  });
});
