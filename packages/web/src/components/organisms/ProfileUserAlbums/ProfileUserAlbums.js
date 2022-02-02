import React from "react";
import styled from "styled-components";
import ProfileCardAlbum from "../../molecules/ProfileCardAlbum/ProfileCardAlbum";

const StyledUserAlbums = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  display: flex;
  background: #eeeee49c;
  border-radius: 0.8rem;
  padding: 0.5rem;
`;

const ProfileUserAlbums = () => {
  return (
    <StyledUserAlbums>
      <ProfileCardAlbum />
      <ProfileCardAlbum />
      <ProfileCardAlbum />
    </StyledUserAlbums>
  );
};

export default ProfileUserAlbums;
