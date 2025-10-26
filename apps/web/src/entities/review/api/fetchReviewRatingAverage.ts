import { Http } from '@/shared/api/http';
import { KEY, type FoodCourt } from '@/shared/config';
import { ENDPOINT } from '@/shared/config/endpoint';

export const fetchReviewRatingAverage = async (
  type: FoodCourt,
  foodId: number,
): Promise<number> => {
  const data = await Http.get<number>({
    request: ENDPOINT.REVIEW_R.AVERAGE_RATING(type, foodId),
    cache: 'force-cache',
    next: {
      tags: [KEY.REVIEW_AVERAGE_RATING(type, foodId)],
      revalidate: 60 * 5,
    },
  });

  return data;
};
