import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";

import { useInfiniteTracks } from "../../../../hooks/useTracks";

import TrackDetail from "../../../molecules/TrackDetail";
import { TracksList } from "../PopularTracks/PopularTracks";

const ExtendedTrackList = styled(TracksList)`
  width: 100%;
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

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div>Error! {error.toString()}</div>;
  return (
    <ExtendedTrackList>
      {tracksList?.map((track) => (
        <TrackDetail key={track?.id} track={track} handlePlayButton={setSelectedTrack} />
      ))}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {tracks.pages.map((pageData) => {
          return pageData?.data?.data?.map((track) => {
            return (
              <TrackDetail key={track?.id} track={track} handlePlayButton={setSelectedTrack} />
            );
          });
        })}
      </InfiniteScroll>
    </ExtendedTrackList>
  );
}
