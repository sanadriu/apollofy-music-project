import { useQuery, useQueryClient } from "react-query";

import { queryKeys } from "../queries/constants";
import usersApi from "../api/api-users";

export function useUsers(userId = undefined) {
  const fallback = [];
  const {
    data = fallback,
    isError,
    error,
    isLoading,
  } = useQuery([queryKeys.users,userId], () => usersApi.getUsers(userId), {
    staleTime: 600000, // 10 minutes
    cacheTime: 900000, // 15 minutes (doesn't make sense for staleTime to exceed cacheTime)
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { data, isError, error, isLoading };
}

export function usePrefetchUsers(userId = undefined) {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(queryKeys.users, usersApi.getUsers(userId));
}
