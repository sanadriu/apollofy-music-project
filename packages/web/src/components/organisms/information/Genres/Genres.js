import React from "react";
import { useNavigate } from "react-router-dom";

import { useFetchGenres } from "../../../../hooks/useGenres";

import GenreDetail from "../../../molecules/GenreDetail";

export default function Genres() {
  const { data: genres } = useFetchGenres();
  const navigate = useNavigate();

  const handleClick = (genre) => {
    navigate(`/tracks/${genre.id}`);
  };

  return (
    <ul>
      {genres?.data?.data?.map((genre) => (
        <li key={genre?.id}>
          <button type="button" onClick={() => handleClick(genre)}>
            <GenreDetail genre={genre} />
          </button>
        </li>
      ))}
    </ul>
  );
}
