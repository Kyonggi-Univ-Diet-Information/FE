import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import ReviewItem from '@/widgets/review/ui/ReviewItem';

import { type FoodCourt } from '@/shared/config';
import { AuthService } from '@/shared/lib/auth';
import { Pagination } from '@/shared/ui';

import { fetchReviewFaved } from '../api/fetchReviewFaved';
import { fetchReviewPaged } from '../api/fetchReviewPaged';

interface ReviewPagedViewProps {
  type: FoodCourt;
  foodId: number;
  pageNo: number;
}

export default async function ReviewPagedView({
  type,
  foodId,
  pageNo,
}: ReviewPagedViewProps) {
  const t = await getTranslations('reviewPage');
  const isAuthenticated = await AuthService.isAuthenticated();
  const likedReviewItems = isAuthenticated
    ? await fetchReviewFaved(type)
    : Promise.resolve([]);

  const reviews = await fetchReviewPaged(type, foodId, pageNo);
  const totalPages = reviews.totalPages;

  const likedReviewIds = likedReviewItems
    ? (await likedReviewItems).map(
        (item: { kyongsulFoodReviewId: number }) => item.kyongsulFoodReviewId,
      )
    : [];

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
          type={type}
          {...review}
          isLiked={isAuthenticated && likedReviewIds.includes(review.id)}
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
