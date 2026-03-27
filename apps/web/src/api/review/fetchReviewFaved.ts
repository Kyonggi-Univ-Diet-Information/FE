'use server';

import type { FetchReviewLikedRes } from './api.type';

import { ENDPOINT, type FoodCourt } from '@/api/config';
import { Http } from '@/api/config/api-handlers';
import { reviewKeys } from '@/model/common/queryKey';

export const fetchReviewFaved = async (
  type: FoodCourt,
): Promise<FetchReviewLikedRes[]> => {
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
