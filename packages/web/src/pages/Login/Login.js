import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";

import {
  authSelector,
  resetAuthState,
  signUpWithGoogleRequest,
  signUpWithFacebook,
} from "../../redux/auth";
import { modalSelector, nextModal } from "../../redux/modal";

import * as ROUTES from "../../routes";
import { LoginBoard } from "../../components/organisms/LoginBoard/LoginBoard";
import { FlexColumn } from "../../components/atoms/FlexColumn/FlexColumn";
import RegisterModal from "../../components/organisms/modal/RegisterModal";
import ResetPassModal from "../../components/organisms/modal/ResetPassModal";
import AccountForm from "../../components/organisms/forms/AccountForm/AccountForm";
import ProfilePictureForm from "../../components/organisms/forms/ProfilePictureForm/ProfilePictureForm";
import BirthDayForm from "../../components/organisms/forms/BirthDayForm/BirthDayForm2";
import DescriptionForm from "../../components/organisms/forms/DescriptionForm/DescriptionForm";
import Button from "../../components/atoms/buttons/Button";
import SignInModal from "../../components/organisms/modal/SigninModal";
import SigninForm from "../../components/organisms/forms/SigninForm/SigninForm";

const MainFlex = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

const Title = styled.h1`
  font-size: 4rem;
  text-align: center;
`;

const ResetButton = styled.button`
  font-size: 0.75rem;
  border-radius: 0.3rem;
  border: 1px solid darkgray;
  padding: 0.5rem;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: #b04aff;
    color: white;
  }
`;

export default function Login() {
  const dispatch = useDispatch();
  const { isSigningUp, signUpError, isAuthenticated } = useSelector(authSelector);
  const { currentModal } = useSelector(modalSelector);

  const [isOpen, setOpen] = useState(false);
  const [resetPassModalIsOpen, setResetPassModalOpen] = useState(false);
  const [signinIsOpen, setSigninIsOpen] = useState(false);

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

  const handleSignIn = () => {
    setSigninIsOpen(!signinIsOpen);
  };

  const handleResetPassModal = () => {
    setResetPassModalOpen(!resetPassModalIsOpen);
  };

  const handleError = (err) => toast(err);

  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <MainFlex>
      <LoginBoard />
      <FlexColumn>
        <Title>What&apos;s rocking right now</Title>
        <Button btnColor="black" type="outline" onClick={(e) => handleLoginWithGoogle(e)}>
          Sign up with Google
        </Button>
        <Button btnColor="black" type="outline" onClick={(e) => handleLoginWithFacebook(e)}>
          Sign up with Facebook
        </Button>
        <Button btnColor="black" type="outline" onClick={handleModal} disabled={isSigningUp}>
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
        <Button btnColor="black" type="outline" onClick={handleSignIn} disabled={isSigningUp}>
          Sign in
        </Button>
        <SignInModal signinIsOpen={signinIsOpen} handleModal={handleSignIn}>
          <SigninForm />
        </SignInModal>
        {signUpError && <section className="mt-4">{signUpError}</section>}
        <section className="mt-4">
          <hr className="mt-1 mb-4" />
          <ResetButton onClick={handleResetPassModal}>Reset password</ResetButton>
          <ResetPassModal
            resetPassModalIsOpen={resetPassModalIsOpen}
            handleResetPassModal={handleResetPassModal}
          />
        </section>
      </FlexColumn>
    </MainFlex>
  );
}
