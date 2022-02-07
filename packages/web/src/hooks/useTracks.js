import { useMutation, useQuery, useQueryClient } from "react-query";

import { queryKeys } from "../queries/constants";
import tracksApi from "../api/api-tracks";
import * as authService from "../services/auth";

export function useTracks(currentPage = 1, currentGenre = undefined, currentLimit = 10, sort = undefined, order = 'desc') {
  const fallback = [];
  const { data = fallback, isError, error, isLoading, isSuccess } = useQuery(
    [queryKeys.tracks, currentPage, currentGenre],
    () => tracksApi.getTracks(currentPage, currentGenre, currentLimit, sort, order),
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
  const mutation = useMutation((data) => {
    const authToken = authService.getCurrentUserToken();

    if (authToken) return tracksApi.setTrack(authToken, data);

    return Promise.reject(new Error("User authentication required"));
  });

  return mutation;
}

export function useUpdateTrack() {
  const mutation = useMutation((id, data) => {
    const authToken = authService.getCurrentUserToken();

    if (authToken) return tracksApi.updateTrack(authToken, id, data);

    return Promise.reject(new Error("User authentication required"));
  });

  return mutation;
}

export function useDeleteTrack() {
  const mutation = useMutation((id) => {
    const authToken = authService.getCurrentUserToken();

    if (authToken) return tracksApi.updateTrack(authToken, id);

    return Promise.reject(new Error("User authentication required"));
  });

  return mutation;
}
