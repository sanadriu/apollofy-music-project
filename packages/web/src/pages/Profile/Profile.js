import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import AddBoxIcon from "@mui/icons-material/AddBox";

import usersApi from "../../api/api-users";
import { useUserAlbums } from "../../hooks/useAlbums";
import { useUserPlaylists } from "../../hooks/usePlaylists";
import { useUserTracks } from "../../hooks/useTracks";
import withLayout from "../../components/hoc/withLayout";
import ProfileMain from "../../components/organisms/information/ProfileMain";
import ProfileUserCards from "../../components/organisms/information/ProfileUserCards";
import ProfileUserTracks from "../../components/organisms/information/ProfileUserTracks";
import ProfileGroupButtons from "../../components/molecules/ProfileGroupButtons";
import ButtonPlaySuffle from "../../components/atoms/buttons/ButtonPlayShuffle";
import AlbumModal from "../../components/organisms/modals/AlbumModal/AlbumModal";
import PlaylistModal from "../../components/organisms/modals/PlaylistModal";

const StyledProfile = styled.div`
  overflow: hidden;
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    padding: 0.5rem;
  }
`;

const StyledTitle = styled.div`
  display: flex;
  margin: 1rem 0;
  font-weight: bold;
  letter-spacing: 4px;
  font-style: oblique;
  font-variant: small-caps;
  font-size: larger;
  gap: 0.5em;
`;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [modal, setModal] = useState("");
  const [isOpen, setOpen] = useState("");

  const { profileId } = useParams();

  const { data: albums } = useUserAlbums(undefined, undefined, undefined, undefined, profileId);
  const albumsList = albums?.data?.data;

  const { data: playlists } = useUserPlaylists(profileId);
  const playlistsList = playlists?.data?.data;

  const { data: tracks } = useUserTracks(1, undefined, 5, "num_plays", "desc", profileId);
  const tracksList = tracks?.data?.data;

  const handleModal = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    (async () => {
      const { data } = await usersApi.getUser(profileId);
      setUser(data?.data);
    })();
  });

  return (
    <StyledProfile>
      <ProfileGroupButtons />
      <ProfileMain user={user} albums={albumsList?.length} tracks={tracksList?.length} />
      <ButtonPlaySuffle tracks={tracksList} />
      <StyledTitle>Most Listened</StyledTitle>
      <ProfileUserTracks />

      {albumsList?.length > 0 && (
        <>
          <StyledTitle>
            Albums{" "}
            <AddBoxIcon
              color="inherit"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setModal("albums");
                setOpen(true);
              }}
            />
          </StyledTitle>

          <ProfileUserCards data={albumsList} />
        </>
      )}
      {playlistsList?.length > 0 && (
        <>
          <StyledTitle>
            Playlists{" "}
            <AddBoxIcon
              color="inherit"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setModal("playlists");
                setOpen(true);
              }}
            />
          </StyledTitle>
          <ProfileUserCards data={playlistsList} />
        </>
      )}

      {isOpen && modal === "albums" && <AlbumModal isOpen={isOpen} handleModal={handleModal} />}
      {isOpen && modal === "playlists" && (
        <PlaylistModal isOpen={isOpen} handleModal={handleModal} />
      )}
    </StyledProfile>
  );
};

export default withLayout(Profile);
