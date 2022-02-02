import React from "react";
import styled from "styled-components";
import withLayout from "../../components/hoc/withLayout";
import ProfileGroupButtons from "../../components/molecules/ProfileGroupButtons/ProfileGroupButtons";
import ProfileMain from "../../components/organisms/ProfileMain/ProfileMain";
import ProfileUserAlbums from "../../components/organisms/ProfileUserAlbums/ProfileUserAlbums";
import ProfileUserTracks from "../../components/organisms/ProfileUserTracks/ProfileUserTracks";

const StyledMostListened = styled.div`
  margin-top: 1rem;
  font-weight: bold;
`;

const StyledAlbums = styled.div`
  margin: 1rem 0;
  font-weight: bold;
`;
const StyledPlaylists = styled.div`
  margin: 1rem 0;
  font-weight: bold;
`;

const ProfilePage = () => {
  return (
    <>
      <ProfileGroupButtons />
      <ProfileMain />
      <StyledMostListened>Most Listened</StyledMostListened>
      <ProfileUserTracks />
      <StyledAlbums>Albums</StyledAlbums>
      <ProfileUserAlbums />
      <StyledPlaylists>Playlists</StyledPlaylists>
    </>
  );
};

export default withLayout(ProfilePage);
