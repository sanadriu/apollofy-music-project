import React from "react";
import styled from "styled-components";
import { useGenres } from "../../../hooks/useGenres";

import { SmallText } from "../../atoms/SmallText/SmallText";
import GenreDetail from "../../molecules/GenreDetail/GenreDetail";
import { SectionLayout } from "../PopularTracks/PopularTracks";

const GenresList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;

export default function PopularGenres() {
  const { data: genres } = useGenres();
  return (
    <SectionLayout>
      <SmallText>Popular Genres</SmallText>
      <GenresList>
        {genres?.data?.map((genre) => (
          <GenreDetail key={genre.id} genre={genre} />
        ))}
      </GenresList>
    </SectionLayout>
  );
}
