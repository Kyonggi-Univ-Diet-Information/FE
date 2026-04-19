import { DormMenuPage, DormMenuPageProps } from '@/page/dorm';

import { generateDormDayParams } from '@/api/dorm/generateStaticParams';

export function generateStaticParams() {
  return generateDormDayParams();
}

const Page = async (props: DormMenuPageProps) => {
  return <DormMenuPage {...props} />;
};

export default Page;
