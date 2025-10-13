import Link from 'next/link';

import { MessageSquareText } from 'lucide-react';
import type { CampusMenu } from '@/types';

interface CampusMenuCardProps extends CampusMenu {
  locale?: string;
}

export default function CampusMenuCard({
  id,
  name,
  nameEn,
  price,
  locale,
}: CampusMenuCardProps) {
  const wonText = locale === 'en' ? '₩' : '원';
  const reviewText = locale === 'en' ? 'Review' : '리뷰';
  const menuName = locale === 'en' ? nameEn : name;

  return (
    <div
      className='flex w-full justify-between rounded-2xl bg-gray-100/50 p-4 text-gray-600'
      key={id}
    >
      <div className='flex flex-col justify-between'>
        <span className='mb-2 font-medium'>{menuName}</span>
        <span className='text-sm text-gray-900/40'>
          {locale === 'en'
            ? `${wonText}${price.toLocaleString()}`
            : `${price.toLocaleString()}${wonText}`}
        </span>
      </div>
      <div className='flex items-start'>
        <Link
          href={`/review/${id}`}
          className='group flex cursor-pointer items-center gap-1 rounded-xl border bg-white px-2 py-1 duration-200 hover:bg-gray-200 active:bg-gray-300'
        >
          <MessageSquareText
            size={14}
            className='text-gray-900/40 group-hover:text-gray-900/80 group-active:text-gray-900/80'
          />
          <span className='hidden text-sm text-gray-900/40 group-hover:text-gray-900/80 group-active:text-gray-900/80 md:block'>
            {reviewText} {0}
          </span>
        </Link>
      </div>
    </div>
  );
}
