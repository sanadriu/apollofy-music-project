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
import Button from "../../components/atoms/buttons/Button";

const MainFlex = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

const Title = styled.h1`
  font: Readex Pro;
  font-size: 4rem;
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
        <Button
          btnColor="black"
          type="outline"
          onClick={(e) => handleLoginWithGoogle(e)}
        >
          Sign up with Google
        </Button>
        <Button
          btnColor="black"
          type="outline"
          onClick={(e) => handleLoginWithFacebook(e)}
        >
          Sign up with Facebook
        </Button>
        <Button
          btnColor="black"
          type="outline"
          onClick={handleModal}
          disabled={isSigningUp}
        >
          Sign up with email
        </Button>
        <RegisterModal isOpen={isOpen} handleModal={handleModal}>
          <>
            {currentModal === 1 ? <AccountForm /> : null}
            {currentModal === 2 ? <BirthDayForm /> : null}
            {currentModal === 3 ? <ProfilePictureForm /> : null}
            {currentModal === 4 ? <DescriptionForm /> : null}
          </>
        </RegisterModal>
        <span>Already have an account?</span>
        <Button
          btnColor="black"
          type="outline"
          onClick={(e) => handleLoginWithGoogle(e)}
          disabled={isSigningUp}
        >
          Sign in
        </Button>
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
