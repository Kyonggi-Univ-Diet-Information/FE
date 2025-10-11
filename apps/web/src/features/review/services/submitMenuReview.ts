import type { ReviewPost } from '@/types';
import { apiServer } from '@/lib/axios';

export const submitMenuReview = async (data: ReviewPost) => {
  const response = await apiServer.post({ request: '', data });
  return response.data;
};
