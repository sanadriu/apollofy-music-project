import React from "react";
import styled from "styled-components";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { authSelector, setNameEmailAndPassword } from "../../../../redux/auth";
import { modalSelector, nextModal } from "../../../../redux/modal";

import AccountSchema from "../../../../schemas/AccountSchema";
import { FlexColumn } from "../../../atoms/FlexColumn/FlexColumn";
import { MiddleTitle } from "../../../atoms/MiddleTitle/MiddleTitle";
import { PrimaryButton } from "../../../atoms/buttons/PrimaryButton";
import { RegisterInput } from "../../../atoms/RegisterInput/RegisterInput";

export default function AccountForm() {
  const dispatch = useDispatch();
  const { currentModal } = useSelector(modalSelector);
  const { currentUser } = useSelector(authSelector);

  return (
    <Formik
      initialValues={{
        name: currentUser.name || "",
        email: currentUser.email || "",
        password: currentUser.password || "",
        confirm_password: currentUser.confirm_password || "",
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
              placeholder="Username"
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
              name="passwordConfirmation"
              placeholder="Confirm password"
            />
            <ErrorMessage
              className="errorMessage"
              name="passwordConfirmation"
              component="div"
            />
            <PrimaryButton type="submit" disabled={isSubmitting}>
              Submit
            </PrimaryButton>
          </FlexColumn>
        </Form>
      )}
    </Formik>
  );
}
