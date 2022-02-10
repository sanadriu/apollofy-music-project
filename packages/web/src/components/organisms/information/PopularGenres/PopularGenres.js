import React from "react";
import styled from "styled-components";

import { useGenres } from "../../../hooks/useGenres";
import GenreDetail from "../../molecules/GenreDetail";
import SmallText from "../../atoms/SmallText";
import { SectionLayout } from "../PopularTracks/PopularTracks";

const GenresList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;

  @media only screen and (max-width: 600px) {
    padding: 2rem;
  }
`;

const GenresText = styled(SmallText)`
  @media only screen and (max-width: 600px) {
    margin: auto;
  }
`;

export default function PopularGenres() {
  const { data: genres } = useGenres();
  return (
    <SectionLayout>
      <GenresText>Popular Genres</GenresText>
      <GenresList>
        {genres?.data?.data?.map((genre) => (
          <GenreDetail key={genre.id} genre={genre} />
        ))}
      </GenresList>
    </SectionLayout>
  );
}
