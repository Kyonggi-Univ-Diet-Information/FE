import type { BasePagedResponse } from '@/shared/api/baseResponse';
import { Http } from '@/shared/api/http';
import { KEY, ENDPOINT, type FoodCourt } from '@/shared/config';

import { Review } from '../model/review';

export const fetchReviewPaged = async (
  type: FoodCourt,
  foodId: number,
  page: number = 0,
): Promise<BasePagedResponse<Review[]>> => {
  const data = await Http.get<BasePagedResponse<Review[]>>({
    request: `${ENDPOINT.REVIEW_R.PAGED(type, foodId)}?pageNo=${page}`,
    cache: 'force-cache',
    next: {
      tags: [KEY.REVIEW_PAGED(type, foodId, page)],
      revalidate: 60 * 5,
    },
  });

  return data;
};
