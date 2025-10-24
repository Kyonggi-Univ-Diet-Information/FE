'use client';

import useSWR from 'swr';

import { checkAuth } from '../action';

export function useAuth() {
  const { data, error, isLoading, mutate } = useSWR(
    'auth-status',
    () => checkAuth(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 10000,
    },
  );

  return {
    isAuthenticated: data?.isAuthenticated ?? false,
    hasToken: data?.hasToken ?? false,
    isLoading,
    error,
    refresh: mutate,
  };
}
