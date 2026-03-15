import type { RecentReview } from '@/entities/review/model/review';

import { memberKeys } from '@/shared/lib/queryKey';

import { ENDPOINT } from '@/api/config';
import type { BasePagedResponse } from '@/api/config/api-base-types';
import { Http } from '@/api/config/api-handlers';

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
