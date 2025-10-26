import { Http } from '@/shared/api/http';
import { KEY, ENDPOINT, type FoodCourt } from '@/shared/config';

import { type Review } from '../model/review';

type TopReview = Review & { foodId: number };

export const fetchReviewTop5Recent = async (
  type: FoodCourt,
): Promise<TopReview[]> => {
  const data = await Http.get<TopReview[]>({
    request: `${ENDPOINT.REVIEW_R.TOP_5_RECENT(type)}`,
    cache: 'force-cache',
    next: {
      tags: [KEY.REVIEW_TOP_5_RECENT(type)],
      revalidate: 60 * 5,
    },
  });

  return data;
};

export const fetchReviewTop5Liked = async (
  type: FoodCourt,
): Promise<TopReview[]> => {
  const data = await Http.get<TopReview[]>({
    request: `${ENDPOINT.REVIEW_R.TOP_5_LIKED(type)}`,
    cache: 'force-cache',
    next: {
      tags: [KEY.REVIEW_TOP_5_LIKED(type)],
      revalidate: 60 * 5,
    },
  });

  return data;
};
