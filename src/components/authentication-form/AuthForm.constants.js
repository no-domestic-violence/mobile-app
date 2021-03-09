import * as yup from 'yup';

const AuthSchema = (formType) =>
  yup.object().shape({
    username: yup.string().when(formType, () => {
      if (formType === 'sign up')
        return yup.string().required('Please enter your username');
      return yup.string().notRequired();
    }),
    oldPassword: yup.string().when(formType, () => {
      if (formType === 'change password')
        return yup.string().required('Please enter your old password here');
      return yup.string().notRequired();
    }),
    email: yup.string().required('Please enter an email'),
    password: yup
      .string()
      .min(8, 'Please enter 8 characters password')
      .required('Please enter 8 characters password'),
  });

export { AuthSchema };
