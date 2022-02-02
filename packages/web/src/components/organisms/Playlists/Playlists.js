import React, { useState } from "react";

import { usePlaylists } from "../../../hooks/usePlaylists";

import PlaylistDetail from "../../molecules/PlaylistDetail";

export default function Playlists() {
  const { data: playlists } = usePlaylists();

  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  return (
    <ul>
      {playlists?.data?.data?.map((playlist) => (
        <li key={playlist?.id}>
          <button type="button" onClick={() => setSelectedPlaylist(playlist)}>
            <PlaylistDetail playlist={playlist} />
          </button>
        </li>
      ))}
    </ul>
  );
}
