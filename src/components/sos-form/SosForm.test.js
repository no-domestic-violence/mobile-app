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

// TODO: fix form error display tests, use UserEvent instead of FireEvent

describe('Sos Form in AddMode', () => {
  it('should match snapshot', () => {
    const result = renderWithReactHookForm(<SosForm />).toJSON();
    expect(result).toMatchSnapshot();
  });
  it('should render name, phone and message fields with placeholder text', () => {
    const { getByPlaceholderText } = renderWithReactHookForm(
      <SosForm isAddMode />
    );
    expect(getByPlaceholderText(/name/i)).toBeTruthy();
    expect(getByPlaceholderText(/phone number/i)).toBeTruthy();
    expect(getByPlaceholderText(/help message/i)).toBeTruthy();
  });

  it('should show error message when submit is pressed with invalid phone number', async () => {
    const {
      getByTestId,
      getByPlaceholderText,
      findByText,
    } = renderWithReactHookForm(<SosForm isAddMode onSubmit={handleSubmit} />);
    fireEvent.changeText(
      getByPlaceholderText(/phone number/i),
      mockInvalidNumber
    );
    fireEvent.press(getByTestId('contact-submit-button'));
    expect(await findByText(/phone number is not valid/i)).toBeVisible();
  });

  it('should not show error message when submit is pressed with a valid number', async () => {
    const {
      getByTestId,
      getByPlaceholderText,
      queryByText,
    } = renderWithReactHookForm(<SosForm isAddMode onSubmit={handleSubmit} />);
    fireEvent.changeText(
      getByPlaceholderText(/phone number/i),
      mockContact.phone
    );
    fireEvent.press(getByTestId('contact-submit-button'));
    await waitFor(() =>
      expect(queryByText(/phone number is not valid/i)).toBeNull()
    );
  });

  it('should show error messages when submit is pressed and all the fields are empty', async () => {
    const { getByTestId, findByText } = renderWithReactHookForm(
      <SosForm isAddMode onSubmit={handleSubmit} />
    );
    fireEvent.press(getByTestId('contact-submit-button'));

    expect(await findByText(/please enter a name/i)).toBeVisible();
    expect(await findByText(/phone number is not valid/i)).toBeVisible();
    expect(await findByText(/please enter a message/i)).toBeVisible();
  });

  it('should not show error message when submit is pressed with a valid name', async () => {
    const {
      getByTestId,
      getByPlaceholderText,
      queryByText,
    } = renderWithReactHookForm(<SosForm isAddMode onSubmit={handleSubmit} />);
    fireEvent.changeText(getByPlaceholderText(/name/i), mockContact.name);
    fireEvent.press(getByTestId('contact-submit-button'));
    await waitFor(() => expect(queryByText(/please enter a name/i)).toBeNull());
  });

  it('should not show error when submit is pressed with a valid message', async () => {
    const {
      getByTestId,
      getByPlaceholderText,
      queryByText,
    } = renderWithReactHookForm(<SosForm isAddMode onSubmit={handleSubmit} />);
    fireEvent.changeText(
      getByPlaceholderText(/help message/i),
      mockContact.message
    );
    fireEvent.press(getByTestId('contact-submit-button'));
    await waitFor(() =>
      expect(queryByText(/please enter a message/i)).toBeNull()
    );
  });

  it('should call onSubmit with the name, phone, and message when submit is pressed', () => {
    const { getByPlaceholderText, getByTestId } = renderWithReactHookForm(
      <SosForm isAddMode onSubmit={handleSubmit} />
    );
    fireEvent.changeText(getByPlaceholderText(/name/i), mockContact.name);
    fireEvent.changeText(
      getByPlaceholderText(/phone number/i),
      mockContact.phone
    );
    fireEvent.changeText(
      getByPlaceholderText(/help message/i),
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
  it('should render delete and submit button', () => {
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
