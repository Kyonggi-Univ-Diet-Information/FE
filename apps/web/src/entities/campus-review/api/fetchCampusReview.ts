import { ENDPOINT } from '@/lib/axios';
import { KEY } from '@/lib/constants';
import { Http } from '@/shared/api/http';
import type { BasePagedResponse } from '@/shared/api/baseResponse';
import type { Review } from '@/entities/campus-review/model/review';

export const fetchCampusReview = async (
  foodId: number,
  page: number = 0,
): Promise<BasePagedResponse<Review[]>> => {
  const data = await Http.get<BasePagedResponse<Review[]>>({
    request: `${ENDPOINT.KS_REVIEW_PAGINATION + foodId}?pageNo=${page}`,
    cache: 'force-cache',
    next: {
      tags: [KEY.KS_REVIEW(foodId), KEY.KS_REVIEW_PAGINATION(foodId, page)],
      revalidate: 60 * 5,
    },
  });

  return data;
};
