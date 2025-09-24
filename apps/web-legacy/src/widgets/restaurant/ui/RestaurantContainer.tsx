import { useState } from 'react';

import { RiceImg } from '~/assets';
import { RESTAURANT, RESTAURANT_INFO } from '../model/constants';
import { RestaurantMenuBoard } from '~/widgets/restaurant/ui';

export default function RestaurantContainer() {
  const [restaurant, setRestaurant] = useState(RESTAURANT[0]);

  return (
    <div className='padding size-full'>
      <div className='flex size-full flex-col gap-y-4 px-0 md:px-20'>
        <RestaurantHeader restaurant={restaurant} />
        <RestaurantMenuBoard
          setRestaurant={setRestaurant}
          restaurant={restaurant}
        />
      </div>
    </div>
  );
}

function RestaurantHeader({ restaurant }: { restaurant: string }) {
  return (
    <div className='flex h-fit w-full items-center justify-start gap-x-2 text-white'>
      <img src={RiceImg} className='md:size-30 size-20' />
      <div className='flex flex-col'>
        <p className='text-xl font-bold md:text-3xl'>{restaurant}</p>
        <p className='text-sm font-medium md:text-xl md:font-semibold'>
          {
            RESTAURANT_INFO[restaurant as keyof typeof RESTAURANT_INFO]
              .openingHours
          }
        </p>
      </div>
    </div>
  );
}
