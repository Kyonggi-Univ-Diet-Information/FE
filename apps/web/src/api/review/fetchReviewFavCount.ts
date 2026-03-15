import { ENDPOINT, type FoodCourt } from '@/api/config';
import { Http } from '@/api/config/api-handlers';
import { reviewKeys } from '@/model/common/queryKey';

export const fetchReviewFavCount = async (
  type: FoodCourt,
  reviewId: number,
) => {
  const data = await Http.get<number>({
    request: ENDPOINT.REVIEW_LIKE.LIKED_COUNT(type, reviewId),
    cache: 'force-cache',
    next: {
      tags: [reviewKeys.favedCount.tag(type, reviewId)],
      revalidate: 60 * 5,
    },
  });

  return data;
};
