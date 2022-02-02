import React, { useState } from "react";

import { useAlbums } from "../../../hooks/useAlbums";

import AlbumDetail from "../../molecules/AlbumDetail";

export default function Albums() {
  const albums = useAlbums();

  console.log(albums)

  const [selectedAlbum, setSelectedAlbum] = useState(null);

  return (
    <ul>
      {albums?.data?.data?.map((album) => (
        <li key={album?.id}>
          <button type="button" onClick={() => setSelectedAlbum(album)}>
            <AlbumDetail album={album} />
          </button>
        </li>
      ))}
    </ul>
  );
}
