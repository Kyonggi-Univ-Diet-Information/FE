import React from "react";
import { RestaurantMenu } from "../types";
import { useLanguageStore } from "~/shared/store";

export default function MenuItem({ menu }: { menu: RestaurantMenu }) {
  const { language } = useLanguageStore();

  return (
    <div className="scrollbar-hide rounded-small flex h-fit w-full cursor-pointer flex-col gap-y-2 overflow-scroll">
      <div
        className="rounded-small h-30 bg-cover bg-center"
        style={{ backgroundImage: `url(${menu.url})` }}
      ></div>
      <div className="text-md flex h-fit flex-col text-white">
        <p className="font-medium">{menu.menu}</p>
        <div className="flex">
          <span className="font-semibold">{menu.price}</span>
          {language === "en" ? " KRW" : "원"}
        </div>
      </div>
    </div>
  );
}
