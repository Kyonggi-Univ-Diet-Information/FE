import { type FoodCourt } from '@/shared/config';

import { getReviewsAction, ReviewWithMetadata } from './getReviewsAction';

export const REVIEW_SWR_KEYS = {
  PAGED_REVIEWS: (type: FoodCourt, foodId: number) => ['reviews', type, foodId],
};

export const reviewsFetcher = async ([_, type, foodId, page]: [string, FoodCourt, number, number]) => {
  return await getReviewsAction(type, foodId, page);
};

export interface PagedReviewResponse {
  content: ReviewWithMetadata[];
  totalPages: number;
  last: boolean;
  pageNo: number;
  isAuthenticated: boolean;
}
