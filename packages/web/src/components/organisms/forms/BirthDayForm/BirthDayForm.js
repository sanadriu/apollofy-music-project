import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FlexColumn } from "../../../atoms/FlexColumn/FlexColumn";
import { MiddleTitle } from "../../../atoms/MiddleTitle/MiddleTitle";
import { PrimaryButton } from "../../../atoms/buttons/PrimaryButton";
import { authSelector } from "../../../../redux/auth/auth-selectors";
import { nextModal, submitSecondModal } from "../../../../redux/auth/auth-actions";

const ModalButton = styled(PrimaryButton)`
  width: 35%;
`;

export default function BirthDayForm() {
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();
  const { currentModal, currentUser } = useSelector(authSelector);

  function handleOption() {
    if (value) {
      const date = parseInt(value.substr(0, 4), 10);
      if (date >= 1930 && date <= 2015) {
        dispatch(submitSecondModal(value));
        dispatch(nextModal(currentModal + 1));
      } else {
        toast("The date must be between 1930 and 2015");
      }
    }
  }

  return (
    <FlexColumn>
      <MiddleTitle>Birth Date</MiddleTitle>
      <input
        type="date"
        name="trip-start"
        min="1915-01-01"
        max="2015-12-31"
        defaultValue={currentUser.dateOfBirth || null}
        onChange={(e) => setValue(e.target.value)}
      />
      <ToastContainer />
      <ModalButton onClick={() => handleOption()}>{value ? "Submit" : "Skip for now"}</ModalButton>
    </FlexColumn>
  );
}
