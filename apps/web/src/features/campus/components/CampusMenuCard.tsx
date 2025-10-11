import Link from 'next/link';

import { MessageSquareText } from 'lucide-react';
import type { CampusMenu } from '@/types';

export default function CampusMenuCard({ id, name, price }: CampusMenu) {
  return (
    <div
      className='flex w-full justify-between rounded-2xl bg-gray-100/50 p-4 text-gray-600'
      key={id}
    >
      <div className='flex flex-col'>
        <span className='font-medium'>{name}</span>
        <span className='text-sm text-gray-900/40'>{price}원</span>
      </div>
      <div className='flex items-start'>
        <Link
          href={`/review/${id}`}
          className='group flex cursor-pointer items-center gap-1 rounded-xl border px-2 py-0.5 hover:bg-gray-200 active:bg-gray-300'
        >
          <MessageSquareText
            size={14}
            className='text-gray-900/40 group-hover:text-gray-900/80 group-active:text-gray-900/80'
          />
          <span className='text-sm text-gray-900/40 group-hover:text-gray-900/80 group-active:text-gray-900/80'>
            리뷰 {0}
          </span>
        </Link>
      </div>
    </div>
  );
}
