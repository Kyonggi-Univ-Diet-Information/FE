import { Http } from '@/shared/api/http';
import { ENDPOINT, type FoodCourt } from '@/shared/config';
import { KEY } from '@/shared/config';

import { type Rating } from '../model/review';

export const fetchReviewRating = async (
  type: FoodCourt,
  foodId: number,
): Promise<Rating> => {
  const data = await Http.get<{ result: Rating }>({
    request: ENDPOINT.REVIEW_R.RATING(type, foodId),
    cache: 'force-cache',
    next: {
      tags: [KEY.REVIEW_RATING_COUNT(type, foodId)],
      revalidate: 60 * 5,
    },
  });

  return data.result;
};
