import React, { useState, useEffect } from "react";
import { useQueryClient } from "react-query";

import tracksApi from "../../../api/api-tracks";
import { useTracks } from "../../../hooks/useTracks";

import TrackDetail from "../../molecules/TrackDetail";

const maxTrackPage = 10;
const currentLimit = 10;

export default function Tracks() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState(null);

  const queryClient = useQueryClient();
  const { data: tracks, isError, error, isLoading } = useTracks({ currentLimit, currentPage });

  useEffect(() => {
    if (currentPage < maxTrackPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["tracks", nextPage], () =>
        tracksApi.getTracks(currentLimit, nextPage),
      );
    }
  }, [currentPage, queryClient]);

  console.log(tracks);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError)
    return (
      <>
        <h3>Oops, something went wrong</h3>
        <p>{error}</p>
      </>
    );

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
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage((prevValue) => prevValue - 1);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          type="button"
          disabled={currentPage >= maxTrackPage}
          onClick={() => {
            setCurrentPage((prevValue) => prevValue + 1);
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedTrack && <TrackDetail track={selectedTrack} />}
    </>
  );
}
