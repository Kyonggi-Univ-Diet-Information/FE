'use server';

import { Http } from '@/shared/api/http';
import { ENDPOINT, type FoodCourt } from '@/shared/config';
import { reviewKeys } from '@/shared/lib/queryKey';

type FetchReviewBaseRes = {
  id: number;
  memberDTO: {
    profileId: null;
    email: string;
    password: null;
    name: string;
    profileUrl: null;
    createdAt: string;
    updatedAt: null;
  };
  createdAt: string;
};

export type KyongsulFoodReviewRes = FetchReviewBaseRes & {
  kyongsulFoodReviewId: number;
};

export type SallyBoxFoodReviewRes = FetchReviewBaseRes & {
  sallyBoxFoodReviewId: number;
};

export type EsquareFoodReviewRes = FetchReviewBaseRes & {
  esquareFoodReviewId: number;
};

export type FetchReviewLikedRes =
  | KyongsulFoodReviewRes
  | SallyBoxFoodReviewRes
  | EsquareFoodReviewRes;

export const fetchReviewFaved = async (type: FoodCourt) => {
  const data = await Http.get<FetchReviewLikedRes[]>({
    request: ENDPOINT.MEMBER.MEMBER_REVIEW_LIKED(type),
    authorize: true,
    cache: 'force-cache',
    next: {
      tags: [reviewKeys.faved.tag(type)],
    },
  });

  return data;
};
