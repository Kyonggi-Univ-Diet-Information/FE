'use server';

import { ENDPOINT } from '@/lib/axios';
import { KEY } from '@/lib/constants';
import { AuthService } from '@/lib/services';
import { MenuType } from './reviewService';
import { revalidateTag } from 'next/cache';

export const removeReviewLike = async (
  reviewId: number,
  menuType: MenuType = 'campus',
) => {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || 'https://api.kiryong.kr/api';
    const endpoint =
      menuType === 'campus'
        ? ENDPOINT.KS_REVIEW_UNLIKE
        : ENDPOINT.REVIEW_UNLIKE;

    const response = await fetch(
      `${apiUrl}${endpoint.replace('{reviewId}', reviewId.toString())}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await AuthService.getAccessToken()}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('리뷰 좋아요 취소에 실패했습니다');
    }

    revalidateTag(
      menuType === 'campus' ? KEY.KS_REVIEW_LIKED : KEY.REVIEW_LIKED,
    );

    revalidateTag(
      menuType === 'campus'
        ? KEY.KS_REVIEW_LIKED_COUNT(reviewId)
        : KEY.REVIEW_LIKED_COUNT(reviewId),
    );

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error };
  }
};
