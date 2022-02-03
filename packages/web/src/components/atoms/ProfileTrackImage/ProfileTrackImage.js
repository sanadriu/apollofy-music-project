import React from "react";
import styled from "styled-components";

const StyledImageTrack = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  display: flex;
  width: 10%;
  max-height: 50px;
  object-fit: cover;
`;

const StyledImage = styled.img`
  object-fit: cover;
  border-radius: 0.8rem
`;

const ProfileTrackImage = () => {
  return (
    <StyledImageTrack>
      <StyledImage
        src="https://images.pexels.com/photos/6759350/pexels-photo-6759350.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt="image song"
      />
    </StyledImageTrack>
  );
};

export default ProfileTrackImage;
