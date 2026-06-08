'use server';

import { ENDPOINT, type FoodCourt } from '@/api/config';
import { Http } from '@/api/config/api-handlers';

import { runServerAction, type ServerActionResult } from '@/model/common/serverAction';

export const submitReviewReport = async (
  reviewId: number,
  type: FoodCourt,
  reasonType: string,
): Promise<ServerActionResult> =>
  runServerAction(
    () =>
      Http.post({
        request: ENDPOINT.REVIEW_REPORT.REPORT(type, reviewId, reasonType),
        authorize: true,
      }),
    '리뷰 신고에 실패했습니다',
  );
