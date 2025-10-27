import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import React, { Suspense } from 'react';

import ReviewItem from '@/entities/review/ui/ReviewItem';

import { Loader, Pagination, Title } from '@/shared/ui';

import { fetchUserFavReview } from '../api/fetchUserFavReview';

export interface UserFavReviewPageProps {
  searchParams: Promise<{
    reviewMode?: string;
    pageNo?: number;
  }>;
}

export default async function UserFavReviewPage({
  searchParams,
}: UserFavReviewPageProps) {
  const { pageNo = 0 } = await searchParams;
  const data = await fetchUserFavReview(pageNo, 'KYONGSUL');
  const totalPages = data?.totalPages;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <>
      <div className='flex flex-col gap-1'>
        <Title>좋아요한 리뷰</Title>
        <p className='text-sm text-gray-500'>
          좋아요한 리뷰를 확인할 수 있습니다.
        </p>
      </div>

      <Suspense fallback={<Loader />}>
        {data?.content.length === 0 && (
          <div className='mt-10 text-center text-gray-500'>
            좋아요한 리뷰가 없어요!
          </div>
        )}
        <div className='flex flex-col gap-2'>
          {data?.content.map(review => (
            <ReviewItem
              key={review.id}
              type='KYONGSUL'
              isLiked={true}
              {...review}
            />
          ))}
        </div>
      </Suspense>

      {totalPages > 1 && (
        <Pagination className='mt-2 gap-2'>
          <Pagination.Link
            disabled={pageNo === 0}
            href={`/user/fav?pageNo=${pageNo - 1}`}
          >
            <ChevronLeftIcon />
          </Pagination.Link>
          {pageNumbers.map(pageNumber => (
            <Pagination.Link
              isActive={pageNumber === pageNo}
              key={pageNumber}
              href={`/user/fav?pageNo=${pageNumber}`}
            >
              {pageNumber + 1}
            </Pagination.Link>
          ))}
          <Pagination.Link
            disabled={pageNo === totalPages - 1}
            href={`/user/fav?pageNo=${pageNo + 1}`}
          >
            <ChevronRightIcon />
          </Pagination.Link>
        </Pagination>
      )}
    </>
  );
}
