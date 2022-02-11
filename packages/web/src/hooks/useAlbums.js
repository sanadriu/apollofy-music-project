import { useMutation, useQuery, useQueryClient } from "react-query";

import { queryKeys } from "../queries/constants";
import albumsApi from "../api/api-albums";
import * as authService from "../services/auth";

export function useAlbums(currentPage = 1, currentLimit = 10, sort = undefined, order = 'desc') {
  const fallback = [];
  const { data = fallback, isError, error, isLoading, isSuccess } = useQuery(
    [queryKeys.albums, currentLimit, currentPage],
    () => albumsApi.getAlbums(currentLimit, currentPage),
    {
      staleTime: 600000, // 10 minutes
      cacheTime: 900000, // 15 minutes (doesn't make sense for staleTime to exceed cacheTime)
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );

  return { data, isError, error, isLoading, isSuccess };
}

export function useUserAlbums(currentPage = 1, currentLimit = 10, sort = undefined, order = 'desc', userId = undefined) {
  const fallback = [];
  const { data = fallback, isError, error, isLoading, isSuccess } = useQuery(
    [queryKeys.albums, currentPage, userId],
    () => albumsApi.getAlbums(currentLimit, currentPage, userId),
    {
      staleTime: 600000, // 10 minutes
      cacheTime: 900000, // 15 minutes (doesn't make sense for staleTime to exceed cacheTime)
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );

  return { data, isError, error, isLoading, isSuccess };
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

    if (authToken) return albumsApi.deleteAlbum(authToken, id);

    return Promise.reject(new Error("User authentication required"));
  });

  return mutation;
}

export function useMyAlbums({ page, sort, order, limit, extend }) {
  const query = useQuery(
    ["my-albums", page, sort, order, limit, extend],
    async () => {
      const authToken = await authService.getCurrentUserToken();

      if (authToken) return albumsApi.getMyAlbums(authToken, { page, sort, order, limit, extend });

      return Promise.reject(new Error("User authentication required"));
    },
    {
      staleTime: 600000, // 10 minutes
      cacheTime: 900000, // 15 minutes (doesn't make sense for staleTime to exceed cacheTime)
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );

  return query;
}
