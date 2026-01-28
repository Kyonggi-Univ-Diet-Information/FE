import { Http } from '@/shared/api/http';
import { ENDPOINT } from '@/shared/config';
import { reviewKeys } from '@/shared/lib/queryKey';

import type { RecentReview } from '../model/review';

export const fetchRecentReview = async (): Promise<RecentReview[]> => {
  const data = await Http.get<{ result: RecentReview[] }>({
    request: ENDPOINT.REVIEW_R.RECENT_REVIEW,
    cache: 'force-cache',
    next: { tags: [reviewKeys.recent.tag()], revalidate: 60 * 5 },
  });

  return data.result;
};
