import React, { useState } from "react";

import { useGenres } from "../../../hooks/useGenres";

import GenreDetail from "../../molecules/GenreDetail";

export default function Genres() {
  const genres = useGenres();

  const [selectedGenre, setSelectedGenre] = useState(null);

  return (
    <ul>
      {genres?.data?.data?.map((genre) => (
        <li key={genre?.id}>
          <button type="button" onClick={() => setSelectedGenre(genre)}>
            <GenreDetail genre={genre} />
          </button>
        </li>
      ))}
    </ul>
  );
}
