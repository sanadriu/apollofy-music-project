import * as React from "react";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import {
  authSelector,
  resetAuthState,
  sendPasswordResetEmail,
} from "../../../redux/auth";

import { FlexColumn } from "../../atoms/FlexColumn/FlexColumn";
import { MiddleTitle } from "../../atoms/MiddleTitle/MiddleTitle";
import { PrimaryButton } from "../../atoms/buttons/PrimaryButton";
import { RegisterInput } from "../../atoms/RegisterInput/RegisterInput";
import { SmallText } from "../../atoms/SmallText/SmallText";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 500,
  bgcolor: "white",
  borderRadius: "0.3rem",
  p: 2,
  px: 4,
  pb: 3,
};

function buttonText(loading, sent) {
  if (loading) {
    return "Sending...";
  }

  if (sent) {
    return "Email Sent!";
  }

  return "Send password reset email";
}

export default function ResetPassModal({
  resetPassModalIsOpen,
  handleResetPassModal,
}) {
  const dispatch = useDispatch();
  const { isSendingPasswordReset, passwordResetError, passwordResetSent } =
    useSelector(authSelector);

  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  const handleClose = () => handleResetPassModal();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(sendPasswordResetEmail(email));
    setEmail("");
  }

  function handleSetEmail(e) {
    setEmail(e.target.value);
  }
  return (
    <StyledModal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={resetPassModalIsOpen}
      onClose={handleClose}
      BackdropComponent={Backdrop}
    >
      <Box sx={style}>
        <FlexColumn>
          <MiddleTitle className="text-2xl font-bold mb-6">
            Reset your password
          </MiddleTitle>
          <SmallText>
            You will receive an email and set a new password!
          </SmallText>
          <form onSubmit={handleSubmit}>
            <FlexColumn>
              <RegisterInput
                type="text"
                placeholder="Email"
                className="form-input"
                value={email}
                onChange={(e) => handleSetEmail(e)}
              />
              <PrimaryButton
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSendingPasswordReset || passwordResetSent}
              >
                {buttonText(isSendingPasswordReset, passwordResetSent)}
              </PrimaryButton>
            </FlexColumn>
          </form>
          {passwordResetError && (
            <section className="mt-4">{passwordResetError}</section>
          )}
        </FlexColumn>
      </Box>
    </StyledModal>
  );
}

ResetPassModal.propTypes = {
  resetPassModalIsOpen: PropTypes.bool,
  handleResetPassModal: PropTypes.func,
};

ResetPassModal.defaultProps = {
  resetPassModalIsOpen: false,
  handleResetPassModal: {},
};
