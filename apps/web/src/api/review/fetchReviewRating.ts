
import { ENDPOINT, type FoodCourt } from '@/api/config';
import { Http } from '@/api/config/api-handlers';
import type { Rating } from '@/api/review/api.type';

import { reviewKeys } from '@/model/common/queryKey';

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
