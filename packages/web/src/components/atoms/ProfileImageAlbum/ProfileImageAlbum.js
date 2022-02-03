import React from "react";
import styled from "styled-components";
import PlayCircleFilledSharpIcon from "@mui/icons-material/PlayCircleFilledSharp";

const StyledImageTrack = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  width: auto;
  display: flex;
  justify-content:center;
  align-items:center;
  //position: relative;
`;

const StyledImage = styled.img`
  display: block;
  border-radius: 0.8rem;
  width: 100px;
  height: 100px;
  object-fit: cover;
  &:hover {
    opacity: 0.8;
  }
`;

const ProfileImageAlbum = () => {
  return (
    <StyledImageTrack>
{/*       <PlayCircleFilledSharpIcon
        sx={{
          display: "none",
          "&:hover": { display: "block", cursor: "pointer", position: "absolute", "top": "top:20%"},
        }}
      /> */}
      <StyledImage
        src="https://images.pexels.com/photos/10931590/pexels-photo-10931590.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt="image song"
      />
    </StyledImageTrack>
  );
};

export default ProfileImageAlbum;
