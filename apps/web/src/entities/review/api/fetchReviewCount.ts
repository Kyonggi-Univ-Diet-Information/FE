import { Http } from '@/shared/api/http';
import { ENDPOINT, type FoodCourt } from '@/shared/config';
import { KEY } from '@/shared/config';

export const fetchReviewCount = async (
  type: FoodCourt,
  foodId: number,
): Promise<number> => {
  const data = await Http.get<number>({
    request: ENDPOINT.REVIEW_R.COUNT(type, foodId),
    cache: 'force-cache',
    next: {
      tags: [KEY.REVIEW_COUNT(type, foodId)],
      revalidate: 60 * 5,
    },
  });

  return data;
};
