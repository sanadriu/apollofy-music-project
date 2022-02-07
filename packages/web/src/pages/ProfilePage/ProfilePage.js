import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ButtonPlaySuffle from "../../components/atoms/ButtonPlayShuffle/ButtonPlayShuffle";
import withLayout from "../../components/hoc/withLayout";
import ProfileGroupButtons from "../../components/molecules/ProfileGroupButtons/ProfileGroupButtons";
import ProfileMain from "../../components/organisms/ProfileMain/ProfileMain";
import ProfileUserCards from "../../components/organisms/ProfileUserCards/ProfileUserCards";
import ProfileUserTracks from "../../components/organisms/ProfileUserTracks/ProfileUserTracks";
import { useAlbums } from "../../hooks/useAlbums";
import { usePlaylists } from "../../hooks/usePlaylists";
import { useTracks } from "../../hooks/useTracks";

const StyledProfilePage = styled.div`
  //max-width: 900px;
  overflow: hidden;
  @media only screen and (max-width: 1000px) {
    padding-right: 2rem;
  }
`;

const StyledMostListened = styled.div`
  margin-top: 1rem;
  font-weight: bold;
  letter-spacing: 4px;
  font-style: oblique;
  font-variant: small-caps;
`;

const StyledAlbums = styled.div`
  margin: 1rem 0;
  font-weight: bold;
  letter-spacing: 4px;
  font-style: oblique;
  font-variant: small-caps;
`;
const StyledPlaylists = styled.div`
  margin: 1rem 0;
  font-weight: bold;
  letter-spacing: 4px;
  font-style: oblique;
  font-variant: small-caps;
`;

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { profileId } = useParams();

  const { data: albums } = useAlbums(profileId);
  const { data: playlists } = usePlaylists(profileId);
  const { data: tracks } = useTracks(1, undefined, 5, "num_plays", "desc", profileId);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`http://localhost:4000/users/${profileId}`);
      setUser(data.data);
    })();
  }, [profileId]);

  return (
    <StyledProfilePage>
      <ProfileGroupButtons />
      <ProfileMain user={user} albums={albums?.data?.length} tracks={tracks?.data?.data.length} />
      <ButtonPlaySuffle />
      <StyledMostListened>Most Listened</StyledMostListened>
      <ProfileUserTracks />
      <StyledAlbums>Albums</StyledAlbums>
      <ProfileUserCards data={albums?.data} />
      <StyledPlaylists>Playlists</StyledPlaylists>
      <ProfileUserCards data={playlists?.data?.data} />
    </StyledProfilePage>
  );
};

export default withLayout(ProfilePage);
