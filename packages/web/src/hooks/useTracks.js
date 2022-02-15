import { useMutation, useQuery, useInfiniteQuery, useQueryClient } from "react-query";

import tracksApi from "../api/api-tracks";
import * as authService from "../services/auth";

const queryOptions = {
  staleTime: 600000,
  cacheTime: 900000,
  keepPreviousData: true,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
};

export function useFetchTrack(trackId, params = {}) {
  const { extend } = params;
  const { data = {}, ...query } = useQuery(
    ["track", trackId, extend],
    () => tracksApi.getTrack(trackId, { extend }),
    queryOptions,
  );

  return { ...query, data };
}

export function useFetchTracks(params = {}) {
  const { page, limit, sort, order, genreId, userId } = params;
  const { data = [], ...query } = useQuery(
    ["tracks", page, limit, order, sort, genreId, userId],
    () => tracksApi.getTracks({ page, limit, sort, order, genre: genreId, user: userId }),
    queryOptions,
  );

  return { ...query, data };
}

export function useInfiniteTracks(params = {}) {
  const { limit, sort, order, genreId, userId } = params;
  const { data = [], ...query } = useInfiniteQuery(
    ["tracks", limit, order, sort, genreId, userId],
    ({ pageParam: page = 1 }) =>
      tracksApi.getTracks({ page, limit, order, sort, genre: genreId, user: userId }),
    {
      getNextPageParam: (lastPage) =>
        lastPage.data.page < lastPage.data.pages ? lastPage.data.page + 1 : undefined,
    },
  );

  return { ...query, data };
}

export function useFetchUserTracks(params = {}) {
  const { page, sort, order, limit, extend } = params;
  const { data = [], ...query } = useQuery(
    ["user-tracks", page, sort, order, limit, extend],
    async () => {
      const authToken = await authService.getCurrentUserToken();

      if (authToken)
        return tracksApi.getUserTracks(authToken, { page, sort, order, limit, extend });

      return Promise.reject(new Error("User authentication required"));
    },
    queryOptions,
  );

  return { ...query, data };
}

export async function usePrefetchTracks(params = {}) {
  const { page, limit, sort, order, genreId, userId } = params;
  const queryClient = useQueryClient();

  await queryClient.prefetchQuery(["tracks", page, limit, sort, order, genreId, userId], () =>
    tracksApi.getTracks({ page, limit, order, sort, genre: genreId, user: userId }),
  );
}

export function useCreateTrack() {
  const queryClient = useQueryClient();
  const createTrack = useMutation(
    async (track) => {
      const authToken = await authService.getCurrentUserToken();

      if (authToken) return tracksApi.createTrack(authToken, track);

      return Promise.reject(new Error("User authentication required"));
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("current-user");
        queryClient.invalidateQueries("user-tracks");
        queryClient.refetchQueries("tracks");
      },
    },
  );

  return createTrack;
}

export function useUpdateTrack() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (track) => {
      const authToken = await authService.getCurrentUserToken();

      if (authToken) return tracksApi.updateTrack(authToken, track);

      return Promise.reject(new Error("User authentication required"));
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("track");
        queryClient.invalidateQueries("current-user");
        queryClient.invalidateQueries("user-tracks");
        queryClient.refetchQueries("tracks");
      },
    },
  );

  return mutation;
}

export function useDeleteTrack() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (trackId) => {
      const authToken = await authService.getCurrentUserToken();

      if (authToken) return tracksApi.deleteTrack(authToken, trackId);

      return Promise.reject(new Error("User authentication required"));
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("track");
        queryClient.invalidateQueries("current-user");
        queryClient.invalidateQueries("user-tracks");
        queryClient.refetchQueries("tracks");
      },
    },
  );

  return mutation;
}

export function useLikeTrack() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (trackId) => {
      const authToken = await authService.getCurrentUserToken();

      if (authToken) return tracksApi.likeTrack(authToken, trackId);

      return Promise.reject(new Error("User authentication required"));
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("track");
        queryClient.invalidateQueries("current-user");
        queryClient.invalidateQueries("user-tracks");
        queryClient.refetchQueries("tracks");
      },
    },
  );

  return mutation;
}

export function usePlayTrack() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (trackId) => {
      const authToken = await authService.getCurrentUserToken();

      if (authToken) return tracksApi.playTrack(authToken, trackId);

      return Promise.reject(new Error("User authentication required"));
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("track");
        queryClient.invalidateQueries("current-user");
        queryClient.invalidateQueries("user-tracks");
        queryClient.refetchQueries("tracks");
      },
    },
  );

  return mutation;
}
