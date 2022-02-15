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

export function useFetchAlbum(albumId, params = {}) {
  const { extend } = params;
  const { data = {}, query } = useQuery(
    ["album", albumId, extend],
    () => albumsApi.getAlbum(albumId, { extend }),
    queryOptions,
  );

  return { ...query, data };
}

export function useFetchAlbums(params = {}) {
  const { page, limit, sort, order, genreId, trackId, userId } = params;
  const { data = [], ...query } = useQuery(
    ["albums", page, limit, order, sort, genreId, userId],
    () =>
      albumsApi.getAlbums({
        page,
        limit,
        sort,
        order,
        genre: genreId,
        track: trackId,
        user: userId,
      }),
    queryOptions,
  );

  return { ...query, data };
}

export function useInfiniteAlbums(params = {}) {
  const { limit, sort, order, genreId, trackId, userId } = params;
  const { data = [], ...query } = useInfiniteQuery(
    ["albums", limit, order, sort, genreId, userId],
    ({ pageParam: page = 1 }) =>
      albumsApi.getAlbums({
        page,
        limit,
        order,
        sort,
        genre: genreId,
        track: trackId,
        user: userId,
      }),
    {
      getNextPageParam: (lastPage) =>
        lastPage.data.page < lastPage.data.pages ? lastPage.data.page + 1 : undefined,
    },
  );

  return { ...query, data };
}

export function useFetchUserAlbums(params = {}) {
  const { page, sort, order, limit, extend } = params;
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

export async function usePrefetchAlbums(params = {}) {
  const { page, limit, sort, order, genreId, userId } = params;
  const queryClient = useQueryClient();

  await queryClient.prefetchQuery(["albums", page, limit, sort, order, genreId, userId], () =>
    albumsApi.getAlbums({ page, limit, order, sort, genre: genreId, user: userId }),
  );
}

export function useCreateAlbum() {
  const queryClient = useQueryClient();
  const createAlbum = useMutation(
    async (album) => {
      const authToken = await authService.getCurrentUserToken();

      if (authToken) return albumsApi.createAlbum(authToken, album);

      return Promise.reject(new Error("User authentication required"));
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("current-user");
        queryClient.invalidateQueries("user-albums");
        queryClient.refetchQueries("albums");
      },
    },
  );

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
        queryClient.invalidateQueries("album");
        queryClient.invalidateQueries("current-user");
        queryClient.invalidateQueries("user-albums");
        queryClient.refetchQueries("albums");
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
        queryClient.invalidateQueries("album");
        queryClient.invalidateQueries("current-user");
        queryClient.invalidateQueries("user-albums");
        queryClient.refetchQueries("albums");
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
        queryClient.invalidateQueries("album");
        queryClient.invalidateQueries("current-user");
        queryClient.invalidateQueries("user-albums");
        queryClient.refetchQueries("albums");
      },
    },
  );

  return mutation;
}
