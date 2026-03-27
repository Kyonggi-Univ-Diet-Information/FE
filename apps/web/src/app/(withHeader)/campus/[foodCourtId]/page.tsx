import { CampusFoodCourtPage, CampusFoodCourtPageProps } from '@/page/campus';

import { generateFoodCourtParams } from '@/api/campus/generateStaticParams';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export function generateStaticParams() {
  return generateFoodCourtParams();
}

const Page = async (props: CampusFoodCourtPageProps) => {
  return <CampusFoodCourtPage {...props} />;
};

export default Page;
