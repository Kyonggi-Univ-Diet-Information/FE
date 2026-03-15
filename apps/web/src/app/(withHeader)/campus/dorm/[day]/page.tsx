import { DormMenuPage, DormMenuPageProps } from '@/page/dorm';

import { DORM_DAY_KEY } from '@/model/dorm/dormDay';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export function generateStaticParams() {
  const days = Object.keys(DORM_DAY_KEY);

  return days.map(day => ({
    day,
  }));
}

const Page = async (props: DormMenuPageProps) => {
  return <DormMenuPage {...props} />;
};

export default Page;
