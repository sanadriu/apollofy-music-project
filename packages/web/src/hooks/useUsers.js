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

  // const authToken = async () => authService.getCurrentUserToken();
  // if (!authToken) return Promise.reject(new Error("User authentication required"));
  
  const fallback = [];
  const {
    data = fallback,
    isError,
    error,
    isLoading,
    isSuccess
  } = useQuery([queryKeys.users, followedUsers], () => usersApi.getMyFollowedUsers(followedUsers), {
    staleTime: 600000, // 10 minutes
    cacheTime: 900000, // 15 minutes (doesn't make sense for staleTime to exceed cacheTime)
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { data, isError, error, isLoading, isSuccess };
}

export function usePrefetchUsers(userId = undefined) {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(queryKeys.users, usersApi.getUsers(userId));
}

export function useUpdateUser() {
  const mutation = useMutation(async (userId) => {
    const authToken = await authService.getCurrentUserToken();

    if (authToken) return usersApi.updateUser(authToken, userId);

    return Promise.reject(new Error("User authentication required"));
  });

  return mutation;
}

export function useFollowUser() {
  const mutation = useMutation(async (userId) => {
    try {
      const authToken = await authService.getCurrentUserToken();

      if (authToken) return usersApi.followUser(authToken, userId);

      return Promise.reject(new Error("User authentication required"));
    } catch (error) {
      return Promise.reject(error.message);
    }
  });

  return mutation;
}
