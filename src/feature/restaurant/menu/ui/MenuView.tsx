import React from "react";
import { MENU } from "~/mock";
import { MenuItem } from "~/feature/restaurant/menu/ui";
import { RestaurantMenu } from "../types";

export default function MenuView({ selected }: { selected: string }) {
  const menus = MENU[selected];
  return (
    <div className="scrollbar-hide grid grid-cols-2 gap-4 overflow-scroll md:h-full md:grid-cols-4">
      {menus.map((menu: RestaurantMenu) => (
        <MenuItem key={menu.id} menu={menu} />
      ))}
    </div>
  );
}
