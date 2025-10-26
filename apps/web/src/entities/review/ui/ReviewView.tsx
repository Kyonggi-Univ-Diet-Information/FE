import { CampusMenuName } from '@/entities/campus-menu';

import { type FoodCourt } from '@/shared/config';
import { Card, Section } from '@/shared/ui';

import ReviewAnimatedCard from './ReviewAnimatedCard';
import {
  fetchReviewTop5Liked,
  fetchReviewTop5Recent,
} from '../api/fetchReview';
import { TopReview } from '../model/review';

interface ReviewViewProps {
  type: FoodCourt;
}

export default async function ReviewView({ type }: ReviewViewProps) {
  const popularReviews = await fetchReviewTop5Liked(type);
  const recentReviews = await fetchReviewTop5Recent(type);

  return (
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
      <Section>
        <Section.Header
          title='인기 리뷰'
          subtitle='클릭해서 해당 메뉴의 리뷰를 확인해보세요!'
        />
        <div className='flex flex-col gap-2'>
          {popularReviews.map((review, index) => (
            <ReviewCard key={review.reviewId} review={review} index={index} />
          ))}
        </div>
      </Section>

      <Section>
        <Section.Header
          title='최근 리뷰'
          subtitle='최근 리뷰를 확인할 수 있습니다.'
        />
        <div className='flex flex-col gap-2'>
          {recentReviews.map((review, index) => (
            <ReviewCard key={review.reviewId} review={review} index={index} />
          ))}
        </div>
      </Section>
    </div>
  );
}

function ReviewCard({ review, index }: { review: TopReview; index: number }) {
  return (
    <ReviewAnimatedCard index={index}>
      <Card href={`/review/${review.foodId}`}>
        <div className='flex items-center justify-between'>
          <span className='font-tossFace'>{'⭐️'.repeat(review.rating)}</span>
          <p className='flex items-center gap-1 text-sm'>
            <span className='font-tossFace'>👍</span>
            {review.favoriteCount}
          </p>
        </div>
        <CampusMenuName
          menuId={review.foodId}
          className='text-sm font-semibold'
        />
        <p className='line-clamp-2 text-sm'>{review.content}</p>
      </Card>
    </ReviewAnimatedCard>
  );
}
