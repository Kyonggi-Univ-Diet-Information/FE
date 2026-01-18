'use client';

import { HeartIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useOptimistic, useTransition } from 'react';

import { type FoodCourt } from '@/shared/config';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/utils';

import { removeReviewFav } from '../api/removeReviewFav';
import { submitReviewFav } from '../api/submitReviewFav';

interface ReviewLikeButtonProps {
  type: FoodCourt;
  reviewId: number;
  initialIsLiked: boolean;
  likedCount: number;
  isDisabled: boolean;
}

export default function ReviewLikeButton({
  type,
  reviewId,
  initialIsLiked,
  likedCount,
  isDisabled,
}: ReviewLikeButtonProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(initialIsLiked);
  const [optimisticLikedCount, setOptimisticLikedCount] =
    useOptimistic(likedCount);

  const handleLikeToggle = async () => {
    if (isDisabled) return;

    startTransition(async () => {
      const isCurrentlyLiked = optimisticLiked;
      const currentCount = optimisticLikedCount;

      setOptimisticLiked(!isCurrentlyLiked);
      setOptimisticLikedCount(
        isCurrentlyLiked ? Math.max(0, currentCount - 1) : currentCount + 1,
      );

      if (isCurrentlyLiked) {
        await removeReviewFav(reviewId, type);
      } else {
        await submitReviewFav(reviewId, type);
      }
    });
  };

  return (
    <Button
      disabled={isDisabled}
      variant='ghost'
      size='sm'
      onClick={handleLikeToggle}
      className={cn(
        'group h-8 gap-1.5 rounded-full px-3 transition-all active:scale-95',
        optimisticLiked
          ? 'bg-point/10 text-point hover:bg-point/20'
          : 'bg-gray-50 text-gray-400 hover:bg-gray-100',
      )}
    >
      <motion.div
        animate={optimisticLiked ? { scale: [1, 1.4, 1] } : { scale: 1 }}
        transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }}
      >
        <HeartIcon
          className={cn(
            'size-3.5 transition-colors',
            optimisticLiked ? 'fill-current' : 'fill-none stroke-[2.5px]',
          )}
        />
      </motion.div>
      <span className='text-xs font-bold tabular-nums'>
        {optimisticLikedCount}
      </span>
    </Button>
  );
}
