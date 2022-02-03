import { useQuery, useQueryClient } from 'react-query';

import { queryKeys } from '../queries/constants';
import tracksApi from '../api/api-tracks';

export function useTracks(currentLimit = 10, currentPage = 1, currentGenre = '') {
  const fallback = [];
  const { data = fallback, isError, error, isLoading } = useQuery(
    ["tracks", currentPage, currentGenre],
    () => tracksApi.getTracks(currentLimit, currentPage, currentGenre),
    {
      staleTime: 600000, // 10 minutes
      cacheTime: 900000, // 15 minutes (doesn't make sense for staleTime to exceed cacheTime)
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  return { data, isError, error, isLoading };
}

export function usePrefetchTracks(currentLimit = 10, nextPage, currentGenre = '') {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(
    ["tracks", nextPage, currentGenre],
    () => tracksApi.getTracks(currentLimit, nextPage, currentGenre)
  )
  // queryClient.prefetchQuery(queryKeys.tracks, () => tracksApi.getTracks(currentLimit, currentPage, currentGenre));
}
