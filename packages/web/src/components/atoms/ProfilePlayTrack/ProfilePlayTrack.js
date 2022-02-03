import React from "react";
import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import PlayCircleFilledSharpIcon from "@mui/icons-material/PlayCircleFilledSharp";

const StyledPlayTrack = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  margin-left: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  width: 10%;
`;

const ProfilePlayTrack = () => {
  return (
    <StyledPlayTrack>
      <FavoriteIcon sx={{ color: "purple" }} />
      <PlayCircleFilledSharpIcon
        sx={{ color: "#b04aff", "&:hover": { color: "purple", cursor: 'pointer' } }}
      />
    </StyledPlayTrack>
  );
};

export default ProfilePlayTrack;
