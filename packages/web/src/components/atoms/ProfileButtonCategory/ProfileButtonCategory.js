import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import AlbumIcon from "@mui/icons-material/Album";

const ButtonCategory = styled.div`
  display: flex;
  padding: 1rem 1.5rem;
  margin: 0 0.5rem;
  border-radius: 2rem 2rem 2rem 2rem;
  background: white;
  border: 1px #eeeee4 solid;
  width: 150px;
  margin-top: 2px;
  cursor: pointer;
  &:hover {
    background-color: purple;
    border: 1px solid #b04aff;
    color: white;
  }
  @media only screen and (max-width: 1000px) {
        width: auto;
    }

`;

const StyledSpanCategory = styled.div`
  padding-left: 5px;
  @media only screen and (max-width: 1000px) {
        display: none;
        width: 20px;
    }
`;

const CategoryButton = ({ text }) => {
  switch (text) {
    case "Tracks":
      return (
        <ButtonCategory>
          <MusicNoteIcon />
          <StyledSpanCategory>{text}</StyledSpanCategory>
        </ButtonCategory>
      );

    case "Playlists":
      return (
        <ButtonCategory>
          <PlaylistPlayIcon />
          <StyledSpanCategory>{text}</StyledSpanCategory>
        </ButtonCategory>
      );

    case "Albums":
      return (
        <ButtonCategory>
          <AlbumIcon />
          <StyledSpanCategory>{text}</StyledSpanCategory>
        </ButtonCategory>
      );

    default:
      return (
        <ButtonCategory>
          <span>{text}</span>
        </ButtonCategory>
      );
  }
};

CategoryButton.propTypes = {
  text: PropTypes.string,
};

CategoryButton.defaultProps = {
  text: "",
};

export default CategoryButton;
