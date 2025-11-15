import { Http } from '@/shared/api/http';
import { KEY, ENDPOINT } from '@/shared/config';

import type { RecentReview } from '../model/review';

export const fetchRecentReview = async (): Promise<RecentReview[]> => {
  const data = await Http.get<{ result: RecentReview[] }>({
    request: ENDPOINT.REVIEW_R.RECENT_REVIEW,
    cache: 'force-cache',
    next: { tags: [KEY.RECENT_REVIEW], revalidate: 60 * 5 },
  });

  return data.result;
};
