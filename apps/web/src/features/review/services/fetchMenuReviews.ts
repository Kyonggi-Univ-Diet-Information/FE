import { apiClient, ENDPOINT } from '@/lib/axios';
import type { BasePagedResponse, Review } from '@/types';

export const fetchMenuReviews = async (
  foodId: number,
  page: number = 0,
): Promise<BasePagedResponse<Review[]>> => {
  const response = await apiClient.get<{ result: BasePagedResponse<Review[]> }>(
    {
      request: ENDPOINT.KS_REVIEW_PAGINATION + foodId,
      params: {
        pageNo: page,
      },
    },
  );

  return response.data.result;
};
