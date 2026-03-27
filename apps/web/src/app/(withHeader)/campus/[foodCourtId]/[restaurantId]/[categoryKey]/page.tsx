import { CampusRestaurantPage } from '@/page/campus';

import { generateCategoryParams } from '@/api/campus/generateStaticParams';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateStaticParams() {
  return await generateCategoryParams();
}

const Page = async (props: {
  params: Promise<{
    foodCourtId: string;
    restaurantId: string;
    categoryKey: string;
  }>;
}) => {
  const { foodCourtId, restaurantId, categoryKey } = await props.params;

  return (
    <CampusRestaurantPage
      params={Promise.resolve({
        foodCourtId,
        restaurantId,
        categoryKey,
      })}
    />
  );
};

export default Page;
