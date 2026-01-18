'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { type FoodCourt } from '@/shared/config';
import { Loader } from '@/shared/ui';

import ReviewItem from './ReviewItem';
import { getReviewsAction, ReviewWithMetadata } from '../api/getReviewsAction';

interface ReviewInfiniteListProps {
  type: FoodCourt;
  foodId: number;
  initialData: {
    content: ReviewWithMetadata[];
    totalPages: number;
    last: boolean;
    pageNo: number;
    isAuthenticated: boolean;
  };
}

export default function ReviewInfiniteList({
  type,
  foodId,
  initialData,
}: ReviewInfiniteListProps) {
  const [reviews, setReviews] = useState<ReviewWithMetadata[]>(initialData.content);
  const [pageNo, setPageNo] = useState(initialData.pageNo);
  const [isLast, setIsLast] = useState(initialData.last);
  const [isLoading, setIsLoading] = useState(false);

  const handleLikeUpdate = (
    reviewId: number,
    isLiked: boolean,
    count: number,
  ) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, isLiked, likedCount: count } : r,
      ),
    );
  };

  const observerRef = useRef<HTMLDivElement>(null);

  const fetchMoreReviews = useCallback(async () => {
    if (isLoading || isLast) return;

    setIsLoading(true);
    try {
      const nextPage = pageNo + 1;
      const data = await getReviewsAction(type, foodId, nextPage);

      setReviews((prev) => [...prev, ...data.content]);
      setPageNo(data.pageNo);
      setIsLast(data.last);
    } catch (error) {
      console.error('Failed to fetch more reviews:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, isLast, pageNo, type, foodId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLast && !isLoading) {
          fetchMoreReviews();
        }
      },
      { threshold: 0, rootMargin: '200px' },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [isLast, isLoading, fetchMoreReviews]);

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col'>
        {reviews.map((review) => (
          <ReviewItem
            key={review.id}
            type={type}
            foodId={foodId}
            {...review}
            isAuthenticated={initialData.isAuthenticated}
            onLikeUpdate={handleLikeUpdate}
          />
        ))}
      </div>
      
      {!isLast && (
        <div ref={observerRef} className='flex justify-center py-8 h-20'>
          {isLoading && <Loader />}
        </div>
      )}
    </div>
  );
}
