import React from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";

import {
  authSelector,
  setNameEmailAndPassword,
  signInSuccess,
  signInWithEmailRequest,
  signInRequest,
} from "../../../../redux/auth";
import SignInSchema from "../../../../schemas/SignInSchema";
import { FlexColumn } from "../../../atoms/FlexColumn/FlexColumn";
import { MiddleTitle } from "../../../atoms/MiddleTitle/MiddleTitle";
import { PrimaryButton } from "../../../atoms/buttons/PrimaryButton";
import { RegisterInput } from "../../../atoms/RegisterInput/RegisterInput";

export default function SigninForm() {
  const dispatch = useDispatch();
  const { currentUser, signInError, isSigningIn } = useSelector(authSelector);

  return (
    <Formik
      initialValues={{
        email: currentUser.email || "",
        password: currentUser.password || "",
      }}
      validationSchema={SignInSchema}
      onSubmit={async ({ email, password }, { setSubmitting }) => {
        setSubmitting(true);
        await dispatch(signInWithEmailRequest(email, password));
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="formik">
          <FlexColumn>
            <MiddleTitle>Resume where you left</MiddleTitle>
            <Field as={RegisterInput} type="text" name="email" placeholder="Email" />
            <ErrorMessage className="errorMessage" name="email" component="div" />
            <Field as={RegisterInput} type="password" name="password" placeholder="Password" />
            <ErrorMessage className="errorMessage" name="password" component="div" />
            {signInError && <ErrorMessage>{signInError}</ErrorMessage>}
            {isSigningIn && <p>Loading...</p>}
            <PrimaryButton type="submit" disabled={isSubmitting}>
              Submit
            </PrimaryButton>
          </FlexColumn>
        </Form>
      )}
    </Formik>
  );
}
