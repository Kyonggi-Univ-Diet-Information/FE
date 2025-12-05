'use client';

import useSWR from 'swr';

import { fetchIsAuthenticated } from '../action';

export function useAuth() {
  const { data, error, isLoading, mutate } = useSWR(
    'auth-status',
    () => fetchIsAuthenticated(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 10000,
    },
  );

  return {
    isAuthenticated: data?.isAuthenticated ?? false,
    isLoading,
    error,
    refresh: mutate,
  };
}
