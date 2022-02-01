/* eslint-disable react/jsx-no-bind */
import { Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";
import { deleteUser } from "../../api/api-users";

import ConfirmationDialogue from "../../components/organisms/ConfirmationDialogue";
import UpdateProfileModal from "../../components/organisms/modal/UpdateProfileModal";
import { getCurrentUserToken } from "../../services/auth/auth";

const MainDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const InputDiv = styled.div`
  padding-right: 5px;
  padding-left: 5px;
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const InputLabel = styled.label`
  display: InlIne-block;
  margin-bottom: 0.5rem;
`;

const InputField = styled.span`
  display: block;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: paddIng-box;
  transition: border-color 0.15s ease-In-out, box-shadow 0.15s ease-In-out;
`;

const InsideDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const EditProfile = () => {
  const { userData } = useSelector((state) => state.entities.user);

  async function deleteMyProfile() {
    const userToken = await getCurrentUserToken();

    const response = await deleteUser(userToken);

    if (response) {
      setOpen(false);
    }
  }

  const [open, setOpen] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [email, setEmailModal] = useState(false);
  const [password, setPasswordModal] = useState(false);
  const [username, setUsernameModal] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenProfileModal(false);
  };

  return (
    <MainDiv>
      <h2>Update Your Profile</h2>

      <InputDiv>
        <InputLabel htmlFor="email-Input">Email</InputLabel>
        <InsideDiv>
          <InputField>{userData.email}</InputField>
          <Button
            type="button"
            size="small"
            onClick={() => {
              setEmailModal(true);
              setPasswordModal(false);
              setUsernameModal(false);
              setOpenProfileModal(true);
            }}
          >
            Update Your Email
          </Button>
        </InsideDiv>
      </InputDiv>

      <InputDiv>
        <InputLabel htmlFor="username">Username</InputLabel>
        <InsideDiv>
          <InputField>{userData.username}</InputField>
          <Button
            type="button"
            size="small"
            onClick={() => {
              setUsernameModal(true);
              setPasswordModal(false);
              setEmailModal(false);
              setOpenProfileModal(true);
            }}
          >
            Update Your Username
          </Button>
        </InsideDiv>
      </InputDiv>

      <InputDiv>
        <InputLabel htmlFor="password">Password</InputLabel>
        <InsideDiv>
          <InputField> *********</InputField>
          <Button
            type="button"
            size="small"
            onClick={() => {
              setPasswordModal(true);
              setUsernameModal(false);
              setEmailModal(false);
              setOpenProfileModal(true);
            }}
          >
            Update Your Password
          </Button>
        </InsideDiv>
      </InputDiv>

      <Button variant="outlined" color="error" onClick={handleClickOpen}>
        Delete Profile
      </Button>

      <ConfirmationDialogue
        open={open}
        handleClose={handleClose}
        deleteMyProfile={deleteMyProfile}
      />

      <UpdateProfileModal
        openProfileModal={openProfileModal}
        email={email}
        password={password}
        username={username}
        handleClose={handleClose}
      />
    </MainDiv>
  );
};

export default EditProfile;
