import { Http } from '@/shared/api/http';
import { ENDPOINT, type FoodCourt } from '@/shared/config';
import { reviewKeys } from '@/shared/lib/queryKey';

export const fetchReviewRatingAverage = async (
  type: FoodCourt,
  foodId: number,
): Promise<number> => {
  const data = await Http.get<number>({
    request: ENDPOINT.REVIEW_R.AVERAGE_RATING(type, foodId),
    cache: 'force-cache',
    next: {
      tags: [reviewKeys.averageRating.tag(type, foodId)],
      revalidate: 60 * 5,
    },
  });

  return data;
};
