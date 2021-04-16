import React from 'react';
import { render } from '@testing-library/react-native';
import { useForm, FormProvider } from 'react-hook-form';

/**
 * Testing Library utility function to wrap tested component in React Hook Form
 * @param {ReactElement} ui A React component
 * @param objectParameters
 * @param {Object} objectParameters.defaultValues Initial form values to pass into
 * React Hook Form, which you can then assert against
 */

export function renderWithReactHookForm(ui, { defaultValues = {} } = {}) {
  let reactHookFormMethods = {};

  const Wrapper = ({ children }) => {
    const methods = useForm({ defaultValues });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  return {
    ...render(ui, { wrapper: Wrapper }),
  };
}
