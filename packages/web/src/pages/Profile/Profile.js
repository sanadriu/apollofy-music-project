import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import usersApi from "../api/api-users";
import { useUserAlbums } from "../../hooks/useAlbums";
import { useUserPlaylists } from "../../hooks/usePlaylists";
import { useUserTracks } from "../../hooks/useTracks";
import withLayout from "../../components/hoc/withLayout";
import ProfileMain from "../../components/organisms/information/ProfileMain";
import ProfileUserCards from "../../components/organisms/information/ProfileUserCards";
import ProfileUserTracks from "../../components/organisms/information/ProfileUserTracks";
import ProfileGroupButtons from "../../components/molecules/ProfileGroupButtons";
import ButtonPlaySuffle from "../../components/atoms/ButtonPlayShuffle";

const StyledProfile = styled.div`
  overflow: hidden;
  @media only screen and (max-width: 1000px) {
    padding-right: 2rem;
  }
`;

const StyledTitle = styled.div`
  margin: 1rem 0;
  font-weight: bold;
  letter-spacing: 4px;
  font-style: oblique;
  font-variant: small-caps;
`;

const Profile = () => {
  const [user, setUser] = useState(null);
  const { profileId } = useParams();

  const { data: albums } = useUserAlbums(undefined, undefined, undefined, undefined, profileId);
  const albumsList = albums?.data?.data;

  const { data: playlists } = useUserPlaylists(profileId);
  const playlistsList = playlists?.data?.data;

  const { data: tracks } = useUserTracks(1, undefined, 5, "num_plays", "desc", profileId);
  const tracksList = tracks?.data?.data;

  useEffect(() => {
    (async () => {
      const { data } = await usersApi.getUser(profileId);
      // const { data } = await axios.get(`http://localhost:4000/users/${profileId}`);
      setUser(data.data);
    })();
  }, [profileId]);

  return (
    <StyledProfile>
      <ProfileGroupButtons />
      <ProfileMain user={user} albums={albumsList.length} tracks={tracksList.length} />
      <ButtonPlaySuffle />
      <StyledTitle>Most Listened</StyledTitle>
      <ProfileUserTracks />
      <StyledTitle>Albums</StyledTitle>
      <ProfileUserCards data={albumsList} />
      <StyledTitle>Playlists</StyledTitle>
      <ProfileUserCards data={playlistsList} />
    </StyledProfile>
  );
};

export default withLayout(Profile);
