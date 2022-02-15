/* eslint-disable no-new */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorderSharp";
import PlayCircleFilledSharpIcon from "@mui/icons-material/PlayCircleFilledSharp";
import { PlayerInterface, Track } from "react-material-music-player";
import PlaylistAdd from "@mui/icons-material/PlaylistAdd";
import { Button } from "@mui/material";

import { addTrack, playTrack } from "../../../../store/tracks";
import { authSelector } from "../../../../store/auth";
import { useLikeTrack } from "../../../../hooks/useTracks";

const StyledPlayTrack = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  margin-left: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.8rem;
  gap: 0.5rem;
`;

const CustomButton = styled(Button)`
  border: none;
  background-color: transparent;
  min-width: auto;
  &:hover {
    background-color: transparent;
  }
`;

const StyledFavoriteIcon = styled(FavoriteIcon)`
  cursor: pointer;
`;

const StyledFavoriteBorderIcon = styled(FavoriteBorderIcon)`
  cursor: pointer;
`;

const ProfilePlayTrack = ({ track, handlePlayButton }) => {
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);

  const { mutate: likeTrack } = useLikeTrack();

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

  const handleFavoriteTrack = (track) => {
    try {
      likeTrack(track.id);
    } catch (error) {
      console.log(error);
    }

    likeTrack(track.id);
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

  console.log("pito");

  return (
    <StyledPlayTrack>
      {track?.liked_by.findIndex((user) => user.id === auth.currentUser.id) === -1 ? (
        <CustomButton type="button" onClick={() => handleFavoriteTrack(track)}>
          <StyledFavoriteBorderIcon sx={{ color: "purple" }} />
        </CustomButton>
      ) : (
        <CustomButton type="button" onClick={() => handleFavoriteTrack(track)}>
          <StyledFavoriteIcon sx={{ color: "purple" }} />
        </CustomButton>
      )}
      <CustomButton type="button" onClick={() => handleAdd(track)}>
        <PlaylistAdd sx={{ color: "#b04aff", "&:hover": { color: "purple", cursor: "pointer" } }} />
      </CustomButton>
      <CustomButton type="button" onClick={() => handlePlay(track)}>
        <PlayCircleFilledSharpIcon
          sx={{ color: "#b04aff", "&:hover": { color: "purple", cursor: "pointer" } }}
        />
      </CustomButton>
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
