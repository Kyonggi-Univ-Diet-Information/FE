import { apiClient, ENDPOINT } from '@/lib/axios';

export const fetchMenuAverage = async (foodId: number): Promise<number> => {
  const response = await apiClient.get<number>({
    request: ENDPOINT.KS_REVIEW_AVERAGE_RATING + foodId,
  });

  return response.data;
};
