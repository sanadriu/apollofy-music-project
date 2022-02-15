import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import FlexColumn from "../../../atoms/layout/FlexColumn";
import MiddleTitle from "../../../atoms/headings/MiddleTitle";
import SmallText from "../../../atoms/body/SmallText";
import PrimaryButton from "../../../atoms/buttons/PrimaryButton";

import { authSelector, pictureLinkAdded } from "../../../../store/auth";
import { modalSelector, nextModal } from "../../../../store/modal";

const Input = styled("input")`
display: "none",
color: ${({ theme }) => theme.colors.text};
background-color: ${({ theme }) => theme.colors.background.secondary};
`;

const ModalButton = styled(PrimaryButton)`
  width: 35%;
`;

export default function ProfilePictureForm() {
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();
  const { currentModal } = useSelector(modalSelector);
  const { currentUser } = useSelector(authSelector);
  const [pictureLink, setLink] = useState("");

  function handlePicture() {
    // if (value) dispatch(setProfilePicture(value));

    dispatch(nextModal(currentModal + 1));
    dispatch(pictureLinkAdded(pictureLink));
  }

  function uploadImage(files) {
    const formData = new FormData();

    formData.append("file", files[0]);
    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

    axios.post(`${process.env.REACT_APP_CLOUDINARY_URL}/image/upload`, formData).then((res) => {
      setLink(res.data.secure_url);
    });
  }

  return (
    <FlexColumn>
      <MiddleTitle>Pick a Profile Picture</MiddleTitle>
      <SmallText>Do you have a favourite selfie? Otherwise, you can take it right now!</SmallText>
      <Stack direction="row" alignItems="center" spacing={2}>
        <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            defaultValue={currentUser.profilePicture || null}
            onChange={(e) => {
              uploadImage(e.target.files);
              setValue(e.target.files);
            }}
          />
          <Button
            variant="contained"
            component="span"
            sx={{ backgroundColor: "white", border: "1px solid black" }}
          >
            Upload
          </Button>
        </label>
        {/* <label htmlFor="icon-button-file">
          <Input
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={(e) => {
              uploadImage(e.target.files);
              setValue(e.target.files);
            }}
          /> */}
        {/* <IconButton color="purple" aria-label="upload picture" component="span">
            {" "} */}
        <PhotoCamera />
        {/* </IconButton> */}
        {/* </label> */}
      </Stack>
      <ModalButton onClick={() => handlePicture()}>{value ? "Submit" : "Skip for now"}</ModalButton>
    </FlexColumn>
  );
}
