import { useQuery, useQueryClient } from "react-query";

import { queryKeys } from "../queries/constants";
import playlistsApi from "../api/api-playlists";
import * as authService from "../services/auth";

export function usePlaylists() {
  const query = useQuery(queryKeys.playlists, () => playlistsApi.getPlaylists(), {
    staleTime: 600000, // 10 minutes
    cacheTime: 900000, // 15 minutes (doesn't make sense for staleTime to exceed cacheTime)
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return query;
}

export function usePrefetchPlaylists() {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(queryKeys.playlists, playlistsApi.getPlaylists);
}

export function useFetchPlaylist(id) {
  const query = useQuery(["track", id], () => playlistApi.getPlaylist(id), {
    staleTime: 600000, // 10 minutes
    cacheTime: 900000, // 15 minutes (doesn't make sense for staleTime to exceed cacheTime)
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return query;
}

export function useSetPlaylist() {
  const mutation = useMutation((data) => {
    const authToken = authService.getCurrentUserToken();

    if (authToken) return playlistsApi.setPlaylist(authToken, data);

    return Promise.reject(new Error("User authentication required"));
  });

  return mutation;
}

export function useUpdatePlaylist() {
  const mutation = useMutation((id, data) => {
    const authToken = authService.getCurrentUserToken();

    if (authToken) return playlistsApi.updatePlaylist(authToken, id, data);

    return Promise.reject(new Error("User authentication required"));
  });

  return mutation;
}

export function useDeletePlaylist() {
  const mutation = useMutation((id) => {
    const authToken = authService.getCurrentUserToken();

    if (authToken) return playlistsApi.updatePlaylist(authToken, id);

    return Promise.reject(new Error("User authentication required"));
  });

  return mutation;
}
