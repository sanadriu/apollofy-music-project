import React from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { authSelector, updateCurrentUser } from "../../../../redux/auth";
import { modalSelector, nextModal } from "../../../../redux/modal";

import AccountSchema from "../../../../schemas/AccountSchema";
import FlexColumn from "../../../atoms/FlexColumn";
import MiddleTitle from "../../../atoms/MiddleTitle";
// import { PrimaryButton } from "../../../atoms/buttons/PrimaryButton";
import RegisterInput from "../../../atoms/RegisterInput";
import Button from "../../../atoms/buttons/Button";
import { Input } from "@mui/material";

export default function AccountForm() {
  const dispatch = useDispatch();
  const { currentModal } = useSelector(modalSelector);
  const { currentUser } = useSelector(authSelector);

  return (
    <Formik
      initialValues={{
        username: currentUser.username || "",
        email: currentUser.email || "",
        password: currentUser.password || "",
        passwordConfirmation: currentUser.passwordConfirmation || "",
      }}
      validationSchema={AccountSchema}
      onSubmit={(values, { setSubmitting }) => {
        const updatedUser = {
          username: values.username || "",
          email: values.email || "",
          password: values.password || "",
          passwordConfirmation: values.passwordConfirmation || "",
        };

        setTimeout(async () => {
          setSubmitting(true);
          // dispatch(signUpWithEmailRequest(values.email, values.password, values.name));
          dispatch(updateCurrentUser(updatedUser));
          dispatch(nextModal(currentModal + 1));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="formik">
          <FlexColumn>
            <MiddleTitle>Create your account</MiddleTitle>
            <Field as={RegisterInput} type="text" name="username" placeholder="Username" />
            <ErrorMessage className="errorMessage" name="username" component="div" />
            <Field as={RegisterInput} type="text" name="email" placeholder="Email" />
            <ErrorMessage className="errorMessage" name="email" component="div" />
            <Field as={RegisterInput} type="password" name="password" placeholder="Password" />
            <ErrorMessage className="errorMessage" name="password" component="div" />
            <Field
              as={RegisterInput}
              type="password"
              name="passwordConfirmation"
              placeholder="Confirm password"
            />
            <ErrorMessage className="errorMessage" name="passwordConfirmation" component="div" />
            <Input btnColor="#B04AFF" type="submit" disabled={isSubmitting}>
              Submit
            </Input>
          </FlexColumn>
        </Form>
      )}
    </Formik>
  );
}
