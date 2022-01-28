import React from "react";
import styled from "styled-components";
import { Formik, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";

import AccountSchema from "../../../../schemas/AccountSchema";
import { authSelector } from "../../../../redux/auth/auth-selectors";
import { FlexColumn } from "../../../atoms/FlexColumn/FlexColumn";
import { MiddleTitle } from "../../../atoms/MiddleTitle/MiddleTitle";
import { PrimaryButton } from "../../../atoms/buttons/PrimaryButton";

const RegisterInput = styled.input`
  width: 90%;
  border-radius: 0.3rem;
  color: black;
  border: 1px solid black;
  padding: 0.5rem;
  background-color: white;

  &:focus {
    background-color: #b04aff;
    color: white;
  }
`;

const ModalButton = styled(PrimaryButton)`
  width: 20%;
`;

export default function AccountForm() {
  const dispatch = useDispatch();
  const { submitFirstModal } = useSelector(authSelector);
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirm_password: "",
        }}
        validationSchema={AccountSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(async () => {
            setSubmitting(true);
            dispatch(submitFirstModal(values));
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="formik">
            <FlexColumn>
              <MiddleTitle variant="h5" className="formTypo">
                Sign up
              </MiddleTitle>
              <RegisterInput type="name" name="name" placeholder="Name" />
              <ErrorMessage
                className="errorMessage"
                name="name"
                component="div"
              />
              <RegisterInput type="email" name="email" placeholder="Email" />
              <ErrorMessage
                className="errorMessage"
                name="email"
                component="div"
              />
              <RegisterInput
                type="password"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage
                className="errorMessage"
                name="password"
                component="div"
              />
              <RegisterInput
                type="password"
                name="confirm_password"
                placeholder="Confirm password"
              />
              <ErrorMessage
                className="errorMessage"
                name="confirm_password"
                component="div"
              />
              <ModalButton type="submit" disabled={isSubmitting}>
                Submit
              </ModalButton>
            </FlexColumn>
          </Form>
        )}
      </Formik>
    </>
  );
}
