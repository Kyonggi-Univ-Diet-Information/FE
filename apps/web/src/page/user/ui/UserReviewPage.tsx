import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import React, { Suspense } from 'react';

import { CampusMenuName } from '@/entities/campus-menu';

import { FOOD_COURT_ID, FOOD_COURT_NAME } from '@/shared/config';
import { getRelativeDate } from '@/shared/lib/date';
import { Card, Loader, Pagination, Title } from '@/shared/ui';

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
  const data = await fetchUserReview(pageNo);
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
            <Card
              key={`${review.reviewId}-${review.foodId}`}
              href={`/review/${FOOD_COURT_ID[review.restaurantType]}/${review.foodId}`}
              className='min-h-30 max-h-34'
            >
              <div className='flex items-center justify-between'>
                <span className='font-tossFace'>
                  {'⭐️'.repeat(review.rating)}
                </span>
                <p className='flex items-center gap-1 text-sm'>
                  {getRelativeDate(new Date(review.createdAt))}
                </p>
              </div>
              <p className='flex items-center gap-1.5 text-sm font-semibold'>
                <span className='rounded-full border px-1.5 py-0.5 text-xs font-medium'>
                  {FOOD_COURT_NAME[review.restaurantType]}
                </span>

                <CampusMenuName
                  foodCourt={review.restaurantType}
                  menuId={review.foodId}
                />
              </p>

              <p className='line-clamp-2 text-sm'>{review.content}</p>
            </Card>
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
