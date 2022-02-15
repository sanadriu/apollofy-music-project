import * as React from "react";
import styled from "styled-components";
import { Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import PropTypes from "prop-types";
import AlbumCreateForm from "../../forms/AlbumForm/AlbumCreateForm";

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
  overflow: scroll;
  color: ${({ theme }) => theme.colors.text};
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

export const ModalBox = styled(Box)`
  width: 40%;
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: 1.3rem;
  padding: 2rem;
`;

export default function AlbumModal({ isOpen, handleModal }) {
  const handleClose = () => handleModal();

  return (
    <StyledModal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={isOpen}
      onClose={handleClose}
      BackdropComponent={Backdrop}
    >
      <ModalBox>
        <AlbumCreateForm />
      </ModalBox>
    </StyledModal>
  );
}

AlbumModal.propTypes = {
  isOpen: PropTypes.bool,
  handleModal: PropTypes.func,
};

AlbumModal.defaultProps = {
  isOpen: false,
  handleModal: {},
};
