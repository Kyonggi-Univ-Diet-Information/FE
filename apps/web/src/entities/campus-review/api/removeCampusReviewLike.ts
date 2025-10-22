'use server';

import { Http } from '@/shared/api/http';
import { ENDPOINT, FOOD_COURT, KEY } from '@/shared/config';
import { revalidateTag } from 'next/cache';

export const removeCampusReviewLike = async (reviewId: number) => {
  await Http.del({
    request: ENDPOINT.REVIEW_LIKE.UNLIKE(FOOD_COURT.KYONGSUL, reviewId),
    authorize: true,
  }).catch(error => ({ success: false, error }));

  revalidateTag(KEY.KS_REVIEW_LIKED);
  revalidateTag(KEY.KS_REVIEW_LIKED_COUNT(reviewId));

  return { success: true };
};
