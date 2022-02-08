import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const ColorButton = styled(Button)`
  color: white;
  background: ${({ theme }) => theme.colors.label};
  &:hover {
    background: purple;
  }
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

function followUser(id) {
  try {
    console.log('userID:'.id);
  } catch (error) {
    console.log(error);
  }
}

const ButtonFollow = ({ id }) => {

  return (
    <Stack spacing={2} direction="row" onClick={() => followUser(id)}>
      <ColorButton
        variant="contained"
        sx={{ borderRadius: "100px", color: "white" }}
        startIcon={<StarOutlineIcon />}
      >
        <StyledSpan>Seguir</StyledSpan>
      </ColorButton>
    </Stack>
  );
};

ButtonFollow.propTypes = {
  id: PropTypes.string
};

ButtonFollow.defaultProps = {
  id: ""
};

export default ButtonFollow;
