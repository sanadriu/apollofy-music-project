import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import AccountSchema from "../../../../schemas/AccountSchema";
import { authSelector } from "../../../../redux/auth/auth-selectors";

const RegisterInput = styled.input`
  width: 90%;
  border-radius: 0.3rem;
  color: black;
  border: 1px solid black;
  padding: 0.5rem;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #b04aff;
    color: white;
  }
`;

export default function AccountForm() {
  const dispatch = useDispatch();
  const { submitFirstModal } = useSelector(authSelector);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: { AccountSchema },
    onSubmit: (values) => {
      dispatch(submitFirstModal(JSON.stringify(values, null, 2)));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <RegisterInput
        id="username"
        name="username"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.username}
      />
      <RegisterInput
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <RegisterInput
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <RegisterInput
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.confirmPassword}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
