import type { Review } from '@/entities/campus-review/model/review';

import type { BasePagedResponse } from '@/shared/api/baseResponse';
import { Http } from '@/shared/api/http';
import { ENDPOINT, FOOD_COURT } from '@/shared/config';
import { KEY } from '@/shared/config';


export const fetchCampusReview = async (
  foodId: number,
  page: number = 0,
): Promise<BasePagedResponse<Review[]>> => {
  const data = await Http.get<BasePagedResponse<Review[]>>({
    request: `${ENDPOINT.REVIEW_R.PAGED(FOOD_COURT.KYONGSUL, foodId)}?pageNo=${page}`,
    cache: 'force-cache',
    next: {
      tags: [KEY.KS_REVIEW(foodId), KEY.KS_REVIEW_PAGINATION(foodId, page)],
      revalidate: 60 * 5,
    },
  });

  return data;
};
