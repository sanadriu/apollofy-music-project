import * as React from "react";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { authSelector, resetAuthState, sendPasswordResetEmail } from "../../../redux/auth";

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

export default function AddFriendsModal({ isOpen, handleModal }) {
  const dispatch = useDispatch();

  const handleClose = () => handleModal();

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <StyledModal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={isOpen}
      onClose={handleClose}
      BackdropComponent={Backdrop}
    >
      <Box sx={style}>
        <FlexColumn>
          <MiddleTitle className="text-2xl font-bold mb-6">
            Find your next favourite music
          </MiddleTitle>
          <SmallText>The more users you follow, the more music you discover</SmallText>
        </FlexColumn>
      </Box>
    </StyledModal>
  );
}

AddFriendsModal.propTypes = {
  isOpen: PropTypes.bool,
  handleModal: PropTypes.func,
};

AddFriendsModal.defaultProps = {
  isOpen: false,
  handleModal: {},
};
