import { DormMenuPage, DormMenuPageProps } from '@/page/dorm';

import { generateDormDayParams } from '@/api/dorm/generateStaticParams';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export function generateStaticParams() {
  return generateDormDayParams();
}

const Page = async (props: DormMenuPageProps) => {
  return <DormMenuPage {...props} />;
};

export default Page;
