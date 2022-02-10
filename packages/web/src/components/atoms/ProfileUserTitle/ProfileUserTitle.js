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

const TitleText = styled(Typography)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 40rem;
`;

const ProfileUserTitle = ({ title, id }) => {
  return (
    <StyledTitleUser>
      <div>
        <TitleText variant="h3">{title}</TitleText>
      </div>
      <div>
        <ButtonFollow id={id} />
      </div>
    </StyledTitleUser>
  );
};

ProfileUserTitle.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
};

ProfileUserTitle.defaultProps = {
  title: "",
  id: "",
};

export default ProfileUserTitle;
