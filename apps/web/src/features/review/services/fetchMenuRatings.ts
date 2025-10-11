import { apiClient, ENDPOINT } from '@/lib/axios';
import type { Rating } from '../types';

export const fetchMenuRatings = async (foodId: number): Promise<Rating> => {
  const response = await apiClient.get<{ result: Rating }>({
    request: ENDPOINT.KS_REVIEW_RATING_COUNT + foodId,
  });

  return response.data.result;
};
