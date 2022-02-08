import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledNameTrack = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  margin-left: 1rem;
  font-size: 0.8rem;
  width: 60%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media only screen and (max-width: 500px) {
    padding-left:1rem;
  }
`;

const ProfileNameTrack = ({data}) => {
  return (
    <StyledNameTrack>
      <div>
        <b>{data?.title}</b>
      </div>
    </StyledNameTrack>
  );
};


ProfileNameTrack.propTypes = {
  data: PropTypes.object
};

ProfileNameTrack.defaultProps = {
  data: {}
};

export default ProfileNameTrack;
