import * as React from "react";
import styled from "styled-components";
import { Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { FlexColumn } from "../../atoms/FlexColumn/FlexColumn";
import { MiddleTitle } from "../../atoms/MiddleTitle/MiddleTitle";
import { SmallText } from "../../atoms/SmallText/SmallText";
import { useUsers } from "../../../hooks/useUsers";
import UserDetail from "../../molecules/UserDetail/UserDetail";

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

const FriendList = styled(FlexColumn)`
  width: 100%;
  padding: 0;
  gap: 0;
`;

export const ModalBox = styled(Box)`
  width: 40%;
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: 1.3rem;
  padding: 2rem;
`;

export default function AddFriendsModal({ isOpen, handleModal }) {
  const dispatch = useDispatch();
  const { data: users } = useUsers();

  const userList = users?.data?.data;

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
      <ModalBox>
        <FriendList>
          <MiddleTitle className="text-2xl font-bold mb-6">Some partners in music</MiddleTitle>
          {userList &&
            userList.map((user) => {
              return <UserDetail key={user.id} user={user} />;
            })}
        </FriendList>
      </ModalBox>
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
