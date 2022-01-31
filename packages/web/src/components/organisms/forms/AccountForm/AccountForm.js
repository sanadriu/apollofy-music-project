import React from "react";
import styled from "styled-components";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";

import AccountSchema from "../../../../schemas/AccountSchema";
import { FlexColumn } from "../../../atoms/FlexColumn/FlexColumn";
import { MiddleTitle } from "../../../atoms/MiddleTitle/MiddleTitle";
import { PrimaryButton } from "../../../atoms/buttons/PrimaryButton";

import { setNameEmailAndPassword } from "../../../../redux/auth";
import { modalSelector, nextModal } from "../../../../redux/modal";

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
  const { currentModal } = useSelector(modalSelector);
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
            dispatch(setNameEmailAndPassword(values));
            dispatch(nextModal(currentModal + 1));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="formik">
            <FlexColumn>
              <MiddleTitle>Create your account</MiddleTitle>
              <Field
                as={RegisterInput}
                type="text"
                name="name"
                placeholder="Name"
              />
              <ErrorMessage
                className="errorMessage"
                name="name"
                component="div"
              />
              <Field
                as={RegisterInput}
                type="text"
                name="email"
                placeholder="Email"
              />
              <ErrorMessage
                className="errorMessage"
                name="email"
                component="div"
              />
              <Field
                as={RegisterInput}
                type="password"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage
                className="errorMessage"
                name="password"
                component="div"
              />
              <Field
                as={RegisterInput}
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
