import React from "react";
import styled from "styled-components";

const StyledImageText = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
`;


const ProfileTextAlbum = () => {
  return (
    <StyledImageText>
      <div>2020</div>
      <div><b>Titulo</b></div>
    </StyledImageText>
  );
};

export default ProfileTextAlbum;
