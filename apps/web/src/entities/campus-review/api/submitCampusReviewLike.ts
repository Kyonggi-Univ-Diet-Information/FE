'use server';

import { Http } from '@/shared/api/http';
import { ENDPOINT, FOOD_COURT, KEY } from '@/shared/config';
import { revalidateTag } from 'next/cache';

export const submitCampusReviewLike = async (reviewId: number) => {
  await Http.post({
    request: ENDPOINT.REVIEW_LIKE.LIKE(FOOD_COURT.KYONGSUL, reviewId),
    authorize: true,
  }).catch(error => {
    console.log('submitCampusReviewLike', error);
    return {
      success: false,
      error: error.message || '리뷰 좋아요 등록에 실패했습니다',
    };
  });

  revalidateTag(KEY.KS_REVIEW_LIKED);
  revalidateTag(KEY.KS_REVIEW_LIKED_COUNT(reviewId));

  return { success: true };
};
