import React, { type SetStateAction, type Dispatch } from "react";

import { RESTAURANT } from "../model/constants";
import { cn } from "~/shared/utils";
import { MenuView } from "~/feature/restaurant/menu/ui";

interface MenuBoardProps {
  restaurant: string;
  setRestaurant: Dispatch<SetStateAction<string>>;
}

export default function RestaurantMenuBoard({
  restaurant,
  setRestaurant,
}: MenuBoardProps) {
  return (
    <div className="flex h-[75%] w-full flex-col gap-x-4 md:flex-row">
      <div className="scrollbar-hide rounded-normal h-full overflow-scroll bg-[#444] p-5 md:flex-1">
        <MenuView selected={restaurant} />
      </div>
      <RestaurantSelector selected={restaurant} setSelected={setRestaurant} />
    </div>
  );
}

interface RestaurantSelectorProps {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  className?: string;
}

function RestaurantSelector({
  selected,
  setSelected,
}: RestaurantSelectorProps) {
  const RestaurantButton = ({ name }: { name: string }) => (
    <button
      className={cn(
        "hover:bg-primary w-full transform cursor-pointer bg-[#444] py-4 text-gray-400 duration-200 hover:text-white md:py-8",
        selected === name && "bg-primary text-white",
      )}
      onClick={() => setSelected(name)}
    >
      {name}
    </button>
  );

  return (
    <div className="rounded-normal order-[-1] mb-4 flex h-fit w-full items-center justify-center overflow-hidden bg-[#444] text-xs font-medium sm:text-sm md:order-2 md:mb-0 md:flex md:h-full md:w-20 md:flex-col md:text-lg">
      {RESTAURANT.map((restaurant) => (
        <RestaurantButton name={restaurant} key={restaurant} />
      ))}
    </div>
  );
}
