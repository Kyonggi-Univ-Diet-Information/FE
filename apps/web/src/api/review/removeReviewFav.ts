'use server';


import { ENDPOINT, type FoodCourt } from '@/api/config';
import { Http } from '@/api/config/api-handlers';

import { runServerAction, type ServerActionResult } from '@/model/common/serverAction';
import { revalidateReviewFavCache } from '@/model/review/revalidateReviewCache';


export const removeReviewFav = async (
  reviewId: number,
  type: FoodCourt,
): Promise<ServerActionResult> =>
  runServerAction(async () => {
    await Http.del({
      request: ENDPOINT.REVIEW_LIKE.UNLIKE(type, reviewId),
      authorize: true,
    });

    revalidateReviewFavCache(type, reviewId);
  }, '리뷰 좋아요 삭제에 실패했습니다');
