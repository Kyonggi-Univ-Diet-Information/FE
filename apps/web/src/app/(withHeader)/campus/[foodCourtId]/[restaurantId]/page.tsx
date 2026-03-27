import { CampusRestaurantPage, CampusFoodCourtPage } from '@/page/campus';

import { generateRestaurantParams } from '@/api/campus/generateStaticParams';
import { getFoodCourtById } from '@/api/config';
import { hasSubRestaurants } from '@/constants/campus/restaurant';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateStaticParams() {
  return await generateRestaurantParams();
}

const Page = async (props: {
  params: Promise<{
    foodCourtId: string;
    restaurantId: string;
  }>;
}) => {
  const { foodCourtId, restaurantId } = await props.params;
  const foodCourt = getFoodCourtById(foodCourtId);

  if (!foodCourt) {
    throw new Error('Invalid food court id');
  }

  if (hasSubRestaurants(foodCourt)) {
    return (
      <CampusRestaurantPage
        params={Promise.resolve({ foodCourtId, restaurantId })}
      />
    );
  }

  return (
    <CampusFoodCourtPage
      params={Promise.resolve({
        foodCourtId,
        categoryKey: restaurantId,
      })}
    />
  );
};

export default Page;
