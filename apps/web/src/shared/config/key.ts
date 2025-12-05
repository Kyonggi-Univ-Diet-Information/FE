import type { FoodCourt } from './endpoint';

export const COOKIE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
} as const;

export const KEY = {
  AUTH_STATUS: 'auth-status',
  DORM_MENU: 'dorm-menu',
  MEMBER_INFO: 'member-info',
  MEMBER_FAV_REVIEW: (page: number): string => `member-fav-review-${page}`,
  MEMBER_REVIEW: (page: number): string => `member-review-${page}`,
  TOP_MENU: 'top-menu',
  RECENT_REVIEW: 'recent-review',
  REVIEW: (type: FoodCourt, foodId: number): string =>
    `review-${type}-${foodId}`,
  REVIEW_PAGINATION: (type: FoodCourt, foodId: number, page: number): string =>
    `review-pagination-${type}-${foodId}-${page}`,
  REVIEW_LIKED: 'member-review-liked',
  REVIEW_COUNT: (type: FoodCourt, foodId: number): string =>
    `review-count-${type}-${foodId}`,
  REVIEW_PAGED: (type: FoodCourt, foodId: number, page: number): string =>
    `review-paged-${type}-${foodId}-${page}`,
  REVIEW_FAVED: (type: FoodCourt): string => `review-faved-${type}`,
  REVIEW_RATING_COUNT: (type: FoodCourt, foodId: number): string =>
    `review-rating-count-${type}-${foodId}`,
  REVIEW_AVERAGE_RATING: (type: FoodCourt, foodId: number): string =>
    `review-average-rating-${type}-${foodId}`,
  REVIEW_FAVED_COUNT: (type: FoodCourt, reviewId: number): string =>
    `review-faved-count-${type}-${reviewId}`,
};
