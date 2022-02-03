import React from "react";
import styled from "styled-components";

const StyledNameTrack = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  margin-left: 1rem;
  font-size: 0.8rem;
  width: 60%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ProfileNameTrack = () => {
  return (
    <StyledNameTrack>
      <div>
        <b>Song Title</b>
      </div>
      <div>Albums name</div>
    </StyledNameTrack>
  );
};

export default ProfileNameTrack;
