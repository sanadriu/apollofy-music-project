import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FlexColumn } from "../../../atoms/FlexColumn/FlexColumn";
import { MiddleTitle } from "../../../atoms/MiddleTitle/MiddleTitle";
import { SmallText } from "../../../atoms/SmallText/SmallText";
import { PrimaryButton } from "../../../atoms/buttons/PrimaryButton";

import {
  authSelector,
  signUpRequest,
  signUpWithEmailRequest,
  setCurrentUser,
} from "../../../../redux/auth";

const DescriptionArea = styled.textarea`
  width: 22rem;
  height: 8rem;
  border: 1px solid #b04aff;
  border-radius: 0.3rem;
`;

export default function DescriptionForm() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useSelector(authSelector);
  const navigate = useNavigate();

  function handleDescription() {
    if (value.length <= 250) {
      dispatch(signUpRequest());
      const updatedCurrentUser = {
        ...currentUser,
        description: value,
      };

      dispatch(setCurrentUser(updatedCurrentUser));
      try {
        dispatch(signUpWithEmailRequest(updatedCurrentUser.email, updatedCurrentUser.password));
        navigate("/");
      } catch (err) {
        alert(err.message);
      }
    } else {
      toast.error("Your description is too long", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }

  return (
    <FlexColumn>
      <MiddleTitle>Describe Yourself</MiddleTitle>
      <SmallText>
        What makes you special? Don&apos;t think too hard, just have fun with it
      </SmallText>
      <DescriptionArea
        placeholder="Type a few lines about you..."
        defaultValue={currentUser.description || ""}
        maxlength="250"
        onChange={(e) => setValue(e.target.value)}
      />
      <PrimaryButton onClick={() => handleDescription()}>Finish</PrimaryButton>
      <ToastContainer />
    </FlexColumn>
  );
}
