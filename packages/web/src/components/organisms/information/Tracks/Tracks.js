import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient, useInfiniteQuery } from "react-query";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";

import tracksApi from "../../../../api/api-tracks";
import { useTracks, usePrefetchTracks, useInfiniteTracks } from "../../../../hooks/useTracks";

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
  const params = useParams();
  const selectedGenre = params ? params.genre : undefined;

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [currentGenre, setSelectedGenre] = useState(selectedGenre);

  const queryClient = useQueryClient();
  // const { data: tracks, isError, error, isLoading } = useTracks(currentPage, currentGenre);
  const {
    data: tracks,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
    isLoading,
  } = useInfiniteTracks(currentPage, currentGenre);

  const tracksList = tracks?.data?.data;
  const maxTrackPage = tracks?.data?.pages;

  // const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError, error } = useInfiniteQuery(
  //   "sw-people",
  //   ({ pageParam = initialUrl }) => fetchUrl(pageParam),
  //   {
  //     getNextPageParam: (lastPage) => lastPage.next || undefined,
  //   }
  // );

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div>Error! {error.toString()}</div>;
  return (
    <ExtendedTrackList>
      {/* {tracksList.map((track) => (
        <TrackDetail key={track?.id} track={track} handlePlayButton={setSelectedTrack} />
      ))} */}
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
