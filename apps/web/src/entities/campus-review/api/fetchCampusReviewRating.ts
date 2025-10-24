import { Http } from '@/shared/api/http';
import { ENDPOINT, FOOD_COURT } from '@/shared/config';
import { KEY } from '@/shared/config';

import { Rating } from '../model/review';

export const fetchCampusReviewRating = async (
  foodId: number,
): Promise<Rating> => {
  const data = await Http.get<{ result: Rating }>({
    request: ENDPOINT.REVIEW_R.RATING(FOOD_COURT.KYONGSUL, foodId),
    cache: 'force-cache',
    next: {
      tags: [KEY.KS_REVIEW_RATING_COUNT(foodId)],
      revalidate: 60 * 5,
    },
  });

  return data.result;
};
