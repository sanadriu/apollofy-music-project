import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  color: grey;
  font-weight: 400;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    display: none;
  }
`;

const ProfileNumTrack = ({ index }) => {
  return (
    <StyledNumber>
      <div>{index + 1}</div>
    </StyledNumber>
  );
};

ProfileNumTrack.propTypes = {
  index: PropTypes.number,
};

ProfileNumTrack.defaultProps = {
  index: 1,
};

export default ProfileNumTrack;
