import { create } from "zustand";

interface DateStore {
  selectedDate: Date;
  setSelectedDateAfter: () => void;
  setSelectedDateBefore: () => void;
}

export const useDateStore = create<DateStore>((set, get) => ({
  selectedDate: new Date(),
  setSelectedDateAfter: () =>
    set(() => {
      const currentDate: Date = get().selectedDate;
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + 1);
      return { selectedDate: newDate };
    }),
  setSelectedDateBefore: () =>
    set(() => {
      const currentDate = get().selectedDate;
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() - 1);
      return { selectedDate: newDate };
    }),
}));
