import React from "react";
import styled from "styled-components";

import withLayout from "../../components/hoc/withLayout";

import SearchBar from "../../components/molecules/SearchBar";
import PlaylistCarousel from "../../components/organisms/information/PlaylistCarousel";
import PopularTracks from "../../components/organisms/information/PopularTracks";
import PopularGenres from "../../components/organisms/information/PopularGenres";

const TracksLayout = styled.div`
  display: flex;
  gap: 1rem;

  @media only screen and (max-width: ${({ theme }) => theme.media.mobile}) {
      flex-direction: column-reverse;
    }
`;

const Home = () => {

  return (
    <>
      {/* <SearchBar /> */}
      <PlaylistCarousel />
      <TracksLayout>
        <PopularTracks />
        <PopularGenres />
      </TracksLayout>
    </>
  );
};

export default withLayout(Home);
