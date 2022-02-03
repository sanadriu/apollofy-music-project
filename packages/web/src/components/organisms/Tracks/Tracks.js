import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from 'react-query';

import tracksApi from '../../../api/api-tracks';
import { useTracks } from "../../../hooks/useTracks";

import TrackDetail from "../../molecules/TrackDetail";

const currentLimit = 10;

export default function Tracks() {
  const params = useParams();
  const selectedGenre = params ? params.genre : '';

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [currentGenre, setSelectedGenre] = useState(selectedGenre);

  const queryClient = useQueryClient();
  const { data: tracks, isError, error, isLoading } = useTracks(currentLimit, currentPage, currentGenre);

  const maxTrackPage = tracks?.data?.pages;

  useEffect(() => {
    if (currentPage < maxTrackPage) {
      const nextPage = currentPage + 1;
      const nextGenre = (!currentGenre) ? '' : currentGenre;
      queryClient.prefetchQuery(
        ["tracks", nextPage, nextGenre],
        () => tracksApi.getTracks(currentLimit, nextPage, currentGenre)
      )
    }
  }, [currentPage, currentGenre, queryClient])

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return (
    <>
      <h3>Oops, something went wrong</h3>
      <p>{error}</p>
    </>
  )

  return (
    <>
      <ul>
        {tracks?.data?.data?.map((track) => (
          <li key={track?.id}>
            <button type="button" onClick={() => setSelectedTrack(track)}>
              {track?.title}
            </button>
          </li>
        ))}
      </ul>
      <div className="pages">
        <button type="button" disabled={currentPage <= 1} onClick={() => {
          setCurrentPage((prevValue) => prevValue - 1)
        }}>
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button type="button" disabled={currentPage >= maxTrackPage} onClick={() => {
          setCurrentPage((prevValue) => prevValue + 1)
        }}>
          Next page
        </button>
      </div>
      <hr />
      {selectedTrack && <TrackDetail track={selectedTrack} />}
    </>
  );
}
