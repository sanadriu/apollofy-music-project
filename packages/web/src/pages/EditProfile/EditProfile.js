/* eslint-disable react/jsx-no-bind */
import { Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";

import usersApi from "../../api/api-users";
import withLayout from "../../components/hoc/withLayout";
import ConfirmationModal from "../../components/organisms/modals/ConfirmationModal";
import UpdateProfileModal from "../../components/organisms/modals/UpdateProfileModal";
import { getCurrentUserToken } from "../../services/auth/auth";
import MiddleTitle from "../../components/atoms/headings/MiddleTitle";

const MainDiv = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 2rem;
`;
const InputDiv = styled.div`
  padding-right: 5px;
  padding-left: 5px;
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputLabel = styled.span`
  color: ${({ theme }) => theme.colors.text};
  // background-color: ${({ theme }) => theme.colors.background.secondary};
  padding: 0.5rem;
  border-radius: 1.25rem;
`;

const InputField = styled.span`
  display: block;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background.primary};
  background-clip: paddIng-box;
  transition: border-color 0.15s ease-In-out, box-shadow 0.15s ease-In-out;
`;

const InsideDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const ImageThumb = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 100%;
`;

const EditProfile = () => {
  const { currentUser } = useSelector((state) => state?.entities.auth);
  const profilePicture = currentUser.thumbnails.url_default;

  async function deleteMyProfile() {
    const userToken = await getCurrentUserToken();

    const response = await usersApi.deleteUser(userToken);

    if (response) {
      setOpen(false);
    }
  }

  const [open, setOpen] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [email, setEmailModal] = useState(false);
  const [password, setPasswordModal] = useState(false);
  const [username, setUsernameModal] = useState(false);
  const [birthDate, setBirthdayModal] = useState(false);
  const [profilePic, setProfilePicModal] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenProfileModal(false);
  };

  return (
    <MainDiv>
      <MiddleTitle>Update Your Profile</MiddleTitle>
      <InputDiv>
        <InsideDiv>
          <ImageThumb src={profilePicture} />{" "}
        </InsideDiv>
        <InsideDiv>
          <Button
            type="button"
            size="small"
            onClick={() => {
              setOpenProfileModal(true);
              setProfilePicModal(true);

              setEmailModal(false);
              setPasswordModal(false);
              setUsernameModal(false);
              setBirthdayModal(false);
            }}
          >
            <EditIcon />
          </Button>
        </InsideDiv>
      </InputDiv>

      <InputDiv>
        <InsideDiv>
          <InputLabel htmlFor="email-Input">Email</InputLabel>
        </InsideDiv>
        <InsideDiv>
          <InputField>{currentUser.email}</InputField>
          <Button
            type="button"
            size="small"
            onClick={() => {
              setEmailModal(true);
              setOpenProfileModal(true);

              setPasswordModal(false);
              setUsernameModal(false);
              setBirthdayModal(false);
              setProfilePicModal(false);
            }}
          >
            <EditIcon />
          </Button>
        </InsideDiv>
      </InputDiv>

      <InputDiv>
        <InputLabel htmlFor="username">Username</InputLabel>
        <InsideDiv>
          <InputField>{currentUser.username}</InputField>
          <Button
            type="button"
            size="small"
            onClick={() => {
              setUsernameModal(true);
              setOpenProfileModal(true);

              setPasswordModal(false);
              setEmailModal(false);
              setBirthdayModal(false);
              setProfilePicModal(false);
            }}
          >
            <EditIcon />
          </Button>
        </InsideDiv>
      </InputDiv>

      <InputDiv>
        <InputLabel htmlFor="birth_date">Birthday</InputLabel>
        <InsideDiv>
          <InputField>{currentUser.birth_date}</InputField>
          <Button
            type="button"
            size="small"
            onClick={() => {
              setBirthdayModal(true);
              setOpenProfileModal(true);

              setUsernameModal(false);
              setPasswordModal(false);
              setEmailModal(false);
              setProfilePicModal(false);
            }}
          >
            <EditIcon />
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
              setOpenProfileModal(true);

              setUsernameModal(false);
              setEmailModal(false);
              setBirthdayModal(false);
              setProfilePicModal(false);
            }}
          >
            <EditIcon />
          </Button>
        </InsideDiv>
      </InputDiv>

      <Button variant="outlined" onClick={handleClickOpen}>
        Delete Profile
      </Button>

      <ConfirmationModal open={open} handleClose={handleClose} deleteMyProfile={deleteMyProfile} />

      <UpdateProfileModal
        openProfileModal={openProfileModal}
        email={email}
        password={password}
        username={username}
        birthDay={birthDate}
        profilePic={profilePic}
        handleClose={handleClose}
      />
    </MainDiv>
  );
};

export default withLayout(EditProfile);
