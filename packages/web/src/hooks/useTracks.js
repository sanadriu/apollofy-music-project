import { useQuery, useQueryClient } from "react-query";

import { queryKeys } from "../queries/constants";
import tracksApi from "../api/api-tracks";

export function useTracks({ currentLimit, currentPage }) {
  const fallback = [];
  const {
    data = fallback,
    isError,
    error,
    isLoading,
  } = useQuery(["tracks", currentPage], () => tracksApi.getTracks(currentLimit, currentPage), {
    staleTime: 600000, // 10 minutes
    cacheTime: 900000, // 15 minutes (doesn't make sense for staleTime to exceed cacheTime)
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { data, isError, error, isLoading };
}

export function usePrefetchTracks() {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(queryKeys.tracks, tracksApi.getTracks);
}
