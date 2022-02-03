import React, { useState } from "react";
import styled from "styled-components";

import { SmallText } from "../../atoms/SmallText/SmallText";
import { useTracks } from "../../../hooks/useTracks";
import TrackDetail from "../../molecules/TrackDetail/TrackDetail";

const Layout = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
`;

const TracksList = styled(Layout)`
  margin-top: 0;
  background-color: lightgray;
  border-radius: 1.3rem;
  padding: 1rem;
  width: 30rem;
  gap: 1rem;
`;

const maxTrackPage = 10;
const currentLimit = 10;

export default function PopularTracks() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: tracks, isError, error, isLoading } = useTracks({ currentLimit, currentPage });

  return (
    <Layout>
      <SmallText>Popular Tracks</SmallText>
      <TracksList>
        {tracks?.data?.data?.map((track) => (
          <TrackDetail key={track.id} track={track} />
        ))}
      </TracksList>
    </Layout>
  );
}
