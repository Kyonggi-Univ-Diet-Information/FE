import { Http } from '@/shared/api/http';
import { ENDPOINT, type FoodCourt } from '@/shared/config';
import { reviewKeys } from '@/shared/lib/queryKey';

export const fetchReviewCount = async (
  type: FoodCourt,
  foodId: number,
): Promise<number> => {
  const data = await Http.get<number>({
    request: ENDPOINT.REVIEW_R.COUNT(type, foodId),
    cache: 'force-cache',
    next: {
      tags: [reviewKeys.count.tag(type, foodId)],
      revalidate: 60 * 5,
    },
  });

  return data;
};
