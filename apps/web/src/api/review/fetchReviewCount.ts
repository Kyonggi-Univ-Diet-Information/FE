
import { ENDPOINT, type FoodCourt } from '@/api/config';
import { Http } from '@/api/config/api-handlers';

import { reviewKeys } from '@/model/common/queryKey';

import type { FetchReviewCountResponse } from './api.model';

export const fetchReviewCount = async (
  type: FoodCourt,
  foodId: number,
): Promise<FetchReviewCountResponse> => {
  const data = await Http.get<FetchReviewCountResponse>({
    request: ENDPOINT.REVIEW_R.COUNT(type, foodId),
    cache: 'force-cache',
    next: {
      tags: [reviewKeys.count.tag(type, foodId)],
      revalidate: 60 * 5,
    },
  });

  return data;
};
