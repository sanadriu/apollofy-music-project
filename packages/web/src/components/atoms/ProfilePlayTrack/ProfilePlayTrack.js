/* eslint-disable no-new */
import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import PlayCircleFilledSharpIcon from "@mui/icons-material/PlayCircleFilledSharp";

// import { addToTrackList } from "../../../redux/tracks";
import { addTrack, playTrack } from "../../../redux/tracks";
import PlaylistAdd from "@mui/icons-material/PlaylistAdd";
import { Button } from "@mui/material";
import { PlayerInterface, Track } from "react-material-music-player";

const StyledPlayTrack = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  margin-left: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  width: 25%;
  gap: 0.5rem;
`;

const PlayListButton = styled(Button)`
  border: none;
  background-color: transparent;
`;

const PlayButton = styled(Button)`
  border: none;
  background-color: transparent;
`;

const ProfilePlayTrack = ({ track, handlePlayButton }) => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addTrack(track));

    PlayerInterface.playLater([
      new Track(
        track.id,
        track?.thumbnails?.url_default,
        track?.title,
        track?.user?.username,
        track.url,
      ),
    ]);
  };

  const handlePlay = () => {
    dispatch(playTrack(track));

    PlayerInterface.play([
      new Track(
        track.id,
        track?.thumbnails?.url_default,
        track?.title,
        track?.user?.username,
        track.url,
      ),
    ]);
  };

  return (
    <StyledPlayTrack>
      <FavoriteIcon sx={{ color: "purple" }} />
      <PlayListButton type="button" onClick={() => handleAdd(track)}>
        <PlaylistAdd sx={{ color: "#b04aff", "&:hover": { color: "purple", cursor: "pointer" } }} />
      </PlayListButton>
      <PlayButton type="button" onClick={() => handlePlay(track)}>
        <PlayCircleFilledSharpIcon
          sx={{ color: "#b04aff", "&:hover": { color: "purple", cursor: "pointer" } }}
        />
      </PlayButton>
    </StyledPlayTrack>
  );
};

ProfilePlayTrack.propTypes = {
  handlePlayButton: PropTypes.func,
  track: PropTypes.exact({
    id: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    released_date: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string),
    liked_by: PropTypes.arrayOf(PropTypes.object),
    num_plays: PropTypes.number.isRequired,
    num_likes: PropTypes.number.isRequired,
    thumbnails: PropTypes.exact({
      url_default: PropTypes.string,
      url_medium: PropTypes.string,
      url_large: PropTypes.string,
    }),
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }),
};

ProfilePlayTrack.defaultProps = {
  handlePlayButton: null,
  track: {
    id: null,
    user: {},
    title: null,
    color: null,
    url: null,
    duration: null,
    released_date: null,
    genres: [],
    liked_by: [],
    num_plays: null,
    num_likes: null,
    thumbnails: {
      url_default: null,
      url_medium: null,
      url_large: null,
    },
    created_at: null,
    updated_at: null,
  },
};

export default ProfilePlayTrack;
