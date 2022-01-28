import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";

import * as ROUTES from "../../routes";
import { LoginBoard } from "../../components/organisms/LoginBoard/LoginBoard";
import { FormDiv } from "../../components/atoms/FlexColumn/FlexColumn";
import RegisterModal from "../../components/organisms/modal/RegisterModal";

import {
  resetAuthState,
  signInWithEmailRequest,
  signUpWithGoogleRequest,
} from "../../redux/auth/auth-actions";

import { authSelector } from "../../redux/auth/auth-selectors";
import AccountForm from "../../components/organisms/forms/AccountForm/AccountForm";

const MainFlex = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

const Title = styled.h1`
  font: Readex Pro;
  font-size: 4rem;
`;

const RegisterButton = styled.button`
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

function Login() {
  const dispatch = useDispatch();
  const { nextModal, currentModal, isSigningUp, signUpError, isAuthenticated } =
    useSelector(authSelector);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  function handleLoginWithGoogle(e) {
    e.preventDefault();
    dispatch(signUpWithGoogleRequest());
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(signInWithEmailRequest(email, password));

    setEmail("");
    setPassword("");
  }

  function handleSetEmail(e) {
    setEmail(e.target.value);
  }

  function handleSetPassword(e) {
    setPassword(e.target.value);
  }

  function handleModal() {
    console.log("hola");
    setOpen(!isOpen);
    dispatch(nextModal);
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <>
      <MainFlex>
        <LoginBoard />
        <FormDiv>
          <Title>What&apos;s rocking right now</Title>
          <RegisterButton
            type="button"
            onClick={(e) => handleLoginWithGoogle(e)}
            disabled={isSigningUp}
          >
            Register with Google
          </RegisterButton>
          <RegisterButton
            type="button"
            onClick={(e) => handleLoginWithGoogle(e)}
            disabled={isSigningUp}
          >
            Register with Facebook
          </RegisterButton>
          <RegisterButton
            type="button"
            onClick={handleModal()}
            disabled={isSigningUp}
          >
            Register with email and password
          </RegisterButton>
          <RegisterModal isOpen={isOpen} handleModal={handleModal}>
            {currentModal === 1 ? <AccountForm /> : null}
          </RegisterModal>
          <RegisterButton
            type="button"
            onClick={(e) => handleLoginWithGoogle(e)}
            disabled={isSigningUp}
          >
            Log in with your account
          </RegisterButton>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="form-input"
              value={email}
              onChange={handleSetEmail}
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={handleSetPassword}
            />
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={isSigningUp}
            >
              Login
            </button>
          </form>
          {signUpError && <section className="mt-4">{signUpError}</section>}
          <section className="mt-4">
            <hr className="mt-1 mb-4" />
            <Link
              to={ROUTES.RESET_PASSWORD}
              className="underline text-blue-gray-200 w-full text-center block"
            >
              Reset password
            </Link>
          </section>
        </FormDiv>
      </MainFlex>
    </>
  );
}

export default Login;
