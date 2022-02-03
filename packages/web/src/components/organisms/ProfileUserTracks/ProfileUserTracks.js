import React from "react";
import styled from "styled-components";
import ProfileUserTrack from "../../molecules/ProfileUserTrack/ProfileUserTrack";

const StyledUserTracks = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  margin: 1rem 0;
  background: #eeeee49c;
  border-radius:1rem;
  padding: 0.5rem  0.5rem;
`;

const ProfileUserTracks = () => {
  return (
    <StyledUserTracks>
      <ProfileUserTrack />
      <ProfileUserTrack />
      <ProfileUserTrack />
      <ProfileUserTrack />
      <ProfileUserTrack />
    </StyledUserTracks>
  );
};

export default ProfileUserTracks;
