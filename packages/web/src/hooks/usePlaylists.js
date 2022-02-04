import { useQuery, useQueryClient } from "react-query";

import { queryKeys } from "../queries/constants";
import playlistsApi from "../api/api-playlists";

export function usePlaylists() {
  const query = useQuery(queryKeys.playlists, () => playlistsApi.getPlaylists(), {
    staleTime: 600000, // 10 minutes
    cacheTime: 900000, // 15 minutes (doesn't make sense for staleTime to exceed cacheTime)
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return query;
}

export function usePrefetchPlaylists() {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(queryKeys.playlists, playlistsApi.getPlaylists);
}
