import { PALLETES } from "LibFarm/color";

export enum CALENDAR_IDS {
  PROMOTION = 0,
  NOTICE = 1,
}

export const CALENDARS = [
  {
    id: 0,
    name: "본사일정",
    color: `${PALLETES["white"]}`,
    bgColor: `${PALLETES["p-purple-1"]}`,
  },
  {
    id: 1,
    name: "공지사항",
    color: `${PALLETES["white"]}`,
    bgColor: `${PALLETES["p-orange-1"]}`,
  },
];

export const CALENDAR_OPTIONS = CALENDARS.map(({ id, name, bgColor }) => ({
  label: name,
  value: id,
  color: bgColor,
  isDisabled: id === 1,
}));

export const DAYNAMES = ["일", "월", "화", "수", "목", "금", "토"];
export const DAY_TIME = 1000 * 60 * 60 * 24;
