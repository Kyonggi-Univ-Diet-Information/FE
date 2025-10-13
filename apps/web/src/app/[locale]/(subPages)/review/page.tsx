import { MenuSection } from '@/components/common';
import { ReviewItem } from '@/features/review/components';

export default function ReviewPage() {
  return (
    <>
      <MenuSection>
        <MenuSection.Header
          title='경슐랭 리뷰'
          subtitle='방금 작성된 리뷰들이에요!'
        />
        <MenuSection.Content className='flex-col gap-4'>
          <ReviewItem
            id={1}
            title={'고등어자반'}
            updatedAt={'2025-09-25'}
            rating={5}
            content={
              '고등어자반은 맛있어요. 근데 다른게 좀 아쉬워요!!!!!고등어자반은 맛있어요. 근데 다른게 좀 아쉬워요!!!!!고등어자반은 맛있어요. 근데 다른게 좀 아쉬워요!!!!!고등어자반은 맛있어요. 근데 다른게 좀 아쉬워요!!!!!고등어자반은 맛있어요. 근데 다른게 좀 아쉬워요!!!!!'
            }
            memberName={'김건국'}
            createdAt={'2025-09-25'}
          />
          <ReviewItem
            id={1}
            title={'고등어자반'}
            updatedAt={'2025-09-25'}
            rating={5}
            content={
              '고등어자반은 맛있어요. 근데 다른게 좀 아쉬워요!!!!!고등어자반은 맛있어요. 근데 다른게 좀 아쉬워요!!!!!고등어자반은 맛있어요. 근데 다른게 좀 아쉬워요!!!!!고등어자반은 맛있어요. 근데 다른게 좀 아쉬워요!!!!!고등어자반은 맛있어요. 근데 다른게 좀 아쉬워요!!!!!'
            }
            memberName={'김건국'}
            createdAt={'2025-09-25'}
          />
        </MenuSection.Content>
      </MenuSection>
      <MenuSection>
        <MenuSection.Header
          title='경기드림타워 메뉴 리뷰'
          subtitle='방금 작성된 리뷰들이에요!'
          // action={
          //   <Link href='/review/dorm'>
          //     <Button variant='secondary' size='sm'>
          //       더보기
          //     </Button>
          //   </Link>
          // }
        />
        <MenuSection.Content className='flex-col gap-4'>
          <ReviewItem
            id={1}
            title={'고등어자반'}
            updatedAt={'2025-09-25'}
            rating={5}
            content={
              '고등어자반은 맛있어요. 근데 다른게 좀 아쉬워요!!!!!고등어자반은 맛있어요. 근데 다른게 좀 아쉬워요!!!!!고등어자반은 맛있어요. 근데 다른게 좀 아쉬워요!!!!!고등어자반은 맛있어요. 근데 다른게 좀 아쉬워요!!!!!고등어자반은 맛있어요. 근데 다른게 좀 아쉬워요!!!!!'
            }
            memberName={'김건국'}
            createdAt={'2025-09-25'}
          />
          <ReviewItem
            id={1}
            title={'고등어자반'}
            updatedAt={'2025-09-25'}
            rating={5}
            content={
              '고등어자반은 맛있어요. 근데 다른게 좀 아쉬워요!!!!!고등어자반은 맛있어요. 근데 다른게 좀 아쉬워요!!!!!고등어자반은 맛있어요. 근데 다른게 좀 아쉬워요!!!!!고등어자반은 맛있어요. 근데 다른게 좀 아쉬워요!!!!!고등어자반은 맛있어요. 근데 다른게 좀 아쉬워요!!!!!'
            }
            memberName={'김건국'}
            createdAt={'2025-09-25'}
          />
        </MenuSection.Content>
      </MenuSection>
    </>
  );
}
