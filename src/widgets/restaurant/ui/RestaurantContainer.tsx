import React, { useState } from "react";

import { RiceImg } from "~/assets";
import { RESTAURANT } from "../model/constants";
import { RestaurantMenuBoard } from "~/widgets/restaurant/ui";

export default function RestaurantContainer() {
  const [restaurant, setRestaurant] = useState(RESTAURANT[0]);

  return (
    <div className="padding size-full">
      <div className="flex size-full flex-col gap-y-4 px-0 md:px-20">
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
    <div className="flex h-fit w-full items-center justify-start gap-x-2 text-white">
      <img src={RiceImg} className="size-30" />
      <p className="text-3xl font-bold">{restaurant}</p>
    </div>
  );
}
