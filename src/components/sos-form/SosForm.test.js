import React from 'react';
import { renderWithReactHookForm } from 'utils/test-render-react-hook-form';
import { fireEvent } from '@testing-library/react-native';
import SosFormFields from './SosForm.component';

const onRemove = jest.fn();
const onSubmit = jest.fn();
const goBack = jest.fn();

describe('Sos Form Fields', () => {
  it('should render name, phone and message fields', () => {
    const { queryByPlaceholderText } = renderWithReactHookForm(
      <SosFormFields
        isAddMode
        onRemove={onRemove}
        onSubmit={onSubmit}
        goBack={goBack}
      />
    );
    expect(queryByPlaceholderText(/name/i)).toBeTruthy();
    expect(queryByPlaceholderText(/phone number/i)).toBeTruthy();
    expect(queryByPlaceholderText(/help message/i)).toBeTruthy();
  });

  it('should reject submission when submitting contact with missing fields', () => {
    const {
      getByTestId,
      queryByPlaceholderText,
      getByText,
    } = renderWithReactHookForm(
      <SosFormFields
        isAddMode
        onRemove={onRemove}
        onSubmit={onSubmit}
        goBack={goBack}
      />
      //   {
      //     defaultValues: {
      //       name: { value: 'soyoon' },
      //       phone: { value: '' },
      //       message: { value: '' },
      //     },
      //   }
    );
    // expect(getByText('soyoon'));
    const submitButton = getByTestId('contact-submit-button');
    fireEvent.press(submitButton);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('should render contact delete button when it is edit mode', async () => {
    const { getByTestId } = renderWithReactHookForm(
      <SosFormFields
        isAddMode={false}
        onSubmit={onSubmit}
        goBack={goBack}
        onRemove={onRemove}
      />
    );
    expect(getByTestId('contact-submit-button')).toBeTruthy();
    expect(getByTestId('contact-delete-button')).toBeTruthy();
  });
});
