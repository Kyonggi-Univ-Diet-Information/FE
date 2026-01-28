import type { RecentReview } from '@/entities/review/model/review';

import type { BasePagedResponse } from '@/shared/api/baseResponse';
import { Http } from '@/shared/api/http';
import { ENDPOINT } from '@/shared/config';
import { memberKeys } from '@/shared/lib/queryKey';

export const fetchUserReview = async (
  page: number,
): Promise<BasePagedResponse<RecentReview[]>> => {
  const data = await Http.get<BasePagedResponse<RecentReview[]>>({
    request: ENDPOINT.MEMBER.MEMBER_REVIEW,
    params: {
      page,
    },
    authorize: true,
    cache: 'force-cache',
    next: {
      tags: [memberKeys.reviews.tag(page)],
      revalidate: 60 * 5,
    },
  });
  return data;
};
