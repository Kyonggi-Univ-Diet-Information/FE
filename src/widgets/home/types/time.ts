import { TIME } from "~/widgets/home/model";

export type Time = keyof typeof TIME;
export type TimeKey = (typeof TIME)[keyof typeof TIME];
