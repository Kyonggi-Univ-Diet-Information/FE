import { create } from "zustand";
import { DailyMenu, Menu, WeeklyMenu } from "~/widgets/home/types";

interface MenuStore {
  weeklyMenu: WeeklyMenu | null;
  setWeeklyMenu: (menu: WeeklyMenu) => void;
  todayMenu: DailyMenu | null;
  setTodayMenu: (menu: DailyMenu) => void;
  selectedMenu: Menu | null;
  setSelectedMenu: (menu: Menu) => void;
  selectedMenuId: number | null;
  setSelectedMenuId: (id: number) => void;
}

export const useMenuStore = create<MenuStore>((set) => ({
  weeklyMenu: null,
  setWeeklyMenu: (menu: WeeklyMenu) => set(() => ({ weeklyMenu: menu })),
  todayMenu: null,
  setTodayMenu: (menu: DailyMenu) => set(() => ({ todayMenu: menu })),
  selectedMenu: null,
  setSelectedMenu: (menu: Menu) => set(() => ({ selectedMenu: menu })),
  selectedMenuId: null,
  setSelectedMenuId: (id: number) => set(() => ({ selectedMenuId: id })),
}));
