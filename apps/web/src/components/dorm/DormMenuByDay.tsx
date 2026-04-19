import { Section, Card } from '@/components/common';
import DormNoDataMessage from '@/components/dorm/DormNoDataMessage';

import { fetchDormMenuByDay } from '@/api/dorm/fetchDormMenuByDay';

import {
  getFallbackMenu,
  isWeekend,
  renderMenuItems,
  DORM_DAY_KEY,
  type DormTime,
} from '@/model/dorm';

export default async function DormMenuByDay({ day }: { day: number }) {
  const dormMenu = await fetchDormMenuByDay(DORM_DAY_KEY[day]).catch(
    () => null,
  );

  const todayDormMenu = dormMenu?.diet;
  const weekend = isWeekend(DORM_DAY_KEY[day]);

  const dormMenuByTime = (time: DormTime) => {
    if (weekend) return getFallbackMenu('weekend');
    if (!dormMenu || !todayDormMenu || todayDormMenu[time] === undefined) {
      return null;
    }
    return todayDormMenu[time].contents || [];
  };

  const renderContent = (time: DormTime) => {
    const menu = dormMenuByTime(time);
    if (menu === null) return <DormNoDataMessage day={day} />;
    return renderMenuItems(menu, 'ko');
  };

  return (
    <>
      <Section>
        <Section.Content className='flex flex-col gap-4'>
          <div className='flex flex-col gap-3'>
            <Card>
              <Card.Header>
                아침 <span className='font-tossFace'>☀️</span>
              </Card.Header>
              <Card.Content>{renderContent('BREAKFAST')}</Card.Content>
            </Card>
            <Card>
              <Card.Header>
                점심 <span className='font-tossFace'>🍽️</span>
              </Card.Header>
              <Card.Content>{renderContent('LUNCH')}</Card.Content>
            </Card>
            <Card>
              <Card.Header>
                저녁 <span className='font-tossFace'>🌙</span>
              </Card.Header>
              <Card.Content>{renderContent('DINNER')}</Card.Content>
            </Card>
          </div>
        </Section.Content>
      </Section>
    </>
  );
}
