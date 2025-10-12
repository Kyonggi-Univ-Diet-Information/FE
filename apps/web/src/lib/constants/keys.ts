export const KEY = {
  AUTH_STATUS: 'auth-status',
  KS_REVIEW: (foodId: number): string => `ks-review-${foodId}`,
  KS_REVIEW_PAGINATION: (foodId: number, page: number): string =>
    `ks-review-pagination-${foodId}-${page}`,
};
