'use server';

import { Http } from '@/shared/api/http';
import { ENDPOINT, KEY } from '@/shared/config';
import { revalidateTag } from 'next/cache';

export const removeCampusReviewLike = async (reviewId: number) => {
  await Http.del({
    request: ENDPOINT.KS_REVIEW_UNLIKE.replace(
      '{reviewId}',
      reviewId.toString(),
    ),
    authorize: true,
  }).catch(error => ({ success: false, error }));

  revalidateTag(KEY.KS_REVIEW_LIKED);
  revalidateTag(KEY.KS_REVIEW_LIKED_COUNT(reviewId));

  return { success: true };
};
