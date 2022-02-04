import { useQuery, useQueryClient } from "react-query";

import { queryKeys } from "../queries/constants";
import tracksApi from "../api/api-tracks";

export function useTracks(currentPage = 1, currentGenre = undefined, currentLimit = 10, sort = undefined, order = 'desc') {
  const fallback = [];
  const { data = fallback, isError, error, isLoading } = useQuery(
    [queryKeys.tracks, currentPage, currentGenre],
    () => tracksApi.getTracks(currentPage, currentGenre, currentLimit, sort, order),
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

export async function usePrefetchTracks(nextPage, currentGenre = undefined, currentLimit = 10, sort = undefined, order = 'desc') {
  const queryClient = useQueryClient();
  await queryClient.prefetchQuery(
    [queryKeys.tracks, nextPage, currentGenre],
    () => tracksApi.getTracks(nextPage, currentGenre, currentLimit, sort, order)
  )
}
