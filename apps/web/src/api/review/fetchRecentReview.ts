import type { FetchRecentReviewResponse } from './api.model';
import type { RecentReview } from './api.type';

import { ENDPOINT } from '@/api/config';
import { Http } from '@/api/config/api-handlers';
import { AuthService } from '@/model/common/auth';
import { reviewKeys } from '@/model/common/queryKey';

export const fetchRecentReview = async (): Promise<FetchRecentReviewResponse> => {
  const isAuthenticated = await AuthService.isAuthenticated();
  const data = await Http.get<{ result: RecentReview[] }>({
    request: ENDPOINT.REVIEW_R.RECENT_REVIEW,
    cache: 'force-cache',
    authorize: isAuthenticated,
    next: { tags: [reviewKeys.recent.tag()], revalidate: 60 * 5 },
  });

  return data.result;
};
