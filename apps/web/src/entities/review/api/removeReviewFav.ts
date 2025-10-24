'use server';

import { revalidateTag } from 'next/cache';

import { Http } from '@/shared/api/http';
import { ENDPOINT, type FoodCourt, KEY } from '@/shared/config';

export const removeReviewFav = async (reviewId: number, type: FoodCourt) => {
  await Http.del({
    request: ENDPOINT.REVIEW_LIKE.UNLIKE(type, reviewId),
    authorize: true,
  }).catch(error => ({
    success: false,
    error: error.message || '리뷰 좋아요 삭제에 실패했습니다',
  }));

  revalidateTag(KEY.REVIEW_FAVED(type));
  revalidateTag(KEY.REVIEW_FAVED_COUNT(type, reviewId));

  return { success: true };
};
