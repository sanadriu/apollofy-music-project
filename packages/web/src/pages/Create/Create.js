import Album from "@mui/icons-material/Album";
import MusicNote from "@mui/icons-material/MusicNote";
import React, { useState } from "react";
import Button from "../../components/atoms/buttons/Button";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import styled from "styled-components";

import withLayout from "../../components/hoc/withLayout";

import TrackCreateForm from "../../components/organisms/forms/TrackForm/TrackCreateForm";
import AlbumCreateForm from "../../components/organisms/forms/AlbumForm/AlbumCreateForm";
import CreatePlaylistForm from "../../components/organisms/forms/CreatePlaylistForm/CreatePlaylistForm";

const NavBar = styled.nav`
  display: flex;
  justify-content: space-evenly;
  margin: 1rem;
`;

function CreatePage() {
  const [form, setForm] = useState("newTrack");

  return (
    <>
      <NavBar>
        <Button
          labelColor={({ theme }) => theme.color.text}
          onClick={() => {
            setForm("newTrack");
          }}
        >
          <MusicNote />
          Create New Track
        </Button>
        <Button
          labelColor={({ theme }) => theme.color.text}
          onClick={() => {
            setForm("newAlbum");
          }}
        >
          <Album />
          Create New Album
        </Button>
        <Button
          labelColor={({ theme }) => theme.color.text}
          onClick={() => {
            setForm("newPlaylist");
          }}
        >
          <PlaylistAddIcon />
          Create New Playlist
        </Button>
      </NavBar>
      {form === "newTrack" && <TrackCreateForm />}
      {form === "newAlbum" && <AlbumCreateForm />}
      {form === "newPlaylist" && <CreatePlaylistForm />}
    </>
  );
}

export default withLayout(CreatePage);
