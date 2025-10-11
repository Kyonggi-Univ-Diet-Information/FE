import { Button } from '@/components/common';
import { Review } from '@/types';

export default function ReviewItem({
  rating,
  content,
  memberName,
  createdAt,
}: Review) {
  return (
    <div className='flex h-32 w-full rounded-2xl bg-gray-100/50 p-4'>
      <div className='flex h-full w-40 shrink-0 flex-col items-start gap-0.5'>
        <div className='flex flex-1 flex-col gap-0.5'>
          <p className='font-semibold'>{memberName}</p>
          <p className='text-sm text-gray-600'>{createdAt}</p>
        </div>
        <div className='flex gap-1'>
          <Button variant='outline' size='sm'>
            <span className='font-tossFace'>👍</span>
          </Button>
          <Button variant='outline' size='sm'>
            <span className='font-tossFace'>👎</span>
          </Button>
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <span className='font-tossFace'>{'⭐️'.repeat(rating)}</span>
        <p className='scrollbar-hide h-full overflow-y-auto text-sm leading-relaxed text-gray-600'>
          {content}
        </p>
      </div>
    </div>
  );
}
