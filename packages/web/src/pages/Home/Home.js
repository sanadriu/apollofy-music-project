import React from "react";
import styled from "styled-components";

import withLayout from "../../components/hoc/withLayout";

import SearchBar from "../../components/molecules/SearchBar/SearchBar";
import PlaylistCarousel from "../../components/organisms/PlaylistCarousel";
import PopularTracks from "../../components/organisms/PopularTracks";
import PopularGenres from "../../components/organisms/PopularGenres";

const TracksLayout = styled.div`
  display: flex;
  gap: 1rem;

  @media only screen and (max-width: 600px) {
    flex-direction: column-reverse;
  }
`;

const Home = () => {

  return (
    <>
      <SearchBar />
      <PlaylistCarousel />
      <TracksLayout>
        <PopularTracks />
        <PopularGenres />
      </TracksLayout>
    </>
  );
};

export default withLayout(Home);
