import { DAY } from "~/shared/constants";

export const getDay = (date: Date) => {
  return date.toLocaleString("ko-KR", { weekday: "long" });
};

export const getDayKey = (value: string) =>
  Object.keys(DAY).find((key) => DAY[key as keyof typeof DAY] === value);
