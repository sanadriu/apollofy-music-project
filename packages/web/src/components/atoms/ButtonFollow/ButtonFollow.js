import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { purple, lime } from "@mui/material/colors";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const ColorButton = styled(Button)`
  color: white;
  background: #9c27b0 !important;
  @media only screen and (max-width: 500px) {
    width: 20px;
  }
`;

const StyledSpan = styled.span`
  @media only screen and (max-width: 500px) {
    margin: 0 !important;
    display: none;
  }
`;

const StyledIcon = styled(StarOutlineIcon)`
  @media only screen and (max-width: 500px) {
    margin-left: 11px;
    border-radius: 100%;
  }
`;

const ButtonFollow = () => {
  return (
    <Stack spacing={2} direction="row">
      <ColorButton
        variant="contained"
        sx={{ borderRadius: "100px", color: "white" }}
        startIcon={<StyledIcon />}
      >
        <StyledSpan>Seguir</StyledSpan>
      </ColorButton>
    </Stack>
  );
};

export default ButtonFollow;
