'use server';

import { ENDPOINT, type FoodCourt } from '@/api/config';
import { Http } from '@/api/config/api-handlers';

import { runServerAction, type ServerActionResult } from '@/model/common/serverAction';
import { revalidateReviewCache } from '@/model/review/revalidateReviewCache';


export const submitReviewBlock = async (
  reviewId: number,
  foodId: number,
  type: FoodCourt,
): Promise<ServerActionResult> =>
  runServerAction(async () => {
    await Http.post({
      request: ENDPOINT.REVIEW_BLOCK.BLOCK(type, reviewId),
      authorize: true,
    });

    revalidateReviewCache({ type, foodId });
  }, '사용자 차단에 실패했습니다');
