import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";

import * as ROUTES from "../../routes";
import { LoginBoard } from "../../components/organisms/LoginBoard/LoginBoard";
import { FlexColumn } from "../../components/atoms/FlexColumn/FlexColumn";
import RegisterModal from "../../components/organisms/modal/RegisterModal";

import {
  authSelector,
  resetAuthState,
  signUpWithGoogleRequest,
  signUpWithFacebook
} from '../../redux/auth';
import { modalSelector, nextModal } from '../../redux/modal';

import AccountForm from "../../components/organisms/forms/AccountForm/AccountForm";
import BirthDayForm from "../../components/organisms/forms/BirthDayForm/BirthDayForm2";
import ProfilePictureForm from "../../components/organisms/forms/ProfilePictureForm/ProfilePictureForm";
import DescriptionForm from "../../components/organisms/forms/DescriptionForm/DescriptionForm";

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
  const { isSigningUp, signUpError, isAuthenticated } = useSelector(authSelector);
  const { currentModal } = useSelector(modalSelector);

  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  function handleLoginWithGoogle(e) {
    e.preventDefault();
    dispatch(signUpWithGoogleRequest());
  }

  function handleLoginWithFacebook(e) {
    e.preventDefault();
    dispatch(signUpWithFacebook());
  }

  const handleModal = () => {
    setOpen(!isOpen);
    if (!isOpen) {
      dispatch(nextModal(currentModal + 1));
    } else {
      dispatch(nextModal(0));
    }
  };

  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <MainFlex>
      <LoginBoard />
      <FlexColumn>
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
          onClick={handleModal}
          disabled={isSigningUp}
        >
          Register with email and password
        </RegisterButton>
        <RegisterModal isOpen={isOpen} handleModal={handleModal}>
          <>
            {currentModal === 1 ? <AccountForm /> : null}
            {currentModal === 2 ? <BirthDayForm /> : null}
            {currentModal === 3 ? <ProfilePictureForm /> : null}
            {currentModal === 4 ? <DescriptionForm /> : null}
          </>
        </RegisterModal>
        <RegisterButton
          type="button"
          onClick={(e) => handleLoginWithGoogle(e)}
          disabled={isSigningUp}
        >
          Log in with your account
        </RegisterButton>
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
      </FlexColumn>
    </MainFlex>
  );
}

export default Login;
