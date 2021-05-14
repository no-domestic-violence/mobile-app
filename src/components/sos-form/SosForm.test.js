import React from 'react';
import { renderWithReactHookForm } from 'utils/test-render-react-hook-form';
import { fireEvent } from '@testing-library/react-native';
import SosForm from './SosForm.component';

const handleRemove = jest.fn();
const handleSubmit = jest.fn();
const handleGoBack = jest.fn();

// const mockInvalidNumber = '123456';
const mockContact = {
  name: 'celeste',
  phone: '015756775098',
  message: 'help me',
};

// TODO: use UserEvent instead of FireEvent
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
