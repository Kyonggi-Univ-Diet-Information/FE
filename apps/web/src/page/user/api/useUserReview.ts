import useSWR from 'swr';

import type { RecentReview } from '@/entities/review/model/review';

import type { BasePagedResponse } from '@/shared/api/baseResponse';
import { Http } from '@/shared/api/http';
import { ENDPOINT, KEY } from '@/shared/config';

export function useUserReview(page: number) {
  const { data, error, isLoading, mutate } = useSWR(
    KEY.MEMBER_REVIEW(page),
    () => getUserReview(page),
  );

  return {
    data,
    isLoading,
    error,
    refresh: mutate,
    goToPage: (page: number) => mutate(getUserReview(page)),
  };
}

async function getUserReview(page: number) {
  const data = await Http.get<BasePagedResponse<RecentReview[]>>({
    request: ENDPOINT.MEMBER.MEMBER_REVIEW,
    params: {
      page,
    },
    authorize: true,
  });
  return data;
}
