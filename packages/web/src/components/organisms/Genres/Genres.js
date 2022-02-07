import React from "react";
import { useNavigate } from 'react-router-dom';

import { useGenres } from "../../../hooks/useGenres";

import GenreDetail from "../../molecules/GenreDetail";

export default function Genres() {
  const { data: genres } = useGenres();
  const navigate = useNavigate();

  const handleClick = (genre) => {
    navigate(`/tracks/${genre.name}`);
  }

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
