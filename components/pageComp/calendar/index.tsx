import React, { useEffect, useRef, useState } from "react";
import TUICalendar from "@toast-ui/react-calendar";
import dayjs from "dayjs";

import useCalendarProps from "./useCalendarProps";
import { ICalendar, ICalendarSchedule } from "./custom-type";
import { VIEWS, THEME, SCHEDULE_CATEGORY } from "./config";

import { CalendarToolbar } from "./Toolbar";

import templates from "./Template";

export interface CalendarProps {
  height?: string; // css Text
  loading?: boolean;
  calendars: ICalendar[];
  schedules: ICalendarSchedule[];
  onScheduleView: (schedule: ICalendarSchedule) => void;
  onChangeSearchDate: (startDate: string, endDate: string) => void;
  onClickDay?: (date: string) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  height = "100%",
  schedules,
  calendars,
  loading,
  onScheduleView,
  onChangeSearchDate,
  onClickDay,
}) => {
  const ref = useRef(null);
  const [view, setView] = useState("month");
  const [selectedCalendars, setSelectedCalendars] = useState(calendars.map((calendar) => calendar.id));
  const { dateTime, startDateTime, endDateTime, instance, refershTimeState } = useCalendarProps(ref);

  const currentDate = dayjs(dateTime);
  const startDate = dayjs(startDateTime);
  const endDate = dayjs(endDateTime);
  const dateText =
    view === "month" ? currentDate.format("YYYY.MM") : `${startDate.format("yy.MM.DD")} ~ ${endDate.format("MM.DD")}`;

  const TUISchedules = schedules.map((schedule) => ({
    ...schedule,
    category: `${schedule.isAllday ? SCHEDULE_CATEGORY["ALL_DAY"] : SCHEDULE_CATEGORY["TIME"]}`,
    isVisible: selectedCalendars.includes(schedule.calendarId),
  }));

  const TUICalendars = calendars.map((calendar) => ({
    ...calendar,
    dragBgColor: calendar.bgColor,
    borderColor: calendar.bgColor,
  }));

  useEffect(() => {
    instance?.changeView(view);
    refershTimeState();
  }, [view]);

  useEffect(() => {
    if (startDate.toDate().getTime() === endDate.toDate().getTime()) return;
    onChangeSearchDate(startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD"));
  }, [startDateTime, endDateTime]);

  const handleClickSchedule = (e: any) => {
    const { id, title, calendarId, body, category, start, end } = e.schedule;

    onScheduleView({
      id,
      title,
      body,
      start: dayjs(start.toDate().toISOString()).format("YYYY-MM-DD"),
      end: dayjs(end.toDate().toISOString()).format("YYYY-MM-DD"),
      calendarId,
      isAllday: category === SCHEDULE_CATEGORY["ALL_DAY"],
    });
  };

  const handleNext = () => {
    instance?.next();
    refershTimeState();
  };

  const handlePrev = () => {
    instance?.prev();
    refershTimeState();
  };

  const hadleClickDay = (e: any) => {
    e.guide.clearGuideElement();
    onClickDay && onClickDay(dayjs(e.start).format("YYYY-MM-DD"));
  };

  return (
    <div className="gv-calendar" style={{ width: "100%", height }} suppressHydrationWarning>
      <CalendarToolbar dateText={dateText} loading={loading} onClickNext={handleNext} onClickPrev={handlePrev} />
      <TUICalendar
        ref={ref}
        view="month"
        template={templates}
        scheduleView={["allday"]}
        taskView={false}
        usageStatistics={false}
        useCreationPopup={false}
        useDetailPopup={false}
        calendars={TUICalendars}
        schedules={TUISchedules}
        month={VIEWS[0].option}
        week={VIEWS[1].option}
        theme={THEME}
        height={"100%"}
        draggable={false}
        onBeforeCreateSchedule={hadleClickDay}
        onClickSchedule={handleClickSchedule}
      />
    </div>
  );
};

export * from "./custom-type";
