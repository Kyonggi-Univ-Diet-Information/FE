import { getTranslations } from 'next-intl/server';

import { type FoodCourt } from '@/shared/config';
import { AuthService } from '@/shared/lib/auth';

import ReviewItem from './ReviewItem';
import { fetchReviewTop5Recent } from '../api/fetchReview';
import { fetchReviewFaved } from '../api/fetchReviewFaved';

interface ReviewViewProps {
  type: FoodCourt;
}

export default async function ReviewView({ type }: ReviewViewProps) {
  const t = await getTranslations('reviewPage');
  const isAuthenticated = await AuthService.isAuthenticated();
  const likedReviewItems = isAuthenticated
    ? await fetchReviewFaved(type)
    : Promise.resolve([]);

  const reviews = await fetchReviewTop5Recent(type);

  const likedReviewIds = likedReviewItems
    ? (await likedReviewItems).map(
        (item: { kyongsulFoodReviewId: number }) => item.kyongsulFoodReviewId,
      )
    : [];

  if (reviews.length === 0) {
    return (
      <div className='mt-10 text-center text-gray-500'>{t('noReviews')}</div>
    );
  }

  return (
    <div className='flex flex-col gap-2'>
      {reviews.map(review => (
        <ReviewItem
          key={review.id}
          type={type}
          {...review}
          isLiked={isAuthenticated && likedReviewIds.includes(review.id)}
        />
      ))}
    </div>
  );
}
