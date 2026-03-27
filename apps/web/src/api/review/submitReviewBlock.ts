'use server';

import { revalidateTag } from 'next/cache';

import type { SubmitReviewBlockResponse } from './api.model';

import { ENDPOINT, type FoodCourt } from '@/api/config';
import { Http } from '@/api/config/api-handlers';
import { reviewKeys } from '@/model/common/queryKey';
import { revalidateReviewCache } from '@/model/review/revalidateReviewCache';

export const submitReviewBlock = async (
  reviewId: number,
  foodId: number,
  type: FoodCourt,
): Promise<SubmitReviewBlockResponse> => {
  try {
    await Http.post({
      request: ENDPOINT.REVIEW_BLOCK.BLOCK(type, reviewId),
      authorize: true,
    });

    revalidateReviewCache({ type, foodId });
    revalidateTag(reviewKeys.recent.tag());

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : '사용자 차단에 실패했습니다',
    };
  }
};
