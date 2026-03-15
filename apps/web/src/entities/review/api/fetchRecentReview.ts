import { AuthService } from '@/shared/lib/auth';
import { reviewKeys } from '@/shared/lib/queryKey';

import type { RecentReview } from '../model/review';

import { ENDPOINT } from '@/api/config';
import { Http } from '@/api/config/api-handlers';

export const fetchRecentReview = async (): Promise<RecentReview[]> => {
  const isAuthenticated = await AuthService.isAuthenticated();
  const data = await Http.get<{ result: RecentReview[] }>({
    request: ENDPOINT.REVIEW_R.RECENT_REVIEW,
    cache: 'force-cache',
    authorize: isAuthenticated,
    next: { tags: [reviewKeys.recent.tag()], revalidate: 60 * 5 },
  });

  return data.result;
};
