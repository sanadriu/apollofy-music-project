import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from 'react-query';

import playlistsApi from '../../../api/api-playlists';

import PlaylistDetail from "../../molecules/PlaylistDetail";

export default function Playlists() {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery(["playlists"], () => playlistsApi.getPlaylists())
  }, [queryClient])

  const { data: playlists, isError, error, isLoading } = useQuery(
    ["playlists"],
    () => playlistsApi.getPlaylists(),
    {
      staleTime: 10000,
      keepPreviousData: true,
    }
  );
  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return (
    <>
      <h3>Oops, something went wrong</h3>
      <p>{error}</p>
    </>
  )

  return (
    <ul>
      {playlists?.data?.data?.map((playlist) => (
        <li key={playlist?.id}>
          <button type="button" onClick={() => setSelectedPlaylist(playlist)}>
            <PlaylistDetail playlist={playlist} />
          </button>
        </li>
      ))}
    </ul>
  );
}
