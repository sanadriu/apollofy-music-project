import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import CookieConsent from "react-cookie-consent";

import {
  authSelector,
  resetAuthState,
  signUpWithGoogleRequest,
  signUpWithFacebook,
} from "../../redux/auth";
import { modalSelector, nextModal } from "../../redux/modal";

import * as ROUTES from "../../routes";
import LoginBoard from "../../components/organisms/information/LoginBoard";
import RegisterModal from "../../components/organisms/modals/RegisterModal";
import ResetPassModal from "../../components/organisms/modals/ResetPassModal";
import SignInModal from "../../components/organisms/modals/SigninModal";
import AccountForm from "../../components/organisms/forms/AccountForm";
import ProfilePictureForm from "../../components/organisms/forms/ProfilePictureForm";
import BirthDayForm from "../../components/organisms/forms/BirthDayForm";
import DescriptionForm from "../../components/organisms/forms/DescriptionForm";
import SigninForm from "../../components/organisms/forms/SigninForm";
import Button from "../../components/atoms/buttons/Button";
import FlexColumn from "../../components/atoms/layout/FlexColumn";

const MainFlex = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

const Title = styled.h1`
  font-size: 4rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

const ResetButton = styled.button`
  font-size: 0.75rem;
  border-radius: 0.3rem;
  border: 1px solid darkgray;
  padding: 0.5rem;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.label};
    color: white;
  }
`;

const Subtitle = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;

const Section = styled.section`
  color: ${({ theme }) => theme.colors.text};
`;

const CookieBar = styled(CookieConsent)`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem;
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
    <>
      <MainFlex>
        <LoginBoard />
        <FlexColumn>
          <Title>What&apos;s rocking right now</Title>
          <Subtitle>Join today</Subtitle>
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
          <Subtitle>Already have an account?</Subtitle>
          <Button btnColor="black" type="outline" onClick={handleSignIn} disabled={isSigningUp}>
            Sign in
          </Button>
          <SignInModal signinIsOpen={signinIsOpen} handleModal={handleSignIn}>
            <SigninForm />
          </SignInModal>
          {signUpError && <Section>{signUpError}</Section>}
          <Section>
            <hr />
            <ResetButton onClick={handleResetPassModal}>Reset password</ResetButton>
            <ResetPassModal
              resetPassModalIsOpen={resetPassModalIsOpen}
              handleResetPassModal={handleResetPassModal}
            />
          </Section>
        </FlexColumn>
      </MainFlex>
      <CookieBar
        location="bottom"
        buttonText="Ok!"
        cookieName="Stringifiers"
        style={{ padding: "1rem 3rem" }}
        buttonStyle={{
          backgroundColor: "#B04AFF",
          color: "#FFF",
          fontSize: "0.9rem",
          padding: "0.4rem 1.2rem",
          borderRadius: "0.3rem",
        }}
        declineButtonStyle={{
          backgroundColor: "#3A3A3A",
          borderRadius: "0.3rem",
          color: "#FFF",
          fontSize: "0.9rem",
          padding: "0.4rem",
        }}
        enableDeclineButton
        flipButtons
      >
        Our webpage uses technical cookies for the basic functionality of the site
      </CookieBar>
    </>
  );
}
