import { getLocale, getTranslations } from 'next-intl/server';


import { fetchDormMenuByDay } from '@/entities/dorm-menu/api/fetchDormMenuByDay';
import {
  getFallbackMenu,
  isWeekend,
  renderMenuItems,
  DORM_DAY_KEY,
  type DormTime,
} from '@/entities/dorm-menu/model';

import { Section, Card } from '@/shared/ui';

export default async function DormMenuByDay({ day }: { day: number }) {
  const dormMenu = await fetchDormMenuByDay(DORM_DAY_KEY[day]);
  const t = await getTranslations('dorm');
  const locale = await getLocale();

  const todayDormMenu = dormMenu && dormMenu.diet;

  const dormMenuByTime = (time: DormTime) => {
    if (!dormMenu) return getFallbackMenu(false);

    if (isWeekend(DORM_DAY_KEY[day])) {
      return getFallbackMenu(true);
    }

    if (dormMenu.diet === undefined) {
      return getFallbackMenu(false);
    }

    if (todayDormMenu[time] === undefined) {
      return getFallbackMenu(false);
    }

    return todayDormMenu[time].contents || [];
  };

  return (
    <>
      <Section>
        <Section.Content className='flex flex-col gap-4'>
          <div className='flex flex-col gap-3'>
            <Card>
              <Card.Header>
                {t('breakfast')} <span className='font-tossFace'>☀️</span>
              </Card.Header>
              <Card.Content>
                {renderMenuItems(dormMenuByTime('BREAKFAST'), locale)}
              </Card.Content>
            </Card>
            <Card>
              <Card.Header>
                {t('lunch')} <span className='font-tossFace'>🍽️</span>
              </Card.Header>
              <Card.Content>
                {renderMenuItems(dormMenuByTime('LUNCH'), locale)}
              </Card.Content>
            </Card>
            <Card>
              <Card.Header>
                {t('dinner')} <span className='font-tossFace'>🌙</span>
              </Card.Header>
              <Card.Content>
                {renderMenuItems(dormMenuByTime('DINNER'), locale)}
              </Card.Content>
            </Card>
          </div>
        </Section.Content>
      </Section>
    </>
  );
}
