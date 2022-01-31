import * as yup from "yup";

const AccountSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required'),
  email: yup
    .string()
    .email()
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default AccountSchema;
