// import { MenuSection } from '@/shared/ui';
// import { ReviewItem } from '@/features/review/components';

import { useTranslations } from 'next-intl';

export default function ReviewPage() {
  const t = useTranslations('reviewPage');
  return (
    <>
      {t('reviewPageComingSoon')}

      {/* <MenuSection>
        <MenuSection.Header
          title='경슐랭 리뷰'
          subtitle='방금 작성된 리뷰들이에요!'
        />
        <MenuSection.Content className='flex-col gap-4'>
          아직 준비중이에요!
        </MenuSection.Content>
      </MenuSection>
      <MenuSection>
        <MenuSection.Header
          title='경기드림타워 메뉴 리뷰'
          subtitle='방금 작성된 리뷰들이에요!'
        />
        <MenuSection.Content className='flex-col gap-4'>
          아직 준비중이에요!
        </MenuSection.Content>
      </MenuSection> */}
    </>
  );
}
