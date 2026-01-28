import type { BasePagedResponse } from '@/shared/api/baseResponse';
import { Http } from '@/shared/api/http';
import { ENDPOINT, type FoodCourt } from '@/shared/config';
import { AuthService } from '@/shared/lib/auth';
import { reviewKeys } from '@/shared/lib/queryKey';

import { Review } from '../model/review';

export const fetchReviewPaged = async (
  type: FoodCourt,
  foodId: number,
  page: number = 0,
): Promise<BasePagedResponse<Review[]>> => {
  const isAuthenticated = await AuthService.isAuthenticated();

  const data = await Http.get<BasePagedResponse<Review[]>>({
    request: `${ENDPOINT.REVIEW_R.PAGED(type, foodId)}?pageNo=${page}`,
    cache: 'no-store',
    authorize: isAuthenticated,
    next: {
      tags: [
        reviewKeys.byFood.tag(type, foodId),
        reviewKeys.paged.tag(type, foodId, page),
      ],
    },
  });

  return data;
};
