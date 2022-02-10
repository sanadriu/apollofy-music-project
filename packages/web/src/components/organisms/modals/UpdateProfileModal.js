/* eslint-disable react/prop-types */
import * as React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import styled from "styled-components";

import { auth, getCurrentUserToken } from "../../../services/auth";
import usersApi from "../../../api/api-users";
import { setCurrentUser } from "../../../redux/auth";

// eslint-disable-next-line react/prop-types
const TextField = styled.input`
  display: block;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: paddIng-box;
  border: 1px solid gray;
  transition: border-color 0.15s ease-In-out, box-shadow 0.15s ease-In-out;
`;

export default function UpdateProfileModal({
  openProfileModal,
  handleClose,
  email,
  password,
  username,
  birthDay,
  profilePic,
}) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [update, setUpdate] = React.useState(null);
  const [fileLoading, setFileLoading] = React.useState(false);

  const setTargetValue = (target) => {
    if (email) {
      setUpdate({ email: target.value });
    }
    if (username) {
      setUpdate({ username: target.value });
    }
    if (birthDay) {
      setUpdate({ birth_date: target.value });
    }
  };

  const sendUpdate = async () => {
    if (password) {
      await auth.sendPasswordResetEmail(auth.currentUser.email);
      return;
    }

    const userToken = await getCurrentUserToken();

    if (userToken) {
      const res = await usersApi.updateUser(
        userToken,
        (updatedUsername && updatedUsername) ||
        (updatedEmail && updatedEmail) ||
        (updatedBirthday && updatedBirthday) ||
        (newProfileLink && newProfileLink),
      );

      if (res) {
        dispatch(currentUserAdded(res.data.data));
        handleClose();
      }
    }
  };

  async function uploadImage(files) {
    const formData = new FormData();
    setFileLoading(true);

    formData.append("file", files[0]);
    formData.append("upload_preset", "crm5jzoc");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/stringifiers/image/upload",
      formData,
    );

    if (res) {
      setUpdate({ thumbnails: { url_default: res.data.secure_url } });
      setFileLoading(false);
    }
  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={openProfileModal}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {(email && "Please Enter Your new Email Address") ||
            (password && "Please Enter Your new Password") ||
            (username && "Please Enter Your new Username") ||
            (birthDay && "Please Enter Your new Birthday") ||
            (profilePic && "Select your new profile picture")}
        </DialogTitle>
        <TextField
          type={
            (email && "email") ||
            (password && "password") ||
            (username && "text") ||
            (birthDay && "date") ||
            (profilePic && "file")
          }
          placeholder={
            (email && "email@mail.com") ||
            (password && "Click on Agree to send a password reset link") ||
            (username && "new username") ||
            (birthDay && "change your birthday")
          }
          onChange={(e) => (profilePic ? uploadImage(e.target.files) : setTargetValue(e.target))}
          disabled={password && true}
        />
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={sendUpdate}
            autoFocus
            disabled={fileLoading && true}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
