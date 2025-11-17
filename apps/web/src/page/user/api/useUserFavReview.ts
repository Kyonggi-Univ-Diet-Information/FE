import useSWR from 'swr';

import { type RecentReview } from '@/entities/review/model/review';

import { BasePagedResponse } from '@/shared/api/baseResponse';
import { Http } from '@/shared/api/http';
import { ENDPOINT, KEY } from '@/shared/config';

export function useUserFavReview(page: number) {
  const { data, error, isLoading, mutate } = useSWR(
    KEY.MEMBER_FAV_REVIEW(page),
    () => getUserFavReview(page),
  );

  return {
    data,
    isLoading,
    error,
    refresh: mutate,
    goToPage: (page: number) => mutate(getUserFavReview(page)),
  };
}

async function getUserFavReview(page: number) {
  const data = await Http.get<BasePagedResponse<RecentReview[]>>({
    request: ENDPOINT.MEMBER.MEMBER_FAV_REVIEW,
    params: {
      page,
    },
    authorize: true,
  });
  return data;
}
