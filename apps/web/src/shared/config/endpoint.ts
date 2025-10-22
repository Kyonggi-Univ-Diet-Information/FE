export const PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.kiryong.kr/api';

export const RESTAURANT = {
  KYONGSUL: 'KYONGSUL',
  DORMITORY: 'DORMITORY',
};

export const ENDPOINT = {
  CAMPUS_MENU: '/food/KYONGSUL/all',
  CAMPUS_MENU_BY_RESTAURANT: '/food/KYONGSUL/restaurant/',
  CAMPUS_MENU_NAME: '/food/KYONGSUL/get-names/',

  DORM_MENU: '/diet-content/dormitory',
  DORM_MENU_BY_DAY: '/diet-content/dormitory/dow/',

  KS_REVIEW_RATING_COUNT: '/review/KYONGSUL/rating-count/',
  KS_REVIEW_AVERAGE_RATING: '/review/KYONGSUL/average/',
  KS_REVIEW_PAGINATION: '/review/KYONGSUL/paged/',
  KS_REVIEW_SUBMIT: '/review/KYONGSUL/new/',

  KS_REVIEW_LIKE: '/review/favorite/KYONGSUL/{reviewId}/create-favorite',
  KS_REVIEW_UNLIKE: '/review/favorite/KYONGSUL/delete/{reviewId}',
  KS_REVIEW_LIKED_COUNT: '/review/favorite/KYONGSUL/count/',
  KS_REVIEW_COUNT: '/review/KYONGSUL/count/',

  KAKAO_LOGIN: '/kakao-login',

  REVIEW_RATING_COUNT: '/review/DORMITORY/rating-count/',
  REVIEW_AVERAGE_RATING: '/review/DORMITORY/average/',
  REVIEW_PAGINATION: '/review/DORMITORY/paged/',
  REVIEW_SUBMIT: '/review/DORMITORY/new/',

  REVIEW_LIKE: '/review/favorite/DORMITORY/{reviewId}/create-favorite',
  REVIEW_UNLIKE: '/review/favorite/DORMITORY/delete/{reviewId}',
  REVIEW_LIKED_COUNT: '/review/favorite/DORMITORY/count/',
  REVIEW_COUNT: '/review/DORMITORY/count/',

  MEMBER_KS_REVIEW_LIKED: '/review/favorite/KYONGSUL/each-member/all',
  MEMBER_REVIEW_LIKED: '/review/favorite/DORMITORY/each-member/all',
};
