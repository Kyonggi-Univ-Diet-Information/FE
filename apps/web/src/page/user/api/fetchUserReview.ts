import { Review } from '@/entities/review/model/review';

import type { BasePagedResponse } from '@/shared/api/baseResponse';
import { Http } from '@/shared/api/http';
import { KEY, ENDPOINT, type FoodCourt } from '@/shared/config';

export const fetchUserReview = async (
  page: number,
  type: FoodCourt,
): Promise<BasePagedResponse<Review[]>> => {
  const data = await Http.get<BasePagedResponse<Review[]>>({
    request: ENDPOINT.MEMBER.MEMBER_REVIEW,
    params: {
      page,
      type,
    },
    authorize: true,
    cache: 'force-cache',
    next: {
      tags: [KEY.MEMBER_REVIEW(page, type)],
      revalidate: 60 * 5,
    },
  });
  return data;
};
