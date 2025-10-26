import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import React, { Suspense } from 'react';

import { fetchReviewFaved } from '@/entities/review/api/fetchReviewFaved';
import ReviewItem from '@/entities/review/ui/ReviewItem';

import { Loader, Pagination, Title } from '@/shared/ui';

import { fetchUserReview } from '../api/fetchUserReview';

export interface UserReviewPageProps {
  searchParams: Promise<{
    reviewMode?: string;
    pageNo?: number;
  }>;
}

export default async function UserReviewPage({
  searchParams,
}: UserReviewPageProps) {
  const { pageNo = 0 } = await searchParams;
  const data = await fetchUserReview(pageNo, 'KYONGSUL');
  const likedReviewItems = await fetchReviewFaved('KYONGSUL');

  const totalPages = data?.totalPages;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <>
      <div className='flex flex-col gap-1'>
        <Title>작성한 리뷰</Title>
        <p className='text-sm text-gray-500'>
          내가 작성한 리뷰를 확인할 수 있습니다.
        </p>
      </div>

      <Suspense fallback={<Loader />}>
        {data?.content.length === 0 && (
          <div className='mt-10 text-center text-gray-500'>
            작성한 리뷰가 없어요!
          </div>
        )}
        <div className='flex flex-col gap-2'>
          {data?.content.map(review => (
            <ReviewItem
              key={review.id}
              type='KYONGSUL'
              isLiked={likedReviewItems.some(
                (item: { kyongsulFoodReviewId: number }) =>
                  item.kyongsulFoodReviewId === review.id,
              )}
              {...review}
            />
          ))}
        </div>
      </Suspense>

      {totalPages > 1 && (
        <Pagination className='mt-2 gap-2'>
          <Pagination.Link
            disabled={pageNo === 0}
            href={`/user/my?pageNo=${pageNo - 1}`}
          >
            <ChevronLeftIcon />
          </Pagination.Link>
          {pageNumbers.map(pageNumber => (
            <Pagination.Link
              isActive={pageNumber === pageNo}
              key={pageNumber}
              href={`/user/my?pageNo=${pageNumber}`}
            >
              {pageNumber + 1}
            </Pagination.Link>
          ))}
          <Pagination.Link
            disabled={pageNo === totalPages - 1}
            href={`/user/my?pageNo=${pageNo + 1}`}
          >
            <ChevronRightIcon />
          </Pagination.Link>
        </Pagination>
      )}
    </>
  );
}
