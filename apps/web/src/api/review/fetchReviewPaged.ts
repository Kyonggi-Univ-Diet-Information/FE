
import { ENDPOINT, type FoodCourt } from '@/api/config';
import type { BasePagedResponse } from '@/api/config/api-base-types';
import { Http } from '@/api/config/api-handlers';
import type { Review } from '@/api/review/api.type';
import { AuthService } from '@/model/common/auth';
import { reviewKeys } from '@/model/common/queryKey';

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
