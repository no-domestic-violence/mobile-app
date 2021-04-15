import * as yup from 'yup';

const phoneRegExp = /(\(?([\d \-\)\–\+\/\(]+){6,}\)?([ .\-–\/]?)([\d]+))/; // eslint-disable-line
const SosSchema = yup.object().shape({
  name: yup.string().required('Please enter a name'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Please enter a phone number'),
  message: yup.string().required('Please enter a message'),
});

export { SosSchema };
