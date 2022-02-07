import { useQuery, useQueryClient } from "react-query";

import { queryKeys } from "../queries/constants";
import albumsApi from "../api/api-albums";

export function useAlbums(userId = undefined) {
  const fallback = [];
  const { data = fallback } = useQuery(
    [queryKeys.albums, userId], 
    () => albumsApi.getAlbums(10, 1, userId),
     {
    staleTime: 600000, // 10 minutes
    cacheTime: 900000, // 15 minutes (doesn't make sense for staleTime to exceed cacheTime)
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  }
  );
  return data;
}

export function usePrefetchAlbums(userId = undefined) {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(queryKeys.albums, albumsApi.getAlbums(userId));
}
