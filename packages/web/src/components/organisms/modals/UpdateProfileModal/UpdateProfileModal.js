import * as React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import styled from "styled-components";

import { auth, getCurrentUserToken } from "../../../../services/auth";
import usersApi from "../../../../api/api-users";
import { currentUserAdded } from "../../../../store/auth";

const CustomModalTitle = styled(DialogTitle)`
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
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
      const res = await usersApi.updateUser(userToken, update);

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
        <CustomModalTitle
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
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

UpdateProfileModal.propTypes = {
  openProfileModal: PropTypes.bool,
  handleClose: PropTypes.func,
  email: PropTypes.string,
  password: PropTypes.string,
  username: PropTypes.string,
  birthDay: PropTypes.string,
  profilePic: PropTypes.string,
};

UpdateProfileModal.defaultProps = {
  openProfileModal: false,
  handleClose: null,
  email: null,
  password: null,
  username: null,
  birthDay: null,
  profilePic: null,
};
