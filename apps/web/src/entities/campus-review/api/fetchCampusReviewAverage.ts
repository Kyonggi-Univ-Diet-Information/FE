import { KEY } from '@/lib/constants';
import { Http } from '@/shared/api/http';
import { ENDPOINT } from '@/shared/config/endpoint';

export const fetchCampusReviewAverage = async (
  foodId: number,
): Promise<number> => {
  const data = await Http.get<number>({
    request: ENDPOINT.KS_REVIEW_AVERAGE_RATING + foodId,
    cache: 'force-cache',
    next: {
      tags: [KEY.KS_REVIEW_AVERAGE_RATING(foodId)],
      revalidate: 60 * 5,
    },
  });

  return data;
};
