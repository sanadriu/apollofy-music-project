import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";

import HomeSmallText from "../../atoms/HomeSmallText";
import DetailText from "../../atoms/DetailText";
import ProfilePlayTrack from "../../atoms/ProfilePlayTrack";
import LibraryMusic from "@mui/icons-material/LibraryMusic";

const PlaylistLayout = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.3rem;
  border-radius: 1.3rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.secondary_hover};
  }
`;

const PlaylistPicture = styled.img`
  max-width: 3rem;
  max-height: 3rem;
  margin: 0;
  border-radius: 0.3rem;
`;

const PlaylistFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-left: 0.5rem;
  flex-grow: 1;
`;

const PlaylistLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: ${({ theme }) => theme.colors.label};
  }
`;

const StyledNumPlaylist = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  margin-left: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  width: 20%;

  @media only screen and (max-width: ${({ theme }) => theme.media.mobile}) {
    display: none;
  }
`;

const StyledNumber = styled.div`
  padding-left: 0.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const PlaylistDetail = ({ playlist }) => {
  console.log(playlist);
  return (
    <PlaylistLayout>
      <PlaylistPicture alt="Playlist's Thumbnail" src={playlist?.thumbnails?.url_default} />
      <PlaylistFlex>
        <PlaylistLink to={`/playlists/${playlist.id}`}>
          <HomeSmallText>{playlist?.title}</HomeSmallText>
        </PlaylistLink>
        <PlaylistLink to={`/playlists/${playlist?.user?.id}`}>
          <DetailText>{playlist?.user?.username}</DetailText>
        </PlaylistLink>
      </PlaylistFlex>
      <StyledNumPlaylist>
        <PersonIcon sx={{ color: "purple" }} />
        <StyledNumber>{playlist?.num_followers}</StyledNumber>
      </StyledNumPlaylist>
      <StyledNumPlaylist>
        <LibraryMusic sx={{ color: "purple" }} />
        <StyledNumber>{playlist?.num_tracks}</StyledNumber>
      </StyledNumPlaylist>
      {/* <ProfilePlayTrack album={album} handlePlayButton={handlePlayButton} /> */}
    </PlaylistLayout>
  );
};

export default PlaylistDetail;

PlaylistDetail.propTypes = {
  playlist: PropTypes.exact({
    id: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    color: PropTypes.string,
    duration: PropTypes.number,
    tracks: PropTypes.arrayOf(PropTypes.object),
    num_tracks: PropTypes.number.isRequired,
    num_followers: PropTypes.number.isRequired,
    followed_by: PropTypes.arrayOf(PropTypes.object),
    thumbnails: PropTypes.exact({
      url_default: PropTypes.string,
      url_medium: PropTypes.string,
      url_large: PropTypes.string,
    }),
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }),
};

PlaylistDetail.defaultProps = {
  playlist: {
    id: null,
    user: {},
    title: null,
    description: null,
    color: null,
    tracks: [],
    num_tracks: null,
    num_followers: null,
    followed_by: [],
    thumbnails: {
      url_default: null,
      url_medium: null,
      url_large: null,
    },
    duration: 0,
    created_at: null,
    updated_at: null,
  },
};
