import { CampusMenuName } from '@/entities/campus-menu';

import { FOOD_COURT_ID, type FoodCourt } from '@/shared/config';
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
          title={
            <>
              <span className='font-tossFace'>🔥</span> 인기 리뷰
            </>
          }
          subtitle='리뷰를 클릭해 해당 메뉴의 리뷰를 확인해보세요!'
        />
        <div className='flex flex-col gap-2'>
          {popularReviews.map((review, index) => (
            <ReviewCard
              key={review.reviewId}
              review={review}
              index={index}
              foodCourt={type}
              foodCourtId={FOOD_COURT_ID[type]}
            />
          ))}
        </div>
      </Section>

      <Section>
        <Section.Header
          title={
            <>
              <span className='font-tossFace'>✨</span> 최근 리뷰
            </>
          }
          subtitle='최근에 작성된 리뷰들이에요!'
        />
        <div className='flex flex-col gap-2'>
          {recentReviews.map((review, index) => (
            <ReviewCard
              key={review.reviewId}
              review={review}
              index={index}
              foodCourt={type}
              foodCourtId={FOOD_COURT_ID[type]}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}

function ReviewCard({
  review,
  index,
  foodCourt,
  foodCourtId,
}: {
  review: TopReview;
  index: number;
  foodCourt: FoodCourt;
  foodCourtId: string;
}) {
  return (
    <ReviewAnimatedCard index={index}>
      <Card href={`/review/${foodCourtId}/${review.foodId}`} className='h-34'>
        <div className='flex items-center justify-between'>
          <span className='font-tossFace'>{'⭐️'.repeat(review.rating)}</span>
          <p className='flex items-center gap-1 text-sm'>
            <span className='font-tossFace'>👍</span>
            {review.favoriteCount}
          </p>
        </div>
        <CampusMenuName
          foodCourt={foodCourt}
          menuId={review.foodId}
          className='text-sm font-semibold'
        />
        <p className='line-clamp-2 text-sm'>{review.content}</p>
      </Card>
    </ReviewAnimatedCard>
  );
}
