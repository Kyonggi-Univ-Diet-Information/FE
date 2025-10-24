import type { FoodCourt } from './endpoint';

export const KEY = {
  AUTH_STATUS: 'auth-status',
  MEMBER_INFO: 'member-info',
  MEMBER_FAV_REVIEW: (page: number, type: FoodCourt): string =>
    `member-fav-review-${page}-${type}`,
  MEMBER_REVIEW: (page: number, type: FoodCourt): string =>
    `member-review-${page}-${type}`,
  REVIEW: (foodId: number): string => `review-${foodId}`,
  REVIEW_PAGINATION: (foodId: number, page: number): string =>
    `review-pagination-${foodId}-${page}`,
  REVIEW_LIKED: 'member-review-liked',
  REVIEW_COUNT: (foodId: number): string => `review-count-${foodId}`,
  REVIEW_PAGED: (type: FoodCourt, foodId: number, page: number): string =>
    `review-paged-${type}-${foodId}-${page}`,
  REVIEW_FAVED: (type: FoodCourt): string => `review-faved-${type}`,
  REVIEW_TOP_5_RECENT: (type: FoodCourt): string =>
    `review-top-5-recent-${type}`,
  REVIEW_TOP_5_LIKED: (type: FoodCourt): string => `review-top-5-liked-${type}`,
  REVIEW_RATING_COUNT: (type: FoodCourt, foodId: number): string =>
    `review-rating-count-${type}-${foodId}`,
  REVIEW_AVERAGE_RATING: (type: FoodCourt, foodId: number): string =>
    `review-average-rating-${type}-${foodId}`,
  REVIEW_FAVED_COUNT: (type: FoodCourt, reviewId: number): string =>
    `review-faved-count-${type}-${reviewId}`,
  REVIEW_COUNT_TYPE: (type: FoodCourt, foodId: number): string =>
    `review-count-${type}-${foodId}`,
};
