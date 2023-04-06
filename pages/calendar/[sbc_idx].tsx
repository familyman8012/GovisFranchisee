import Head from "next/head";
import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import dayjs from "dayjs";

import style from "StyleFarm/scss/modules/Calendar.module.scss";

import useBack from "HookFarm/useBack";
import * as CalendarService from "ApiFarm/calendar";
import { CALENDARS, DAYNAMES } from "ComponentsFarm/pageComp/calendar/constants";
import { ISchedule } from "InterfaceFarm/Calendar";

import Layout from "ComponentsFarm/layouts";
import { ListLoading } from "ComponentsFarm/elements/Loading";

const CalnedarSchedulePage = () => {
  const router = useRouter();
  const back = useBack({
    passQuery: true,
  });

  const sbc_idx = useMemo(() => parseInt((router.query?.sbc_idx as string) ?? "-1"), [router.query]);
  const { data, isLoading } = useQuery<ISchedule, any>(
    ["calendars", sbc_idx],
    () => CalendarService.fetchSchedule(sbc_idx),
    {
      enabled: router.isReady,
      onError: back,
    }
  );

  const calendar = CALENDARS.find((cal) => cal.id === data?.category);
  const handleBack = () => back();

  if (isLoading || !router.isReady) {
    return (
      <Layout className={`p-0 ${style["calendar-page"]} ${style["calendar-detail-page"]}`}>
        <ListLoading full />
      </Layout>
    );
  }

  const startDate = dayjs(data?.start_date);
  const endDate = dayjs(data?.end_date);

  return (
    <Layout menuIconType={"back"} handlerMenuIcon={handleBack}>
      <Head>
        <title>{data?.title} | 캘린더 | GOVIS for Franchisee</title>
      </Head>
      <div className={`p-0 ${style["calendar-page"]} ${style["calendar-detail-page"]}`}>
        <section className={`${style["calendar-detail-page__container"]}`}>
          <p className={`${style["calendar-detail-page__type"]}`}>
            <span className={`${style["calendar-detail-page__dot"]}`} style={{ background: calendar?.bgColor }}></span>
            {calendar?.name}
          </p>
          <h3 className={style[`calendar-detail-page__title`]}>{data?.title}</h3>
          <ul className={style["calendar-detail-page__info"]}>
            <li className={style["calendar-detail-page__date"]}>
              <span>시작일</span>
              <span>{`${startDate.format("YYYY-MM-DD")} (${DAYNAMES[startDate.day()]})`}</span>
            </li>
            <li className={style["calendar-detail-page__date"]}>
              <span>종료일</span>
              <span>{`${endDate.format("YYYY-MM-DD")} (${DAYNAMES[endDate.day()]})`}</span>
            </li>
            <li className={style["calendar-detail-page__content"]}>{data?.content}</li>
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export default CalnedarSchedulePage;
