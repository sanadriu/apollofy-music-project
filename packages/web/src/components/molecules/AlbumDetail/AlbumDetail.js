import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

import HomeSmallText from "../../atoms/body/HomeSmallText";
import DetailText from "../../atoms/body/DetailText";
import ProfilePlayTrack from "../../atoms/ProfilePlayTrack";

const AlbumLayout = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.3rem;
  border-radius: 1.3rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.secondary_hover};
  }
`;

const AlbumPicture = styled.img`
  max-width: 3rem;
  max-height: 3rem;
  margin: 0;
  border-radius: 0.3rem;
`;

const AlbumFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-left: 0.5rem;
  flex-grow: 1;
`;

const AlbumLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: ${({ theme }) => theme.colors.label};
  }
`;

const StyledNumAlbum = styled.div`
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

const AlbumDetail = ({ album }) => {
  console.log(album);
  return (
    <AlbumLayout>
      <AlbumPicture alt="Album's Thumbnail" src={album?.thumbnails?.url_default} />
      <AlbumFlex>
        <AlbumLink to={`/albums/${album.id}`}>
          <HomeSmallText>{album?.title}</HomeSmallText>
        </AlbumLink>
        <AlbumLink to={`/users/${album?.user?.id}`}>
          <DetailText>{album?.user?.username}</DetailText>
        </AlbumLink>
      </AlbumFlex>
      <StyledNumAlbum>
        <HeadphonesIcon sx={{ color: "purple" }} />
        <StyledNumber>{album?.num_tracks}</StyledNumber>
      </StyledNumAlbum>
      {/* <ProfilePlayTrack album={album} handlePlayButton={handlePlayButton} /> */}
    </AlbumLayout>
  );
};

export default AlbumDetail;

AlbumDetail.propTypes = {
  album: PropTypes.exact({
    id: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    released_date: PropTypes.string.isRequired,
    tracks: PropTypes.arrayOf(PropTypes.object),
    num_tracks: PropTypes.number.isRequired,
    num_likes: PropTypes.number.isRequired,
    liked_by: PropTypes.arrayOf(PropTypes.object),
    thumbnails: PropTypes.exact({
      url_default: PropTypes.string,
      url_medium: PropTypes.string,
      url_large: PropTypes.string,
    }),
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }),
};

AlbumDetail.defaultProps = {
  album: {
    id: null,
    user: {},
    title: null,
    released_date: null,
    tracks: [],
    num_tracks: null,
    num_likes: null,
    liked_by: [],
    thumbnails: {
      url_default: null,
      url_medium: null,
      url_large: null,
    },
    created_at: null,
    updated_at: null,
  },
};
