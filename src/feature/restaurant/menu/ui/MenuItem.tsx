import React from "react";
import { RestaurantMenu } from "../types";

export default function MenuItem({ menu }: { menu: RestaurantMenu }) {
  return (
    <div className="rounded-small flex h-fit w-full cursor-pointer flex-col gap-y-2 overflow-scroll">
      <div
        className="rounded-small h-30 bg-cover bg-center"
        style={{ backgroundImage: `url(${menu.url})` }}
      ></div>
      <div className="text-md flex h-fit flex-col text-white">
        <p className="font-medium">{menu.menu}</p>
        <div className="flex">
          <span className="font-semibold">{menu.price}</span>원
        </div>
      </div>
    </div>
  );
}
