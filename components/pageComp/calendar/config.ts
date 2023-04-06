import { PALLETES } from "LibFarm/color";

export enum SCHEDULE_CATEGORY {
  ALL_DAY = "allday",
  TIME = "time",
  MILESTONE = "milestone",
  TASK = "TASK",
}

export const VIEWS = [
  {
    label: "월별",
    value: "month",
    option: {
      daynames: ["일", "월", "화", "수", "목", "금", "토"],
      startDayOfWeek: 0,
      narrowWeekend: true,
      isAlways6Week: false,
      visibleScheduleCount: 3,
    },
  },
  {
    label: "주간별",
    value: "week",
    option: {
      daynames: ["일", "월", "화", "수", "목", "금", "토"],
      startDayOfWeek: 0,
      narrowWeekend: true,
    },
  },
];

export const THEME = {
  "common.border": `1px solid ${PALLETES["typo-5"]}`,
  "common.backgroundColor": `${PALLETES["white"]}`,
  "common.holiday.color": `${PALLETES["error-1"]}`,
  "common.saturday.color": `${PALLETES["typo-1"]}`,
  "common.dayname.color": `${PALLETES["typo-1"]}`,
  "common.today.color": `${PALLETES["typo-1"]}`,
  "month.dayname.borderLeft": `1px solid ${PALLETES["typo-5"]}`,
  "month.dayname.backgroundColor": `${PALLETES["white"]}`,
  "month.dayname.fontWeight": "normal",
  "month.dayname.textAlign": "left",

  // month day grid cell 'day'
  "month.holidayExceptThisMonth.color": "rgba(255, 64, 64, 0.4)",
  "month.dayExceptThisMonth.color": "rgba(51, 51, 51, 0.4)",
  "month.weekend.backgroundColor": `${PALLETES["white"]}`,

  // month more view
  "month.moreView.border": `1px solid ${PALLETES["typo-5"]}`,
  "month.moreView.boxShadow": "0 2px 6px 0 rgba(0, 0, 0, 0.1)",
  "month.moreView.backgroundColor": "white",
  "month.moreView.paddingBottom": "17px",
  "month.moreViewTitle.height": "44px",
  "month.moreViewTitle.marginBottom": "12px",
  "month.moreViewTitle.backgroundColor": `${PALLETES["white"]}`,
  "month.moreViewTitle.borderBottom": "none",
  "month.moreViewTitle.padding": "12px 17px 0 17px",
  "month.moreViewList.padding": "0 17px",

  // week daygrid schedule style
  "month.schedule.top": "4px",
  "month.schedule.borderRadius": "4px",
  "month.schedule.height": "16px",
  "month.schedule.fontSize": "11px",
  "month.schedule.marginTop": "2px",
  "month.schedule.marginLeft": "0.25rem",
  "month.schedule.marginRight": "0.25rem",
  "month.dayname.height": "20px",
  "month.dayname.paddingLeft": "5px",
  "month.dayname.paddingRight": "5px",
  "month.dayname.fontSize": "12px",
};

// export const calendarOptions = CALENDARS.map(({ id, name, bgColor }) => ({
//   label: name,
//   value: id,
//   color: bgColor,
// }));

export const viewOptions = VIEWS.map(({ label, value }) => ({ label, value }));
