import React from "react";
import styled from "styled-components";
import ProfileImageAlbum from "../../atoms/ProfileImageAlbum/ProfileImageAlbum";
import ProfileTextAlbum from "../../atoms/ProfileTextAlbum/ProfileTextAlbum";

const StyledCardAlbum = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border-radius: 0.8rem;
  width: 20%;
  margin: 0 0.5rem;
  padding: 0.5rem;
  &:hover {
    cursor: pointer;
    background: #8080804d;
  }
`;

const ProfileCardAlbum = () => {
  return (
    <StyledCardAlbum>
      <ProfileImageAlbum />
      <ProfileTextAlbum />
    </StyledCardAlbum>
  );
};

export default ProfileCardAlbum;
