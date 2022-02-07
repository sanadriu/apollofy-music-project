import { useQuery, useQueryClient } from "react-query";

import { queryKeys } from "../queries/constants";
import albumsApi from "../api/api-albums";
import * as authService from "../services/auth";

export function useAlbums() {
  const query = useQuery(
    ["albums", currentLimit, currentPage],
    () => albumsApi.getAlbums(currentLimit, currentPage),
    {
      staleTime: 600000, // 10 minutes
      cacheTime: 900000, // 15 minutes (doesn't make sense for staleTime to exceed cacheTime)
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );

  return query;
}

export function usePrefetchAlbums() {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(queryKeys.albums, albumsApi.getAlbums);
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

export function useSetAlbum() {
  const mutation = useMutation((data) => {
    const authToken = authService.getCurrentUserToken();

    if (authToken) return albumsApi.setAlbum(authToken, data);

    return Promise.reject(new Error("User authentication required"));
  });

  return mutation;
}

export function useUpdateAlbum() {
  const mutation = useMutation((id, data) => {
    const authToken = authService.getCurrentUserToken();

    if (authToken) return albumsApi.updateAlbum(authToken, id, data);

    return Promise.reject(new Error("User authentication required"));
  });

  return mutation;
}

export function useDeleteAlbum() {
  const mutation = useMutation((id) => {
    const authToken = authService.getCurrentUserToken();

    if (authToken) return albumsApi.updateAlbum(authToken, id);

    return Promise.reject(new Error("User authentication required"));
  });

  return mutation;
}
