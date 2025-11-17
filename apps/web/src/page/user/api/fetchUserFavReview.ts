import type { RecentReview } from '@/entities/review/model/review';

import type { BasePagedResponse } from '@/shared/api/baseResponse';
import { Http } from '@/shared/api/http';
import { KEY, ENDPOINT } from '@/shared/config';

export const fetchUserFavReview = async (
  page: number,
): Promise<BasePagedResponse<RecentReview[]>> => {
  const data = await Http.get<BasePagedResponse<RecentReview[]>>({
    request: ENDPOINT.MEMBER.MEMBER_FAV_REVIEW,
    params: {
      page,
    },
    authorize: true,
    cache: 'force-cache',
    next: {
      tags: [KEY.MEMBER_FAV_REVIEW(page)],
      revalidate: 60 * 5,
    },
  });
  return data;
};
