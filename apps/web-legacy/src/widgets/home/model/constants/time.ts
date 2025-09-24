import { Time } from "~/widgets/home/types";

export const TIME = {
  아침: "BREAKFAST",
  점심: "LUNCH",
  저녁: "DINNER",
} as const;

export const TIME_LABELS: Time[] = ["아침", "점심", "저녁"];

export const TIME_LABELS_EN = {
  아침: "Brek",
  점심: "Lunch",
  저녁: "Dinner",
} as const;

export const RUN_TIME = {
  BREAKFAST: "",
  LUNCH: "10:50 ~ 13:30",
  DINNER: "17:00 ~ 19:00",
};
