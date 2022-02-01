import * as yup from "yup";

const SignInSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .required("Password is required"),
});

export default SignInSchema;
