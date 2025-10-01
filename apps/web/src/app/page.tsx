import { MenuCard, MenuSection } from '@/components/feature';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='scrollbar-hide absolute inset-0 flex flex-col gap-8 overflow-y-scroll p-4 pb-20 pt-6'>
      <MenuSection>
        <MenuSection.Header>
          <p className='text-xl font-bold'>
            경기대 <span className='text-point'>교내식당</span> 메뉴
            <span className='font-tossFace'> 🍚</span>
          </p>
          <Link href='/' className='text-sm underline hover:text-gray-600'>
            전체보기
          </Link>
        </MenuSection.Header>
        <MenuSection.Content>
          <MenuCard>
            <MenuCard.Header>경슐랭</MenuCard.Header>
          </MenuCard>
          <MenuCard>
            <MenuCard.Header>이스퀘어</MenuCard.Header>
          </MenuCard>
          <MenuCard>
            <MenuCard.Header>감성코어</MenuCard.Header>
          </MenuCard>
        </MenuSection.Content>
      </MenuSection>

      <div className='flex cursor-pointer flex-col rounded-2xl bg-gray-100/50 px-8 py-6 transition-all duration-300 active:bg-gray-100'>
        <p className='text-lg font-bold'>
          식사는 어땠나요?<span className='font-tossFace'> 😋</span>
        </p>
        <p>
          식당 메뉴에 대한 리뷰를 작성하고, 다른 학우의 리뷰를 확인해보세요!
        </p>
      </div>

      <MenuSection>
        <MenuSection.Header>
          <p className='text-xl font-bold'>
            <span className='text-point'>경기드림타워</span> <u>오늘</u>의 메뉴
            <span className='font-tossFace'> 🍚</span>
          </p>
          <Link href='/' className='text-sm underline hover:text-gray-600'>
            리뷰 보러가기
          </Link>
        </MenuSection.Header>
        <MenuSection.Content>
          <MenuCard>
            <MenuCard.Header>
              아침 <span className='font-tossFace'>☀️</span>
            </MenuCard.Header>
            <MenuCard.Content>
              <p className='text-gray-600'>미운영</p>
            </MenuCard.Content>
          </MenuCard>
          <MenuCard>
            <MenuCard.Header>
              점심 <span className='font-tossFace'>🍽️</span>{' '}
            </MenuCard.Header>
            <MenuCard.Content>
              <p className='text-gray-600'>메뉴1</p>
              <p className='text-gray-600'>메뉴2</p>
              <p className='text-gray-600'>메뉴3</p>
              <p className='text-gray-600'>메뉴4</p>
              <p className='text-gray-600'>메뉴5</p>
            </MenuCard.Content>
          </MenuCard>
          <MenuCard>
            <MenuCard.Header>
              저녁 <span className='font-tossFace'>🌙</span>
            </MenuCard.Header>
            <MenuCard.Content>
              <p className='text-gray-600'>미운영</p>
            </MenuCard.Content>
          </MenuCard>
        </MenuSection.Content>
      </MenuSection>
    </div>
  );
}
