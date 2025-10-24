import { Http } from '@/shared/api/http';
import { ENDPOINT, FOOD_COURT } from '@/shared/config';
import { KEY } from '@/shared/config';

export const fetchCampusReviewCount = async (
  foodId: number,
): Promise<number> => {
  const data = await Http.get<number>({
    request: ENDPOINT.REVIEW_R.COUNT(FOOD_COURT.KYONGSUL, foodId),
    cache: 'force-cache',
    next: {
      tags: [KEY.KS_REVIEW_COUNT(foodId)],
      revalidate: 60 * 5,
    },
  });

  return data;
};
