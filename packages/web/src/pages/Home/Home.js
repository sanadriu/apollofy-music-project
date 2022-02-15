import React from "react";
import styled from "styled-components";

import withLayout from "../../components/hoc/withLayout";
import PlaylistCarousel from "../../components/organisms/information/PlaylistCarousel";
import PopularTracks from "../../components/organisms/information/PopularTracks";
import PopularGenres from "../../components/organisms/information/PopularGenres";

const TracksLayout = styled.div`
  display: flex;
  gap: 1rem;
  @media only screen and (max-width: ${({ theme }) => theme.media.desktop}) {
    flex-direction: column-reverse;
  }
`;

const Home = () => {
  return (
    <>
      <PlaylistCarousel />
      <TracksLayout>
        <PopularGenres />
        <PopularTracks />
      </TracksLayout>
    </>
  );
};

export default withLayout(Home);
