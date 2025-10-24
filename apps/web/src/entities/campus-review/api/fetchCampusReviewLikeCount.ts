import { Http } from '@/shared/api/http';
import { ENDPOINT, FOOD_COURT } from '@/shared/config';
import { KEY } from '@/shared/config';

export const fetchCampusReviewLikeCount = async (reviewId: number) => {
  const data = await Http.get<number>({
    request: ENDPOINT.REVIEW_LIKE.LIKED_COUNT(FOOD_COURT.KYONGSUL, reviewId),
    cache: 'force-cache',
    next: {
      tags: [KEY.KS_REVIEW_LIKED_COUNT(reviewId)],
      revalidate: 60 * 5,
    },
  });

  return data;
};
