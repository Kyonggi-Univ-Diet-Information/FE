'use client';

import type { Dispatch, SetStateAction } from 'react';

import { cn } from '@/shared/utils';

export default function StarSelector({
  selectedStars,
  setSelectedStars,
}: {
  selectedStars: number;
  setSelectedStars: Dispatch<SetStateAction<number>>;
}) {
  const Star = ({ selected, index }: { selected: boolean; index: number }) => (
    <button
      className={cn(
        'font-tossFace cursor-pointer',
        selected ? '' : 'grayscale',
      )}
      onClick={() => setSelectedStars(index + 1)}
      type='button'
    >
      ⭐️
    </button>
  );

  return (
    <div className='flex'>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} index={i} selected={selectedStars > i} />
      ))}
    </div>
  );
}
