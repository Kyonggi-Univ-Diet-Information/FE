import useSWR from 'swr';

import { Http } from '@/shared/api/http';
import { ENDPOINT, FoodCourt, KEY } from '@/shared/config';
import { BasePagedResponse } from '@/shared/api/baseResponse';
import { Review } from '@/entities/campus-review/model/review';

export function useUserFavReview(page: number, type: FoodCourt) {
  const { data, error, isLoading, mutate } = useSWR(
    KEY.MEMBER_FAV_REVIEW(page, type),
    () => getUserFavReview(page, type),
  );

  return {
    data,
    isLoading,
    error,
    refresh: mutate,
    goToPage: (page: number, type: FoodCourt) =>
      mutate(getUserFavReview(page, type)),
  };
}

async function getUserFavReview(page: number, type: FoodCourt) {
  const data = await Http.get<BasePagedResponse<Review[]>>({
    request: ENDPOINT.MEMBER.MEMBER_FAV_REVIEW,
    params: {
      page,
      type,
    },
    authorize: true,
  });
  return data;
}
