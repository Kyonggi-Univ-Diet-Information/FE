import Link from 'next/link';

import {
  CampusMenuSection,
  DormMenuDateModal,
  DormMenuSection,
} from '@/features/menu/components';
import type { DormDay } from '@/types';

interface HomeProps {
  searchParams: Promise<{ modal?: string; date?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { modal, date } = await searchParams;
  const isModal = modal === 'open' ? true : false;

  return (
    <>
      <div className='scrollbar-hide absolute inset-0 flex flex-col gap-8 overflow-y-scroll p-4 pb-20 pt-6'>
        <CampusMenuSection />
        <ReviewLinkButton />
        <DormMenuSection date={date as DormDay} />
      </div>
      {isModal && <DormMenuDateModal />}
    </>
  );
}

function ReviewLinkButton() {
  return (
    <Link
      href='/review'
      className='flex cursor-pointer flex-col rounded-2xl bg-gray-100/50 px-6 py-6 transition-all duration-300 active:bg-gray-100 md:px-8'
    >
      <p className='text-lg font-bold'>
        식사는 어땠나요?<span className='font-tossFace'> 😋</span>
      </p>
      <p>식당 메뉴에 대한 리뷰를 작성하고, 다른 학우의 리뷰를 확인해보세요!</p>
    </Link>
  );
}
