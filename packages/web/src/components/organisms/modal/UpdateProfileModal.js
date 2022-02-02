/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import styled from "styled-components";
import { auth, getCurrentUserToken } from "../../../services/auth";
import { updateUser } from "../../../api/api-users";

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
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [updatedEmail, setUpdatedEmail] = React.useState(null);
  const [updatedUsername, setUpdatedUsername] = React.useState(null);

  const sendUpdate = async () => {
    if (password) {
      auth.sendPasswordResetEmail(auth.currentUser.email);
      return;
    }

    const userToken = await getCurrentUserToken();

    if (userToken) {
      updateUser(userToken, updatedUsername, updatedEmail);
    }
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={openProfileModal}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Please Enter Your new{" "}
          {(email && "Email Address") || (password && "Password") || (username && "Username")}
        </DialogTitle>
        <TextField
          type={(email && "email") || (password && "password") || (username && "text")}
          placeholder={
            (email && "email@mail.com") ||
            (password && "Click on Agree to send a password reset link") ||
            (username && "new username")
          }
          onChange={(e) => {
            email && setUpdatedEmail(e.target.value);
            username && setUpdatedUsername(e.target.value);
          }}
          disabled={password && true}
        />
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outlined" color="error" onClick={sendUpdate} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}