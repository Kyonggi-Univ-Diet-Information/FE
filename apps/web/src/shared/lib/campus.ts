import { CAMPUS_FOOD_COURTS } from '@/entities/campus-menu/model/campusRestaurant';

import {
  FOOD_COURT_ID,
  FOOD_COURT_NAME,
  FOOD_COURT_NAME_EN,
} from '@/shared/config';

interface MainTab {
  key: string;
  label: string;
  href: string;
}

export function getCampusMainTabs(
  locale: string,
  dormLabel: string,
  today: number = new Date().getDay(),
): MainTab[] {
  const foodCourtNames = locale === 'en' ? FOOD_COURT_NAME_EN : FOOD_COURT_NAME;

  return [
    ...CAMPUS_FOOD_COURTS.map(id => ({
      key: FOOD_COURT_ID[id],
      label: foodCourtNames[id],
      href: `/campus/${FOOD_COURT_ID[id]}`,
    })),
    {
      key: 'dorm',
      label: dormLabel,
      href: `/campus/dorm/${today}`,
    },
  ];
}
