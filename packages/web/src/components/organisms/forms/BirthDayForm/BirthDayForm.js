import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { FlexColumn } from "../../../atoms/FlexColumn/FlexColumn";
import { MiddleTitle } from "../../../atoms/MiddleTitle/MiddleTitle";
import { PrimaryButton } from "../../../atoms/buttons/PrimaryButton";

import { setDateOfBirth } from '../../../../redux/auth';
import { modalSelector, nextModal } from "../../../../redux/modal";

const ModalButton = styled(PrimaryButton)`
  width: 20%;
`;

export default function BirthDayForm() {
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();
  const { currentModal } = useSelector(modalSelector);

  function handleOption() {
    if (value) dispatch(setDateOfBirth(value));

    dispatch(nextModal(currentModal + 1));
  }

  return (
    <FlexColumn>
      <MiddleTitle>Birth Date</MiddleTitle>
      <input
        type="date"
        name="trip-start"
        min="1915-01-01"
        max="2015-12-31"
        onChange={(e) => setValue(e.target.value)}
      />
      <ModalButton onClick={() => handleOption()}>
        {value ? "Submit" : "Skip for now"}
      </ModalButton>
    </FlexColumn>
  );
}
