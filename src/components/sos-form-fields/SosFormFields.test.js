import React from 'react';
import { render } from '@testing-library/react-native';
import { FormProvider } from 'react-hook-form';
import SosFormFields from './SosFormFields.component';

const errors = jest.fn();
const control = jest.fn();
const methods = jest.fn();

describe('Sos Form Fields', () => {
  it('should render name, phone and message fields', () => {
    // given

    // when
    const { queryByPlaceholderText } = render(
      <FormProvider errors={errors} control={control}>
        <SosFormFields />
      </FormProvider>
    );
    // then
    expect(queryByPlaceholderText(/name/i)).toBeTruthy();
    expect(queryByPlaceholderText(/phone number/i)).toBeTruthy();
    expect(queryByPlaceholderText(/help message/i)).toBeTruthy();
  });
});
