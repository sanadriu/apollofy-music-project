import { useMutation, useQuery, useQueryClient } from "react-query";

import { queryKeys } from "../queries/constants";
import tracksApi from "../api/api-tracks";
import * as authService from "../services/auth";

export function useTracks({ currentLimit, currentPage }) {
  const query = useQuery(
    ["tracks", currentLimit, currentPage],
    () => tracksApi.getTracks(currentLimit, currentPage),
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

export function usePrefetchTracks() {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(queryKeys.tracks, tracksApi.getTracks);
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
