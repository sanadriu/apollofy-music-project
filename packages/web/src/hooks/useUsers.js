import { useQuery, useQueryClient } from 'react-query';

import { queryKeys } from '../queries/constants';
import usersApi from '../api/api-users';

export function useUsers() {
  const fallback = [];
  const { data = fallback, isError, error, isLoading } = useQuery(queryKeys.users, () => usersApi.getUsers(), {
    staleTime: 600000, // 10 minutes
    cacheTime: 900000, // 15 minutes (doesn't make sense for staleTime to exceed cacheTime)
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { data, isError, error, isLoading };
}

export function usePrefetchUsers() {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(queryKeys.users, usersApi.getUsers);
}
