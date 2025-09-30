import Link from 'next/link';

export default function Home() {
  return (
    <div className='scrollbar-hide absolute inset-0 flex flex-col gap-6 overflow-y-scroll p-4 pb-20'>
      <div className='flex flex-col rounded-2xl bg-gray-100 px-8 py-6'>
        <p className='text-xl font-bold'>
          오늘 메뉴 어때요?<span className='font-tossFace'> 🤔</span>
        </p>
        <p>
          식당 메뉴에 대한 리뷰를 작성하고, 다른 학우의 리뷰를 확인해보세요!
        </p>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex items-baseline justify-between'>
          <p className='text-lg font-bold'>
            경기드림타워 오늘의 메뉴<span className='font-tossFace'> 🍚</span>
          </p>
          <div className='flex'>
            <Link href='/' className='text-sm underline hover:text-gray-600'>
              리뷰 보러가기
            </Link>
          </div>
        </div>

        <div className='scrollbar-hide flex max-w-full gap-4 overflow-x-scroll'>
          <div className='h-70 flex min-w-60 flex-col gap-2 rounded-2xl bg-gray-100 p-4'>
            <p className='font-semibold'>아침</p>
            <div className='flex flex-col'>
              <p className='text-gray-600'>미운영</p>
            </div>
          </div>
          <div className='h-70 flex min-w-60 flex-col gap-2 rounded-2xl bg-gray-100 p-4'>
            <p className='font-semibold'>점심</p>
            <div className='flex flex-col'>
              <p className='text-gray-600'>메뉴1</p>
              <p className='text-gray-600'>메뉴2</p>
              <p className='text-gray-600'>메뉴3</p>
              <p className='text-gray-600'>메뉴4</p>
              <p className='text-gray-600'>메뉴5</p>
            </div>
          </div>
          <div className='h-70 flex min-w-60 flex-col gap-2 rounded-2xl bg-gray-100 p-4'>
            <p className='font-semibold'>저녁</p>
            <div className='flex flex-col'>
              <p className='text-gray-600'>메뉴1</p>
              <p className='text-gray-600'>메뉴2</p>
              <p className='text-gray-600'>메뉴3</p>
              <p className='text-gray-600'>메뉴4</p>
              <p className='text-gray-600'>메뉴5</p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <p className='text-lg font-bold'>
          다른 교내식당 메뉴
          <span className='font-tossFace'> 🍚</span>
        </p>
        <div className='scrollbar-hide flex max-w-full gap-4 overflow-x-scroll'>
          <div className='h-72 min-w-60 rounded-2xl bg-gray-100 p-4'>
            <p className='font-semibold'>경슐랭</p>
          </div>
          <div className='h-72 min-w-60 rounded-2xl bg-gray-100 p-4'>
            <p className='font-semibold'>이스퀘어</p>
          </div>
          <div className='h-72 min-w-60 rounded-2xl bg-gray-100 p-4'>
            <p className='font-semibold'>감성코어</p>
          </div>
        </div>
      </div>
    </div>
  );
}
