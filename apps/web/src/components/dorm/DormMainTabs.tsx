'use client';

import { StaticTabNavigation } from '@/components/common';

import { getCampusMainTabs } from '@/model/common/campus';

export default function DormMainTabs() {
  const mainTabs = getCampusMainTabs('ko', '기숙사', new Date().getDay());

  return (
    <StaticTabNavigation tabs={mainTabs} currentTabKey='dorm' variant='header' />
  );
}
