import React from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import ButtonFollow from "../ButtonFollow/ButtonFollow";

const StyledTitleUser = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
`;

const ProfileUserTitle = ({ title }) => {
  return (
    <StyledTitleUser>
      <div>
        <Typography variant="h3">{title}</Typography>
      </div>
      <div>
        <ButtonFollow />
      </div>
    </StyledTitleUser>
  );
};

ProfileUserTitle.propTypes = {
  title: PropTypes.string,
};

ProfileUserTitle.defaultProps = {
  title: "",
};
export default ProfileUserTitle;
