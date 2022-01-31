import * as yup from "yup";

const AccountSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirm_password: yup.string().required(),
});

export default AccountSchema;
