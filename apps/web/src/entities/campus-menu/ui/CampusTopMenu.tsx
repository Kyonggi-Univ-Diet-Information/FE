import { getLocale, getTranslations } from 'next-intl/server';

import {
  FOOD_COURT_ID,
  FOOD_COURT_NAME,
  FOOD_COURT_NAME_EN,
} from '@/shared/config';
import { Card, Section } from '@/shared/ui';

import CampusAnimatedCard from './CampusAnimatedCard';
import { fetchTopMenu } from '../api/fetchTopMenu';
import type { CampusTopMenu } from '../model/campusMenu';

export default async function CampusTopMenu() {
  const topMenus = await fetchTopMenu();
  const locale = await getLocale();
  const t = await getTranslations('review');

  return (
    <Section>
      <Section.Header
        title={
          <>
            <span className='font-tossFace'>💬</span> {t('popularTitle')}
          </>
        }
        subtitle={t('popularSubtitle')}
      />
      <div className='w-full space-y-2'>
        {topMenus.map((menu, index) => (
          <MenuCard key={menu.id} menu={menu} index={index} locale={locale} />
        ))}
      </div>
    </Section>
  );
}

function MenuCard({
  menu,
  index,
  locale,
}: {
  menu: CampusTopMenu;
  index: number;
  locale: string;
}) {
  const foodCourtName =
    locale === 'en'
      ? FOOD_COURT_NAME_EN[menu.restaurantType]
      : FOOD_COURT_NAME[menu.restaurantType];
  const getMedal = (index: number) => {
    switch (index) {
      case 1:
        return <span className='font-tossFace'>🥇</span>;
      case 2:
        return <span className='font-tossFace'>🥈</span>;
      case 3:
        return <span className='font-tossFace'>🥉</span>;
      default:
        return <span className='pl-1.5 text-sm'>{index}</span>;
    }
  };

  return (
    <CampusAnimatedCard index={index}>
      <Card href={`/review/${FOOD_COURT_ID[menu.restaurantType]}/${menu.id}`}>
        <div className='grid grid-cols-[0.5fr_6fr_1fr] items-center gap-1.5'>
          {getMedal(index + 1)}
          <div className='flex items-center gap-1.5 truncate text-nowrap text-sm font-semibold'>
            <span className='rounded-full border px-1.5 py-0.5 text-xs font-medium'>
              {foodCourtName}
            </span>
            {locale === 'en' ? menu.nameEn : menu.name}
          </div>
          <div className='flex items-center justify-end gap-1'>
            <span className='font-tossFace'>💬</span>
            <span className='text-sm'>{menu.reviewCount}</span>
          </div>
        </div>
      </Card>
    </CampusAnimatedCard>
  );
}
