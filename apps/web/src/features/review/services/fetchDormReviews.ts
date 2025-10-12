import { ENDPOINT } from '@/lib/axios';
import { KEY } from '@/lib/constants';
import type { BasePagedResponse, Review } from '@/types';

export const fetchDormReviews = async (
  foodId: number,
  page: number = 0,
): Promise<BasePagedResponse<Review[]>> => {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || 'https://api.kiryong.kr/api';
  const response = await fetch(
    `${apiUrl}${ENDPOINT.REVIEW_PAGINATION + foodId}?pageNo=${page}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'force-cache',
      next: {
        tags: [KEY.REVIEW(foodId), KEY.REVIEW_PAGINATION(foodId, page)],
      },
    },
  );

  const data: BasePagedResponse<Review[]> = await response.json();

  return data;
};
