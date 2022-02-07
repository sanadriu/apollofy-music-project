import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { FlexColumn } from "../../../atoms/FlexColumn/FlexColumn";
import { MiddleTitle } from "../../../atoms/MiddleTitle/MiddleTitle";
import { SmallText } from "../../../atoms/SmallText/SmallText";
import { PrimaryButton } from "../../../atoms/buttons/PrimaryButton";

import { authSelector, pictureLinkAdded } from "../../../../redux/auth";
import { modalSelector, nextModal } from "../../../../redux/modal";

const Input = styled("input")({
  display: "none",
});

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
          <Button variant="contained" component="span">
            Upload
          </Button>
        </label>
        <label htmlFor="icon-button-file">
          <Input
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={(e) => {
              uploadImage(e.target.files);
              setValue(e.target.files);
            }}
          />
          <IconButton color="primary" aria-label="upload picture" component="span">
            {" "}
            <PhotoCamera />
          </IconButton>
        </label>
        {/* {value ? <p>{value}</p> : null} */}
      </Stack>
      <ModalButton onClick={() => handlePicture()}>{value ? "Submit" : "Skip for now"}</ModalButton>
    </FlexColumn>
  );
}
