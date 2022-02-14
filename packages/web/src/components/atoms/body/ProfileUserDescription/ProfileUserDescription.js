import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledDescription = styled.p`
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 400;
  font-size: 0.9rem;
  line-height: 1rem;
`;

const ProfileUserDescription = ({ description }) => {
  return <StyledDescription>{description}</StyledDescription>;
};

ProfileUserDescription.propTypes = {
  description: PropTypes.string,
};

ProfileUserDescription.defaultProps = {
  description: "",
};

export default ProfileUserDescription;
