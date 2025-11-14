'use server';

import { revalidateTag } from 'next/cache';

import { Http } from '@/shared/api/http';
import { ENDPOINT, type FoodCourt, KEY } from '@/shared/config';

export const removeReview = async (reviewId: number, type: FoodCourt) => {
  await Http.del({
    request: ENDPOINT.REVIEW_CUD.DELETE(type, reviewId),
    authorize: true,
  }).catch(error => ({
    success: false,
    error: error.message || '리뷰 삭제에 실패했습니다',
  }));

  revalidateTag(KEY.REVIEW(type, reviewId));
  revalidateTag(KEY.REVIEW_COUNT(type, reviewId));
  revalidateTag(KEY.REVIEW_AVERAGE_RATING(type, reviewId));
  revalidateTag(KEY.REVIEW_RATING_COUNT(type, reviewId));
  revalidateTag(KEY.MEMBER_REVIEW(0, type));

  return { success: true };
};
