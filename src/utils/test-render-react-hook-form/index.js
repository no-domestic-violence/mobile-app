/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render } from '@testing-library/react-native';
import { useForm, FormProvider } from 'react-hook-form';


export function renderWithReactHookForm(ui, { defaultValues = {} } = {}) {
  const reactHookFormMethods = {};

  const Wrapper = ({ children }) => {
    const methods = useForm({ defaultValues });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  return {
    ...render(ui, { wrapper: Wrapper }),
  };
}
