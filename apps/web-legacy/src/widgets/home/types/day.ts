import { DAY } from "~/shared/constants/day";

export type Day = keyof typeof DAY;
export type DayKey = (typeof DAY)[keyof typeof DAY];
