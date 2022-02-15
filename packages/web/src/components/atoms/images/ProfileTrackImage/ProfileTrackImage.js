import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledImageTrack = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  display: flex;
  width: 10%;
  max-height: 50px;
  max-width:50px;
  object-fit: cover;
`;

const StyledImage = styled.img`
  object-fit: cover;
  border-radius: 0.8rem;
  min-width:50px;
  min-height: 50px;
`;

const ProfileTrackImage = ({data}) => {
  return (
    <StyledImageTrack>
      <StyledImage
        src={data?.thumbnails?.url_default}
        alt="image song"
      />
    </StyledImageTrack>
  );
};

ProfileTrackImage.propTypes = {
  data: PropTypes.object
};

ProfileTrackImage.defaultProps = {
  data: {}
};

export default ProfileTrackImage;
