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

export function useFetchTrack(trackId, { extend }) {
  const { data = {}, ...query } = useQuery(
    ["track", trackId, extend],
    () => tracksApi.getTrack(trackId, { extend }),
    queryOptions,
  );

  return { ...query, data };
}

export function useFetchTracks({ page, limit, sort, order, genre, userId }) {
  const { data = [], ...query } = useQuery(
    ["tracks", page, limit, order, sort, genre, userId],
    () => tracksApi.getTracks(page, limit, sort, order, genre, userId),
    queryOptions,
  );

  return { ...query, data };
}

export function useInfiniteTracks({ limit, sort, order, genre, userId }) {
  const { data = [], ...query } = useInfiniteQuery(
    ["infinite-tracks", limit, order, sort, genre, userId],
    ({ pageParam: page = 1 }) => tracksApi.getTracks({ page, limit, order, sort, genre, userId }),
    {
      getNextPageParam: (lastPage) =>
        lastPage.data.page < lastPage.data.pages ? lastPage.data.page + 1 : undefined,
    },
  );

  return { ...query, data };
}

export function useFetchUserTracks({ page, sort, order, limit, extend }) {
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

export async function usePrefetchTracks({ page, limit, sort, order, genre, userId }) {
  const queryClient = useQueryClient();

  await queryClient.prefetchQuery(["tracks", page, limit, sort, order, genre, userId], () =>
    tracksApi.getTracks({ page, limit, order, sort, genre, userId }),
  );
}

export function useCreateTrack() {
  const createTrack = useMutation(async (track) => {
    const authToken = await authService.getCurrentUserToken();

    if (authToken) return tracksApi.createTrack(authToken, track);

    return Promise.reject(new Error("User authentication required"));
  });

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
        queryClient.invalidateQueries(["track", "tracks", "infinite-tracks", "user-tracks"]);
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
        queryClient.invalidateQueries(["track", "tracks", "infinite-tracks", "user-tracks"]);
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
        queryClient.invalidateQueries(["track", "tracks", "infinite-tracks", "user-tracks"]);
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
        queryClient.invalidateQueries(["track", "tracks", "infinite-tracks", "user-tracks"]);
      },
    },
  );

  return mutation;
}
