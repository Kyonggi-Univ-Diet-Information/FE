import { getTranslations } from 'next-intl/server';
import { ReviewItem } from '.';
import { getReviewService, MenuType } from '../services/reviewService';

interface ReviewPagedViewProps {
  foodId: number;
  pageNo: number;
  menuType: MenuType;
}

export default async function ReviewPagedView({
  foodId,
  pageNo,
  menuType,
}: ReviewPagedViewProps) {
  const t = await getTranslations('reviewPage');
  const reviewService = getReviewService(menuType);
  const reviews = await reviewService.fetchReviews(foodId, pageNo);

  if (reviews.content.length === 0) {
    return (
      <div className='mt-10 text-center text-gray-500'>{t('noReviews')}</div>
    );
  }

  return (
    <div className='flex flex-col gap-2'>
      {reviews.content.map(review => (
        <ReviewItem key={review.id} {...review} />
      ))}
    </div>
  );
}
