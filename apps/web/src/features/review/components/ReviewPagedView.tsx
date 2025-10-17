import { getTranslations } from 'next-intl/server';
import { ReviewItem } from '.';
import { getReviewService, MenuType, fetchReviewLiked } from '../services';
import { Pagination } from '@/shared/ui';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface ReviewPagedViewProps {
  foodId: number;
  pageNo: number;
  menuType: MenuType;
  totalPages: number;
}

export default async function ReviewPagedView({
  foodId,
  pageNo,
  totalPages,
  menuType,
}: ReviewPagedViewProps) {
  const t = await getTranslations('reviewPage');
  const reviewService = getReviewService(menuType);
  const [reviews, likedReviewIds] = await Promise.all([
    reviewService.fetchReviews(foodId, pageNo),
    fetchReviewLiked(menuType),
  ]);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

  if (reviews.content.length === 0) {
    return (
      <div className='mt-10 text-center text-gray-500'>{t('noReviews')}</div>
    );
  }

  return (
    <div className='flex flex-col gap-2'>
      {reviews.content.map(review => (
        <ReviewItem
          key={review.id}
          {...review}
          menuType={menuType}
          isLiked={likedReviewIds.includes(review.id)}
        />
      ))}
      <Pagination className='mt-2 gap-2'>
        <Pagination.Link
          disabled={pageNo === 0}
          href={`/review/${foodId}?pageNo=${pageNo - 1}`}
        >
          <ChevronLeftIcon />
        </Pagination.Link>
        {pageNumbers.map(pageNumber => (
          <Pagination.Link
            isActive={pageNumber === pageNo}
            key={pageNumber}
            href={`/review/${foodId}?pageNo=${pageNumber}`}
          >
            {pageNumber + 1}
          </Pagination.Link>
        ))}
        <Pagination.Link
          disabled={pageNo === totalPages - 1}
          href={`/review/${foodId}?pageNo=${pageNo + 1}`}
        >
          <ChevronRightIcon />
        </Pagination.Link>
      </Pagination>
    </div>
  );
}
