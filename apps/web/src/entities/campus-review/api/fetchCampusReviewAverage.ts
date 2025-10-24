import { Http } from '@/shared/api/http';
import { KEY } from '@/shared/config';
import { ENDPOINT, FOOD_COURT } from '@/shared/config/endpoint';

export const fetchCampusReviewAverage = async (
  foodId: number,
): Promise<number> => {
  const data = await Http.get<number>({
    request: ENDPOINT.REVIEW_R.AVERAGE_RATING(FOOD_COURT.KYONGSUL, foodId),
    cache: 'force-cache',
    next: {
      tags: [KEY.KS_REVIEW_AVERAGE_RATING(foodId)],
      revalidate: 60 * 5,
    },
  });

  return data;
};
