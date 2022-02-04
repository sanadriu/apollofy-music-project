import { useQuery, useQueryClient } from "react-query";

import { queryKeys } from "../queries/constants";
import albumsApi from "../api/api-albums";

export function useAlbums() {
  const query = useQuery(queryKeys.albums, () => albumsApi.getAlbums(), {
    staleTime: 600000, // 10 minutes
    cacheTime: 900000, // 15 minutes (doesn't make sense for staleTime to exceed cacheTime)
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return query;
}

export function useFetchAlbum(id) {
  const query = useQuery(queryKeys.albums, () => albumsApi.getAlbum(id), {
    staleTime: 600000, // 10 minutes
    cacheTime: 900000, // 15 minutes (doesn't make sense for staleTime to exceed cacheTime)
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return query;
}

export function usePrefetchAlbums() {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(queryKeys.albums, albumsApi.getAlbums);
}
