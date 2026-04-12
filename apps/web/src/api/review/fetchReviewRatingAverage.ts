
import { ENDPOINT, type FoodCourt } from '@/api/config';
import { Http } from '@/api/config/api-handlers';

import { reviewKeys } from '@/model/common/queryKey';

import type { FetchReviewRatingAverageResponse } from './api.model';

export const fetchReviewRatingAverage = async (
  type: FoodCourt,
  foodId: number,
): Promise<FetchReviewRatingAverageResponse> => {
  const data = await Http.get<FetchReviewRatingAverageResponse>({
    request: ENDPOINT.REVIEW_R.AVERAGE_RATING(type, foodId),
    cache: 'force-cache',
    next: {
      tags: [reviewKeys.averageRating.tag(type, foodId)],
      revalidate: 60 * 5,
    },
  });

  return data;
};
