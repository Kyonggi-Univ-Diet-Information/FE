'use client';

import { useCallback, useEffect, useRef } from 'react';
import useSWRInfinite from 'swr/infinite';

import { type FoodCourt } from '@/shared/config';
import { Loader } from '@/shared/ui';

import ReviewItem from './ReviewItem';
import { reviewsFetcher, REVIEW_SWR_KEYS, PagedReviewResponse } from '../api/reviewSWR';

interface ReviewInfiniteListProps {
  type: FoodCourt;
  foodId: number;
  initialData: PagedReviewResponse;
}

export default function ReviewInfiniteList({
  type,
  foodId,
  initialData,
}: ReviewInfiniteListProps) {
  const getKey = (pageIndex: number, previousPageData: PagedReviewResponse | null) => {
    if (previousPageData && previousPageData.last) return null;
    return [...REVIEW_SWR_KEYS.PAGED_REVIEWS(type, foodId), pageIndex];
  };

  const { data, size, setSize, isValidating, mutate } = useSWRInfinite<PagedReviewResponse>(
    getKey,
    reviewsFetcher,
    {
      fallbackData: [initialData],
      revalidateFirstPage: true,
      revalidateOnMount: true,
      revalidateOnFocus: false,
      dedupingInterval: 0,
    }
  );

  useEffect(() => {
    mutate([initialData], { revalidate: false });
  }, [initialData, mutate]);

  const reviews = data ? data.flatMap((page) => page.content) : [];
  const isEmpty = data?.[0]?.content.length === 0;
  const isLast = data ? data[data.length - 1].last : false;
  const isLoadingMore = isValidating && size > 1;

  const observerRef = useRef<HTMLDivElement>(null);

  const fetchMoreReviews = useCallback(() => {
    if (isValidating || isLast) return;
    setSize(size + 1);
  }, [isValidating, isLast, setSize, size]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLast && !isValidating) {
          fetchMoreReviews();
        }
      },
      { threshold: 0, rootMargin: '200px' },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [isLast, isValidating, fetchMoreReviews]);

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col'>
        {reviews.map((review) => (
          <ReviewItem
            key={review.id}
            type={type}
            foodId={foodId}
            {...review}
            isAuthenticated={data?.[0]?.isAuthenticated ?? false}
          />
        ))}
      </div>
      
      {!isLast && !isEmpty && (
        <div ref={observerRef} className='flex justify-center py-8 h-20'>
          {isLoadingMore && <Loader />}
        </div>
      )}
    </div>
  );
}
