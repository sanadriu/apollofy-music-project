import { useMutation, useQuery, useInfiniteQuery, useQueryClient } from "react-query";

import albumsApi from "../api/api-albums";
import * as authService from "../services/auth";

const queryOptions = {
  staleTime: 600000,
  cacheTime: 900000,
  keepPreviousData: true,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
};

export function useFetchAlbum(albumId, { extend }) {
  const { data = {}, query } = useQuery(
    ["album", albumId, extend],
    () => albumsApi.getAlbum(albumId, { extend }),
    queryOptions,
  );

  return { ...query, data };
}

export function useFetchAlbums({ page, limit, sort, order, genre, track, userId }) {
  const { data = [], ...query } = useQuery(
    ["albums", page, limit, order, sort, genre, userId],
    () => albumsApi.getAlbums(page, limit, sort, order, genre, track, userId),
    queryOptions,
  );

  return { ...query, data };
}

export function useInfiniteAlbums({ limit, sort, order, genre, track, userId }) {
  const { data = [], ...query } = useInfiniteQuery(
    ["infinite-albums", limit, order, sort, genre, userId],
    ({ pageParam: page = 1 }) =>
      albumsApi.getAlbums({ page, limit, order, sort, genre, track, userId }),
    {
      getNextPageParam: (lastPage) =>
        lastPage.data.page < lastPage.data.pages ? lastPage.data.page + 1 : undefined,
    },
  );

  return { ...query, data };
}

export function useFetchUserAlbums({ page, sort, order, limit, extend }) {
  const { data = [], ...query } = useQuery(
    ["user-albums", page, sort, order, limit, extend],
    async () => {
      const authToken = await authService.getCurrentUserToken();

      if (authToken)
        return albumsApi.getUserAlbums(authToken, { page, sort, order, limit, extend });

      return Promise.reject(new Error("User authentication required"));
    },
    queryOptions,
  );

  return { ...query, data };
}

export async function usePrefetchAlbums({ page, limit, sort, order, genre, userId }) {
  const queryClient = useQueryClient();

  await queryClient.prefetchQuery(["albums", page, limit, sort, order, genre, userId], () =>
    albumsApi.getAlbums({ page, limit, order, sort, genre, userId }),
  );
}

export function useCreateAlbum() {
  const createAlbum = useMutation(async (album) => {
    const authToken = await authService.getCurrentUserToken();

    if (authToken) return albumsApi.createAlbum(authToken, album);

    return Promise.reject(new Error("User authentication required"));
  });

  return createAlbum;
}

export function useUpdateAlbum() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (album) => {
      const authToken = await authService.getCurrentUserToken();

      if (authToken) return albumsApi.updateAlbum(authToken, album);

      return Promise.reject(new Error("User authentication required"));
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["album", "albums", "infinite-albums", "user-albums"]);
      },
    },
  );

  return mutation;
}

export function useDeleteAlbum() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (albumId) => {
      const authToken = await authService.getCurrentUserToken();

      if (authToken) return albumsApi.deleteAlbum(authToken, albumId);

      return Promise.reject(new Error("User authentication required"));
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["album", "albums", "infinite-albums", "user-albums"]);
      },
    },
  );

  return mutation;
}

export function useLikeAlbum() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (albumId) => {
      const authToken = await authService.getCurrentUserToken();

      if (authToken) return albumsApi.likeAlbum(authToken, albumId);

      return Promise.reject(new Error("User authentication required"));
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["album", "albums", "infinite-albums", "user-albums"]);
      },
    },
  );

  return mutation;
}
