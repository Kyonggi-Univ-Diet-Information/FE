import { reviewKeys } from '@/shared/lib/queryKey';

import { type Rating } from '../model/review';

import { ENDPOINT, type FoodCourt } from '@/api/config';
import { Http } from '@/api/config/api-handlers';

export const fetchReviewRating = async (
  type: FoodCourt,
  foodId: number,
): Promise<Rating> => {
  const data = await Http.get<{ result: Rating }>({
    request: ENDPOINT.REVIEW_R.RATING(type, foodId),
    cache: 'force-cache',
    next: {
      tags: [reviewKeys.ratingCount.tag(type, foodId)],
      revalidate: 60 * 5,
    },
  });

  return data.result;
};
