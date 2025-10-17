import { ENDPOINT } from '@/lib/axios';
import { KEY } from '@/lib/constants';
import { Http } from '@/shared/api/http';

export const fetchCampusReviewLikeCount = async (reviewId: number) => {
  const data = await Http.get<number>({
    request: ENDPOINT.KS_REVIEW_LIKED_COUNT + reviewId,
    cache: 'force-cache',
    next: {
      tags: [KEY.KS_REVIEW_LIKED_COUNT(reviewId)],
      revalidate: 60 * 5,
    },
  });

  return data;
};
