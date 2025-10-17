import { ENDPOINT } from '@/lib/axios';
import { KEY } from '@/lib/constants';
import { Http } from '@/shared/api/http';

export const fetchCampusReviewCount = async (
  foodId: number,
): Promise<number> => {
  const data = await Http.get<number>({
    request: ENDPOINT.KS_REVIEW_COUNT + foodId,
    cache: 'force-cache',
    next: {
      tags: [KEY.KS_REVIEW_COUNT(foodId)],
      revalidate: 60 * 5,
    },
  });

  return data;
};
