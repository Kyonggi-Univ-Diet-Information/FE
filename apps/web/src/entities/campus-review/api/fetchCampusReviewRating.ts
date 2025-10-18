import { ENDPOINT } from '@/shared/config';
import { KEY } from '@/shared/config';
import { Http } from '@/shared/api/http';
import { Rating } from '../model/review';

export const fetchCampusReviewRating = async (
  foodId: number,
): Promise<Rating> => {
  const data = await Http.get<{ result: Rating }>({
    request: ENDPOINT.KS_REVIEW_RATING_COUNT + foodId,
    cache: 'force-cache',
    next: {
      tags: [KEY.KS_REVIEW_RATING_COUNT(foodId)],
      revalidate: 60 * 5,
    },
  });

  return data.result;
};
