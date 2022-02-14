import { useQuery, useQueryClient } from "react-query";

import usersApi from "../api/api-users";
import * as authService from "../services/auth";

const queryOptions = {
  staleTime: 600000, // 10 minutes
  cacheTime: 900000, // 15 minutes (doesn't make sense for staleTime to exceed cacheTime)
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
};

export function useFetchCurrentUser({ extend }) {
  const { data = {}, ...query } = useQuery(
    ["user", extend],
    async () => {
      const authToken = await authService.getCurrentUserToken();

      if (authToken) return usersApi.getCurrentUser(authToken, { extend });

      return Promise.reject(new Error("User authentication required"));
    },
    queryOptions,
  );

  return { ...query, data };
}

export function useFetchUser(userId, { extend }) {
  const { data = {}, ...query } = useQuery(
    ["user", userId, extend],
    () => usersApi.getUser(userId, { extend }),
    queryOptions,
  );

  return { ...query, data };
}

export function useFetchUsers({ page, limit, sort, order }) {
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
