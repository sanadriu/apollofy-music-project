import React from "react";
import styled from "styled-components";

const StyledImageText = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  padding-top:1px;
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
