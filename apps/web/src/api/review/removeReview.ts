'use server';


import { ENDPOINT, type FoodCourt } from '@/api/config';
import { Http } from '@/api/config/api-handlers';

import { runServerAction, type ServerActionResult } from '@/model/common/serverAction';
import { revalidateReviewCache } from '@/model/review/revalidateReviewCache';


export const removeReview = async (
  reviewId: number,
  foodId: number,
  type: FoodCourt,
): Promise<ServerActionResult> =>
  runServerAction(async () => {
    await Http.del({
      request: ENDPOINT.REVIEW_CUD.DELETE(type, reviewId),
      authorize: true,
    });

    revalidateReviewCache({ type, foodId });
  }, '리뷰 삭제에 실패했습니다');
