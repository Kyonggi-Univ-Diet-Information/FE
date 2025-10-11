'use client';

import { cn } from '@/lib/utils';
import type { Dispatch, SetStateAction } from 'react';

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
