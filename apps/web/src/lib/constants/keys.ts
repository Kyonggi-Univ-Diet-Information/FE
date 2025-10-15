export const KEY = {
  AUTH_STATUS: 'auth-status',
  KS_REVIEW: (foodId: number): string => `ks-review-${foodId}`,
  KS_REVIEW_PAGINATION: (foodId: number, page: number): string =>
    `ks-review-pagination-${foodId}-${page}`,
  REVIEW: (foodId: number): string => `review-${foodId}`,
  REVIEW_PAGINATION: (foodId: number, page: number): string =>
    `review-pagination-${foodId}-${page}`,
  REVIEW_LIKED: 'member-review-liked',
  KS_REVIEW_LIKED: 'member-ks-review-liked',
  KS_REVIEW_LIKED_COUNT: (reviewId: number): string =>
    `ks-review-liked-count-${reviewId}`,
  REVIEW_LIKED_COUNT: (reviewId: number): string =>
    `review-liked-count-${reviewId}`,
  KS_REVIEW_COUNT: (reviewId: number): string => `ks-review-count-${reviewId}`,
  REVIEW_COUNT: (reviewId: number): string => `review-count-${reviewId}`,
};
