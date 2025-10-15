import { ENDPOINT } from '@/lib/axios';
import { KEY } from '@/lib/constants';

export const fetchReviewCount = async (foodId: number): Promise<number> => {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || 'https://api.kiryong.kr/api';

  const response = await fetch(
    `${apiUrl}${ENDPOINT.KS_REVIEW_COUNT + foodId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'force-cache',
      next: {
        tags: [KEY.KS_REVIEW_COUNT(foodId)],
        revalidate: 60 * 10,
      },
    },
  );

  if (!response.ok) {
    return 0;
  }

  const data: number = await response.json();

  return data;
};
