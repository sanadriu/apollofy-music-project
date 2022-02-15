import { useMutation, useQuery, useQueryClient } from "react-query";

import usersApi from "../api/api-users";
import * as authService from "../services/auth";

const queryOptions = {
  staleTime: 600000, // 10 minutes
  cacheTime: 900000, // 15 minutes (doesn't make sense for staleTime to exceed cacheTime)
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
};

export function useFetchCurrentUser(params = {}) {
  const { extend } = params;
  const { data = {}, ...query } = useQuery(
    ["current-user", extend],
    async () => {
      const authToken = await authService.getCurrentUserToken();

      if (authToken) return usersApi.getCurrentUser(authToken, { extend });

      return Promise.reject(new Error("User authentication required"));
    },
    queryOptions,
  );

  return { ...query, data };
}

export function useFetchUser(userId, params = {}) {
  const { extend } = params;
  const { data = {}, ...query } = useQuery(
    ["user", userId, extend],
    () => usersApi.getUser(userId, { extend }),
    queryOptions,
  );

  return { ...query, data };
}

export function useFetchUsers(params = {}) {
  const { page, limit, sort, order } = params;
  const { data = [], ...query } = useQuery(
    ["users", page, limit, order, sort],
    () => usersApi.getUsers(page, limit, sort, order),
    queryOptions,
  );

  return { ...query, data };
}

export function usePrefetchUsers(userId) {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery("users", usersApi.getUsers(userId));
}

export function useUpdateUser() {
  const mutation = useMutation(async (user) => {
    const authToken = await authService.getCurrentUserToken();

    if (authToken) return usersApi.updateUser(authToken, user);

    return Promise.reject(new Error("User authentication required"));
  });

  return mutation;
}

export function useFollowUser() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (userId) => {
      try {
        const authToken = await authService.getCurrentUserToken();

        if (authToken) return usersApi.followUser(authToken, userId);

        return Promise.reject(new Error("User authentication required"));
      } catch (error) {
        return Promise.reject(error.message);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("followed-users");
      },
    },
  );

  return mutation;
}

export function useFollowedUsers(params = {}) {
  const { exclude = false } = params;
  const { data = [], ...query } = useQuery(
    ["followed-users", exclude],
    async () => {
      const authToken = await authService.getCurrentUserToken();

      if (authToken) return usersApi.getFollowedUsers(authToken, { exclude });

      return Promise.reject(new Error("User authentication required"));
    },
    queryOptions,
  );

  return { ...query, data };
}
