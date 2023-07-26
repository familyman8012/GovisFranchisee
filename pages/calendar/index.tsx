import Head from "next/head";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

import style from "StyleFarm/scss/modules/Calendar.module.scss";

import dayjs from "dayjs";

import { useQueryString } from "HookFarm/useQueryString";
import { IScheduleFindAll } from "InterfaceFarm/Calendar";

import { CALENDARS } from "ComponentsFarm/pageComp/calendar/constants";

import * as CalendarService from "ApiFarm/calendar";

import type { CalendarProps } from "ComponentsFarm/pageComp/calendar";
import type { CalendarWeekProps } from "ComponentsFarm/pageComp/calendar/calendarWeek";

import Layout from "ComponentsFarm/layouts";

const Calendar = dynamic<CalendarProps>(
  () =>
    import("ComponentsFarm/pageComp/calendar")
      .then((module) => module.Calendar)
      .catch((error) => error),
  {
    ssr: false,
  }
);

const CalendarWeek = dynamic<CalendarWeekProps>(
  () =>
    import("ComponentsFarm/pageComp/calendar/calendarWeek")
      .then((module) => module.CalendarWeek)
      .catch((error) => error),
  {
    ssr: false,
  }
);

const calendars = CALENDARS.map((cal) => ({
  id: `${cal.id}`,
  name: cal.name,
  color: cal.color,
  bgColor: cal.bgColor,
  borderColor: cal.bgColor,
  dragBgColor: cal.bgColor,
}));

export default function CalendarPage() {
  const router = useRouter();
  const qs = React.useMemo(
    () => new URLSearchParams(router.asPath.split("?")[1]),
    []
  );

  const [dates, setDates] = useState({
    search_start_period: "",
    search_end_period: "",
  });

  const [params, setParams] = useQueryString<{
    visible_week_view: string;
    selected_date: string;
  }>({
    visible_week_view: qs.get("visible_week_view") ?? "",
    selected_date: qs.get("selected_date") ?? "",
  });

  const { data } = useQuery<IScheduleFindAll>(
    ["calendars", dates],
    () => CalendarService.fetchScheduleList(dates),
    {
      enabled: !!(dates.search_end_period && dates.search_end_period),
    }
  );

  const schedules = React.useMemo(
    () =>
      data?.list.map((item) => ({
        id: `${item.sbc_idx}`,
        calendarId: `${item.category}`,
        title: item.title || "",
        body: item.content || "",
        start: item.start_date,
        end: item.end_date,
        isAllday: !!item.is_all_day,
      })) ?? [],
    [data]
  );

  const handleChangeSearchDate = (
    search_start_period: string,
    search_end_period: string
  ) => setDates({ search_start_period, search_end_period });

  const handleClickDay = (date: string) => {
    const _date = dayjs(date);
    if (!_date.isValid()) return;

    setParams({
      visible_week_view: "1",
      selected_date: _date.format("YYYY-MM-DD"),
    });
  };

  const handleWeekClose = () =>
    setParams({
      ...params,
      visible_week_view: "",
    });

  const handleChangeSelectedDate = (date: string) =>
    setParams({
      ...params,
      selected_date: date,
    });

  const handleSchduleClick = (id: string | number) =>
    router.push({
      pathname: `/calendar/${id}`,
      query: router.query,
    });

  return (
    <Layout>
      <Head>
        <title>캘린더 | GOVIS for Franchisee</title>
      </Head>
      <div className={`p-0 ${style["calendar-page"]}`}>
        <Calendar
          calendars={calendars}
          schedules={schedules}
          onScheduleView={(schedule) => handleSchduleClick(schedule.id)}
          onChangeSearchDate={handleChangeSearchDate}
          onClickDay={handleClickDay}
          height="auto"
        />
        <CalendarWeek
          show={!!params.visible_week_view}
          date={params.selected_date}
          onClose={handleWeekClose}
          onScheduleClick={handleSchduleClick}
          onChangeSelectedDate={handleChangeSelectedDate}
        />
      </div>
    </Layout>
  );
}
