import { useMutation, useQuery, useQueryClient } from "react-query";

import { queryKeys } from "../queries/constants";
import usersApi from "../api/api-users";
import * as authService from "../services/auth";

export function useUsers(userId = undefined) {
  const fallback = [];
  const {
    data = fallback,
    isError,
    error,
    isLoading,
    isSuccess
  } = useQuery([queryKeys.users, userId], () => usersApi.getUsers(userId), {
    staleTime: 600000, // 10 minutes
    cacheTime: 900000, // 15 minutes (doesn't make sense for staleTime to exceed cacheTime)
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { data, isError, error, isLoading, isSuccess };
}

export function useFollowedUsers(followedUsers = true) {  
  const fallback = [];
  const {
    data = fallback,
    isError,
    error,
    isLoading,
    isSuccess
  } = useQuery(["followed-users", followedUsers], async () => {
    const authToken = await authService.getCurrentUserToken();

      if (authToken) return usersApi.getMyFollowedUsers(authToken, followedUsers)

      return Promise.reject(new Error("User authentication required"));
  }, {
    staleTime: 600000, // 10 minutes
    cacheTime: 900000, // 15 minutes (doesn't make sense for staleTime to exceed cacheTime)
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { data, isError, error, isLoading,isSuccess };
}

export function usePrefetchUsers(userId = undefined) {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(queryKeys.users, usersApi.getUsers(userId));
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
  const mutation = useMutation(async (userId) => {
    try {
      const authToken = await authService.getCurrentUserToken();

      if (authToken) return usersApi.followUser(authToken, userId);

      return Promise.reject(new Error("User authentication required"));
    } catch (error) {
      return Promise.reject(error.message);
    }
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(["followed-users"]);
    },
  });

  return mutation;
}
