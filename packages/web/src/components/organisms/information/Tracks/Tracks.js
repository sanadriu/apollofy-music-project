import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient, useInfiniteQuery } from "react-query";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";

import { useInfiniteTracks } from "../../../../hooks/useTracks";

import TrackDetail from "../../../molecules/TrackDetail";
import Button from "../../../atoms/buttons/Button";
import { TracksList } from "../PopularTracks/PopularTracks";
import HomeSmallText from "../../../atoms/body/HomeSmallText";

const ExtendedTrackList = styled(TracksList)`
  width: 100%;
`;

const PageButtonsLayout = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export default function Tracks() {
  const { genreId } = useParams();

  const [selectedTrack, setSelectedTrack] = useState(null);

  const {
    data: tracks,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
    isLoading,
  } = useInfiniteTracks({ genreId });

  const tracksList = tracks?.data?.data;
  const maxTrackPage = tracks?.data?.pages;

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div>Error! {error.toString()}</div>;
  return (
    <ExtendedTrackList>
      {tracksList?.map((track) => (
        <TrackDetail key={track?.id} track={track} handlePlayButton={setSelectedTrack} />
      ))}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {tracks.pages.map((pageData) => {
          return pageData.data.data.map((track) => {
            return (
              <TrackDetail key={track?.id} track={track} handlePlayButton={setSelectedTrack} />
            );
          });
        })}
      </InfiniteScroll>
    </ExtendedTrackList>
  );
}
