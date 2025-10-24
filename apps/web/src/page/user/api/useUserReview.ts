import useSWR from 'swr';

import { Http } from '@/shared/api/http';
import { ENDPOINT, type FoodCourt, KEY } from '@/shared/config';
import type { BasePagedResponse } from '@/shared/api/baseResponse';
import type { Review } from '@/entities/campus-review/model/review';

export function useUserReview(page: number, type: FoodCourt) {
  const { data, error, isLoading, mutate } = useSWR(
    KEY.MEMBER_REVIEW(page, type),
    () => getUserReview(page, type),
  );

  return {
    data,
    isLoading,
    error,
    refresh: mutate,
    goToPage: (page: number, type: FoodCourt) =>
      mutate(getUserReview(page, type)),
  };
}

async function getUserReview(page: number, type: FoodCourt) {
  const data = await Http.get<BasePagedResponse<Review[]>>({
    request: ENDPOINT.MEMBER.MEMBER_REVIEW,
    params: {
      page,
      type,
    },
    authorize: true,
  });
  return data;
}
