import React from "react";
import styled from "styled-components";
import ButtonPlaySuffle from "../../components/atoms/ButtonPlayShuffle/ButtonPlayShuffle";
import withLayout from "../../components/hoc/withLayout";
import ProfileGroupButtons from "../../components/molecules/ProfileGroupButtons/ProfileGroupButtons";
import ProfileMain from "../../components/organisms/ProfileMain/ProfileMain";
import ProfileUserCards from "../../components/organisms/ProfileUserCards/ProfileUserCards";
import ProfileUserTracks from "../../components/organisms/ProfileUserTracks/ProfileUserTracks";

const StyledProfilePage = styled.div`
  max-width: 900px;
  overflow: hidden;
`;

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
    <StyledProfilePage>
      <ProfileGroupButtons />
      <ProfileMain />
      <StyledMostListened>Most Listened</StyledMostListened>
      <ProfileUserTracks />
      <ButtonPlaySuffle />
      <StyledAlbums>Albums</StyledAlbums>
      <ProfileUserCards data={[]} />
      <StyledPlaylists>Playlists</StyledPlaylists>
      <ProfileUserCards data={[]} />
    </StyledProfilePage>
  );
};

export default withLayout(ProfilePage);
