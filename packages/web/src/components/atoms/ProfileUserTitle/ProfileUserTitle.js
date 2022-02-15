import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

import { authSelector } from "../../../store/auth";
import ButtonFollow from "../buttons/ButtonFollow";

const StyledTitleUser = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ProfileUserTitle = ({ title, id }) => {
  const { currentUser } = useSelector(authSelector);
  const { profileId } = useParams();

  return (
    <StyledTitleUser>
      <div>
        <Typography variant="h5">{title}</Typography>
      </div>
      {currentUser.id !== profileId && (
        <div>
          <ButtonFollow id={id} />
        </div>
      )}
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
