import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { useFetchAlbums } from "../../hooks/useAlbums";
import { useFetchPlaylists } from "../../hooks/usePlaylists";
import { useFetchTracks } from "../../hooks/useTracks";
import { useFetchUser } from "../../hooks/useUsers";
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
  const [modal, setModal] = useState("");
  const [isOpen, setOpen] = useState("");

  const { profileId } = useParams();

  const { data: user } = useFetchUser(profileId);
  const { data: albums } = useFetchAlbums({ userId: profileId });
  const { data: playlists } = useFetchPlaylists({ userId: profileId });
  const { data: tracks } = useFetchTracks({
    userId: profileId,
    limit: 5,
    sort: "num_plays",
    order: "desc",
  });

  const handleModal = () => {
    setOpen(!isOpen);
  };

  return (
    <StyledProfile>
      <ProfileGroupButtons />
      <ProfileMain
        user={user?.data?.data}
        albums={albums?.data?.count}
        tracks={tracks?.data?.count}
      />
      <ButtonPlaySuffle />
      <StyledTitle>Most Listened</StyledTitle>
      <ProfileUserTracks data={tracks?.data?.data} />
      <StyledTitle>
        Albums
        <AddBoxIcon
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            setModal("albums");
            setOpen(true);
          }}
        />
      </StyledTitle>
      <ProfileUserCards data={albums?.data?.data} />
      <StyledTitle>
        Playlists
        <AddBoxIcon
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            setModal("playlists");
            setOpen(true);
          }}
        />
      </StyledTitle>
      <ProfileUserCards data={playlists?.data?.data} />
      {isOpen && modal === "albums" && <AlbumModal isOpen={isOpen} handleModal={handleModal} />}
      {
        isOpen && modal === "playlists" && (
          <PlaylistModal isOpen={isOpen} handleModal={handleModal} />
        )
      }
    </StyledProfile>
  );
};

export default withLayout(Profile);
