import { useQuery } from "react-query";
import searchApi from "../api/api-search";
import { queryKeys } from "../queries/constants";

export function useSearch(input = null, currentPage = 1) {
  const fallback = [];
  const {
    data = fallback,
    isError,
    error,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery([queryKeys.search, input], () => searchApi.getSearch(input), {
    staleTime: 600000, // 10 minutes
    cacheTime: 900000, // 15 minutes (doesn't make sense for staleTime to exceed cacheTime)
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: false,
  });

  return { data, isError, error, isLoading, isSuccess, refetch };
}
