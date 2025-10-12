import { apiClient, ENDPOINT } from '@/lib/axios';

export const fetchDormAverage = async (foodId: number): Promise<number> => {
  const response = await apiClient.get<number>({
    request: ENDPOINT.REVIEW_AVERAGE_RATING + foodId,
  });

  return response.data;
};
