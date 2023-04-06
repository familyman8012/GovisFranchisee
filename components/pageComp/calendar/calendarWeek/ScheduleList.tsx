import React, { useEffect } from "react";
import { useQuery } from "react-query";

import * as CalendarService from "ApiFarm/calendar";
import { CALENDARS } from "ComponentsFarm/pageComp/calendar/constants";
import { ISchedule, IScheduleFindAll } from "InterfaceFarm/Calendar";
import { ListLoading } from "ComponentsFarm/elements/Loading";
import { EmptyView } from "ComponentsFarm/elements/EmptyView";

export const ScheduleList = ({
  date,
  load,
  onScheduleClick,
}: {
  date: string;
  load?: boolean;
  onScheduleClick?: (schedule: ISchedule) => void;
}) => {
  const { data, isLoading, refetch } = useQuery<IScheduleFindAll>(
    ["schedule-list", date],
    ({ queryKey }) =>
      CalendarService.fetchScheduleList({
        search_start_period: queryKey[1] as string,
        search_end_period: queryKey[1] as string,
      }),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (!load) return;
    refetch();
  }, [load]);

  if (isLoading) {
    return (
      <div className="gv-calendar-week-view__schedules">
        <ListLoading full />
      </div>
    );
  }

  if (data?.list.length === 0) {
    return (
      <div className="gv-calendar-week-view__schedules">
        <EmptyView full>조회된 일정이 없습니다.</EmptyView>
      </div>
    );
  }
  return (
    <ul className="gv-calendar-week-view__schedules">
      {data?.list.map((schedule) => {
        const calendar = CALENDARS[schedule.category];
        return (
          <li
            key={schedule.sbc_idx}
            style={{ background: calendar?.bgColor }}
            onClick={() => onScheduleClick && onScheduleClick(schedule)}
          >
            {schedule.title}
          </li>
        );
      })}
    </ul>
  );
};
