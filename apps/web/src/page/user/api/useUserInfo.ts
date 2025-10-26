import useSWR from 'swr';

import { Http } from '@/shared/api/http';
import { ENDPOINT, KEY } from '@/shared/config';

interface UserInfoResponse {
  email: string;
  name: string;
  createdAt: string;
}

export function useUserInfo() {
  const { data, error, isLoading, mutate } = useSWR(KEY.MEMBER_INFO, () =>
    getUserInfo(),
  );

  return {
    data,
    isLoading,
    error,
    refresh: mutate,
  };
}

async function getUserInfo() {
  const data = await Http.get<UserInfoResponse>({
    request: ENDPOINT.MEMBER.MEMBER_INFO,
    authorize: true,
  });
  return data;
}
