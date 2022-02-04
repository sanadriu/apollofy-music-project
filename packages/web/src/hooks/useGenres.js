import { useQuery, useQueryClient } from "react-query";

import { queryKeys } from "../queries/constants";
import genresApi from "../api/api-genres";

export function useGenres() {
  const query = useQuery(queryKeys.genres, () => genresApi.getGenres(), {
    staleTime: 600000, // 10 minutes
    cacheTime: 900000, // 15 minutes (doesn't make sense for staleTime to exceed cacheTime)
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return query;
}

export function usePrefetchGenres() {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(queryKeys.genres, genresApi.getGenres);
}
