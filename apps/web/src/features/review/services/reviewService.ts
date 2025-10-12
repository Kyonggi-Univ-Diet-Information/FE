import type { BasePagedResponse, Review } from '@/types';
import type { Rating } from '../types';
import { fetchMenuRatings, fetchMenuAverage, fetchMenuReviews } from './';
import { fetchDormRatings, fetchDormAverage, fetchDormReviews } from './';

export type MenuType = 'campus' | 'dorm';

interface ReviewService {
  fetchRatings: (foodId: number) => Promise<Rating>;
  fetchAverage: (foodId: number) => Promise<number>;
  fetchReviews: (
    foodId: number,
    page?: number,
  ) => Promise<BasePagedResponse<Review[]>>;
}

const campusReviewService: ReviewService = {
  fetchRatings: fetchMenuRatings,
  fetchAverage: fetchMenuAverage,
  fetchReviews: fetchMenuReviews,
};

const dormReviewService: ReviewService = {
  fetchRatings: fetchDormRatings,
  fetchAverage: fetchDormAverage,
  fetchReviews: fetchDormReviews,
};

export function getReviewService(menuType: MenuType = 'campus'): ReviewService {
  return menuType === 'dorm' ? dormReviewService : campusReviewService;
}
