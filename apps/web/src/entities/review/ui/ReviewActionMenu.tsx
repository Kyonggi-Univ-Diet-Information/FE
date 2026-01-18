'use client';

import { MoreVertical, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

import { type FoodCourt } from '@/shared/config';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/shared/ui';

import { removeReview } from '../api/removeReview';

interface ReviewActionMenuProps {
  type: FoodCourt;
  foodId: number;
  reviewId: number;
  isMyReview: boolean;
}

export default function ReviewActionMenu({
  type,
  foodId,
  reviewId,
  isMyReview,
}: ReviewActionMenuProps) {
  const [pending, setPending] = useState(false);

  const handleAction = async (value: string) => {
    if (value === 'delete') {
      const confirmed = window.confirm('리뷰를 삭제하시겠습니까?');
      if (!confirmed) return;

      setPending(true);
      try {
        await removeReview(reviewId, foodId, type);
      } finally {
        setPending(false);
      }
    }
  };

  if (!isMyReview) return null;

  return (
    <Select onValueChange={handleAction} disabled={pending}>
      <SelectTrigger 
        icon={false} 
        className='h-8 w-8 border-none bg-transparent p-0 hover:bg-gray-100 focus:ring-0 focus:ring-offset-0 active:scale-95'
      >
        <MoreVertical className='size-5 text-gray-400' />
      </SelectTrigger>
      <SelectContent align='end' className='min-w-[120px]'>
        <SelectItem value='delete' className='text-destructive focus:text-destructive'>
          <div className='flex items-center gap-2'>
            <Trash2Icon className='size-4' />
            <span>삭제하기</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
