import { useMutation, useQuery, useQueryClient } from "react-query";

import { queryKeys } from "../queries/constants";
import tracksApi from "../api/api-tracks";
import * as authService from "../services/auth";

export function useTracks(currentPage = 1, currentGenre = undefined, currentLimit = 10, sort = undefined, order = 'desc', userId = undefined) {
  const fallback = [];
  const { data = fallback, isError, error, isLoading, isSuccess } = useQuery(
    [queryKeys.tracks, currentPage, currentGenre],
    () => tracksApi.getTracks(currentPage, currentGenre, currentLimit, sort, order, userId),
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

export async function usePrefetchTracks(nextPage, currentGenre = undefined, currentLimit = 10, sort = undefined, order = 'desc') {
  const queryClient = useQueryClient();
  await queryClient.prefetchQuery(
    [queryKeys.tracks, nextPage, currentGenre],
    () => tracksApi.getTracks(nextPage, currentGenre, currentLimit, sort, order)
  )
}

export function useUserTracks(currentPage = 1, currentGenre = undefined, currentLimit = 10, sort = undefined, order = 'desc', userId = undefined) {
  const fallback = [];
  const { data = fallback, isError, error, isLoading, isSuccess } = useQuery(
    [queryKeys.tracks, currentPage, userId],
    () => tracksApi.getTracks(currentPage, currentGenre, currentLimit, sort, order, userId),
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

export function useFetchTrack(id) {
  const query = useQuery(["track", id], () => tracksApi.getTrack(id), {
    staleTime: 600000, // 10 minutes
    cacheTime: 900000, // 15 minutes (doesn't make sense for staleTime to exceed cacheTime)
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return query;
}

export function useSetTrack() {
  const mutation = useMutation(async (data) => {
    const authToken = await authService.getCurrentUserToken();

    if (authToken) return tracksApi.setTrack(authToken, data);

    return Promise.reject(new Error("User authentication required"));
  });

  return mutation;
}

export function useUpdateTrack() {
  const mutation = useMutation(async (track) => {
    const authToken = await authService.getCurrentUserToken();

    if (authToken) return tracksApi.updateTrack(authToken, track);

    return Promise.reject(new Error("User authentication required"));
  });

  return mutation;
}

export function useDeleteTrack() {
  const mutation = useMutation(async (id) => {
    const authToken = await authService.getCurrentUserToken();

    if (authToken) return tracksApi.deleteTrack(authToken, id);

    return Promise.reject(new Error("User authentication required"));
  });

  return mutation;
}

export function useMyTracks({ page, sort, order, limit, extend }) {
  const query = useQuery(
    ["my-tracks", page, sort, order, limit, extend],
    async () => {
      const authToken = await authService.getCurrentUserToken();

      if (authToken) return tracksApi.getMyTracks(authToken, { page, sort, order, limit, extend });

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
