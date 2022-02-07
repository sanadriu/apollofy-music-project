import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import ButtonFollow from "../ButtonFollow/ButtonFollow";

const StyledTitleUser = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ProfileUserTitle = ({ title,id }) => {
  return (
    <StyledTitleUser>
      <div>
        <Typography variant="h3">{title}</Typography>
      </div>
      <div>
        <ButtonFollow id={id}/>
      </div>
    </StyledTitleUser>
  );
};

ProfileUserTitle.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string
};

ProfileUserTitle.defaultProps = {
  title: "",
  id: ""
};
export default ProfileUserTitle;
