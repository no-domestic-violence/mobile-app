import React from 'react';
import { renderWithReactHookForm } from 'utils/test-render-react-hook-form';
import { fireEvent, waitFor } from '@testing-library/react-native';
import SosForm from './SosForm.component';

const handleRemove = jest.fn();
const handleSubmit = jest.fn();
const handleGoBack = jest.fn();

const mockInvalidNumber = '123456';
const mockContact = {
  name: 'celeste',
  phone: '015756775098',
  message: 'help me',
};

describe('Sos Form in AddMode', () => {
  it('should match snapshot', () => {
    const result = renderWithReactHookForm(<SosForm />).toJSON();
    expect(result).toMatchSnapshot();
  });
  it('should render name, phone and message fields with placeholder text', () => {
    const { queryByPlaceholderText } = renderWithReactHookForm(
      <SosForm isAddMode />
    );
    expect(queryByPlaceholderText(/name/i)).toBeTruthy();
    expect(queryByPlaceholderText(/phone number/i)).toBeTruthy();
    expect(queryByPlaceholderText(/help message/i)).toBeTruthy();
  });

  it('should show error message when submit is pressed with invalid phone number', async () => {
    const {
      getByTestId,
      queryByPlaceholderText,
      queryByText,
    } = renderWithReactHookForm(<SosForm isAddMode onSubmit={handleSubmit} />);
    fireEvent.changeText(
      queryByPlaceholderText(/phone number/i),
      mockInvalidNumber
    );
    fireEvent.press(getByTestId('contact-submit-button'));
    await waitFor(() => expect(queryByText(/phone number is not valid/i)));
  });

  it('should not show error message when submit is pressed with a valid number', async () => {
    const {
      getByTestId,
      queryByPlaceholderText,
      queryByText,
    } = renderWithReactHookForm(<SosForm isAddMode onSubmit={handleSubmit} />);
    fireEvent.changeText(
      queryByPlaceholderText(/phone number/i),
      mockContact.phone
    );
    fireEvent.press(getByTestId('contact-submit-button'));
    await waitFor(() =>
      expect(queryByText(/phone number is not valid/i)).toBeNull()
    );
  });

  it('should show error messages when submit is pressed and all the fields are empty', async () => {
    const { getByTestId, queryByText } = renderWithReactHookForm(
      <SosForm isAddMode onSubmit={handleSubmit} />
    );
    fireEvent.press(getByTestId('contact-submit-button'));
    await waitFor(() => expect(queryByText(/please enter a name/i)));
    await waitFor(() => expect(queryByText(/phone number is not valid/i)));
    await waitFor(() => expect(queryByText(/please enter a message/i)));
  });

  it('should not show error message when submit is pressed with a valid name', async () => {
    const {
      getByTestId,
      queryByPlaceholderText,
      queryByText,
    } = renderWithReactHookForm(<SosForm isAddMode onSubmit={handleSubmit} />);
    fireEvent.changeText(queryByPlaceholderText(/name/i), mockContact.name);
    fireEvent.press(getByTestId('contact-submit-button'));
    await waitFor(() => expect(queryByText(/please enter a name/i)).toBeNull());
  });

  it('should not show error when submit is pressed with a valid message', async () => {
    const {
      getByTestId,
      queryByPlaceholderText,
      queryByText,
    } = renderWithReactHookForm(<SosForm isAddMode onSubmit={handleSubmit} />);
    fireEvent.changeText(
      queryByPlaceholderText(/help message/i),
      mockContact.message
    );
    fireEvent.press(getByTestId('contact-submit-button'));
    await waitFor(() =>
      expect(queryByText(/please enter a message/i)).toBeNull()
    );
  });

  it('should call onSubmit with the name, phone, and message when submit is pressed', () => {
    const { queryByPlaceholderText, getByTestId } = renderWithReactHookForm(
      <SosForm isAddMode onSubmit={handleSubmit} />
    );
    fireEvent.changeText(queryByPlaceholderText(/name/i), mockContact.name);
    fireEvent.changeText(
      queryByPlaceholderText(/phone number/i),
      mockContact.phone
    );
    fireEvent.changeText(
      queryByPlaceholderText(/help message/i),
      mockContact.message
    );
    fireEvent.press(getByTestId('contact-submit-button'));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('should call goBack when goBack button is pressed', () => {
    const { getByTestId } = renderWithReactHookForm(
      <SosForm isAddMode goBack={handleGoBack} />
    );
    fireEvent.press(getByTestId('go-back-button'));
    expect(handleGoBack).toHaveBeenCalledTimes(1);
  });
});

describe('Sos Form in edit mode', () => {
  it('should render delete and submit button', async () => {
    const { getByTestId } = renderWithReactHookForm(
      <SosForm isAddMode={false} />
    );
    expect(getByTestId('contact-submit-button')).toBeTruthy();
    expect(getByTestId('contact-delete-button')).toBeTruthy();
  });

  it('should call onRemove when remove is pressed', () => {
    const { getByTestId } = renderWithReactHookForm(
      <SosForm isAddMode={false} onRemove={handleRemove} />
    );
    fireEvent.press(getByTestId('contact-delete-button'));
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });
});
