import { fetchDormMenuByDay } from '@/api/dorm/fetchDormMenuByDay';
import { Section, Card } from '@/components/common';
import {
  getFallbackMenu,
  isWeekend,
  renderMenuItems,
  DORM_DAY_KEY,
  type DormTime,
} from '@/model/dorm';

export default async function DormMenuByDay({ day }: { day: number }) {
  const dormMenu = await fetchDormMenuByDay(DORM_DAY_KEY[day]);

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
                아침 <span className='font-tossFace'>☀️</span>
              </Card.Header>
              <Card.Content>
                {renderMenuItems(dormMenuByTime('BREAKFAST'), 'ko')}
              </Card.Content>
            </Card>
            <Card>
              <Card.Header>
                점심 <span className='font-tossFace'>🍽️</span>
              </Card.Header>
              <Card.Content>
                {renderMenuItems(dormMenuByTime('LUNCH'), 'ko')}
              </Card.Content>
            </Card>
            <Card>
              <Card.Header>
                저녁 <span className='font-tossFace'>🌙</span>
              </Card.Header>
              <Card.Content>
                {renderMenuItems(dormMenuByTime('DINNER'), 'ko')}
              </Card.Content>
            </Card>
          </div>
        </Section.Content>
      </Section>
    </>
  );
}
