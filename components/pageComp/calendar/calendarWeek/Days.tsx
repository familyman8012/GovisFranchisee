import React from "react";
import dayjs from "dayjs";

import { toClasses } from "LibFarm/toClasses";
import { DAYNAMES, DAY_TIME } from "ComponentsFarm/pageComp/calendar/constants";

const Dayname = ({ time, active, onClick }: { time: number; onClick: (date: string) => void; active: boolean }) => {
  const date = dayjs(time);
  const day = date.day();
  const dd = date.date();
  return (
    <li
      className={toClasses([
        `gv-calendar-week-view__day`,
        active ? "gv-calendar-week-view__day--active" : "",
        day === 0 ? "gv-calendar-week-view__day--sunday" : "",
        day === 6 ? "gv-calendar-week-view__day--saturday" : "",
      ])}
      onClick={() => !active && onClick && onClick(date.format("YYYY-MM-DD"))}
    >
      {DAYNAMES[day]}
      <div>
        <span>{dd}</span>
      </div>
    </li>
  );
};

export const Days = ({ date, onChangeDate }: { date: string; onChangeDate: (date: string) => void }) => {
  const currentDate = dayjs(date).hour(0).minute(0).second(0).millisecond(0);
  const time = currentDate.valueOf() - currentDate.day() * DAY_TIME;

  return (
    <ul className="gv-calendar-week-view__days">
      {currentDate.isValid() &&
        DAYNAMES.map((dayname, i) => {
          const t = time + DAY_TIME * i;
          return <Dayname key={t} time={t} active={t === currentDate.valueOf()} onClick={onChangeDate} />;
        })}
    </ul>
  );
};
