import * as React from "react";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import PropTypes from "prop-types";

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

export default function SignInModal({ signinIsOpen, handleModal, children }) {
  const handleClose = () => handleModal();

  return (
    <StyledModal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={signinIsOpen}
      onClose={handleClose}
      BackdropComponent={Backdrop}
    >
      <Box sx={style}>{children}</Box>
    </StyledModal>
  );
}

SignInModal.propTypes = {
  signinIsOpen: PropTypes.bool,
  handleModal: PropTypes.func,
  children: PropTypes.element,
};

SignInModal.defaultProps = {
  signinIsOpen: false,
  handleModal: {},
  children: null,
};