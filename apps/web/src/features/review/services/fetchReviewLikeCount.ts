import { ENDPOINT } from '@/lib/axios';
import { KEY } from '@/lib/constants';
import { MenuType } from './reviewService';

export const fetchReviewLikeCount = async (
  reviewId: number,
  menuType: MenuType = 'campus',
) => {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || 'https://api.kiryong.kr/api';
    const endpoint =
      menuType === 'campus'
        ? ENDPOINT.KS_REVIEW_LIKED_COUNT + reviewId
        : ENDPOINT.REVIEW_LIKED_COUNT + reviewId;

    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'force-cache',
      next: {
        tags: [
          menuType === 'campus'
            ? KEY.KS_REVIEW_LIKED_COUNT(reviewId)
            : KEY.REVIEW_LIKED_COUNT(reviewId),
        ],
        revalidate: 60 * 5,
      },
    });

    if (!response.ok) {
      return 0;
    }

    const data: number = await response.json();

    return data;
  } catch (error) {
    console.error('좋아요 목록 조회 실패:', error);
    return 0;
  }
};
