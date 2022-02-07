import { useQuery, useQueryClient } from "react-query";

import { queryKeys } from "../queries/constants";
import playlistsApi from "../api/api-playlists";

export function usePlaylists(userId = undefined) {
  const fallback = [];
  const {
    data = fallback,
    isError,
    error,
    isLoading,
  } = useQuery([queryKeys.playlists,userId], () => playlistsApi.getPlaylists(10, 1,userId), {
    staleTime: 600000, // 10 minutes
    cacheTime: 900000, // 15 minutes (doesn't make sense for staleTime to exceed cacheTime)
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { data, isError, error, isLoading };
}

export function usePrefetchPlaylists(userId = undefined) {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(queryKeys.playlists, playlistsApi.getPlaylists(userId));
}
