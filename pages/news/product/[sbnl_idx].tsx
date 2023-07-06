import React, { useCallback, useMemo } from "react";
import { Router, useRouter } from "next/router";
import { useQuery } from "react-query";
import dayjs from "dayjs";

import { Calendar } from "@emotion-icons/bootstrap/Calendar";
import { PersonCircle } from "@emotion-icons/bootstrap/PersonCircle";

import style from "StyleFarm/scss/modules/NewsLetter.module.scss";

import { INews } from "InterfaceFarm/NewsLetter";
import { fetchNewsLetter } from "ApiFarm/newsletter";
import useBack from "HookFarm/useBack";

import HtmlViewer from "ComponentsFarm/elements/HtmlViewer";
import Layout from "ComponentsFarm/layouts";
import { ListLoading } from "ComponentsFarm/elements/Loading";
import {
  BoardExplore,
  BoardExploreItem,
  BoardViewLabel,
} from "ComponentsFarm/module/Board";

export default function NewsLetterView() {
  const router = useRouter();
  const back = useBack({
    passQuery: true,
  });

  const sbnl_idx = useMemo(
    () => parseInt(router.query.sbnl_idx as string),
    [router.query]
  );
  const { data, isLoading } = useQuery<INews>(
    ["news", sbnl_idx],
    () => fetchNewsLetter(sbnl_idx),
    {
      onError: () => back(),
      enabled: router.isReady,
    }
  );

  const handleChangeId = useCallback(
    (changeIdx: number) => router.push(`/news/product/${changeIdx}`),
    []
  );

  if (isLoading || !router.isReady) {
    return (
      <Layout menuIconType={"back"} handlerMenuIcon={back}>
        <ListLoading full />
      </Layout>
    );
  }

  return (
    <Layout menuIconType={"back"} handlerMenuIcon={back}>
      <article className={style["news-detail"]}>
        <h3 className={style["news-detail__title"]}>{data?.title}</h3>
        <div className={style["news-detail__info"]}>
          <BoardViewLabel icon={<PersonCircle />}>관리자</BoardViewLabel>
          <div>
            <BoardViewLabel icon={<Calendar />}>
              {dayjs(data?.created_at).format("YYYY-MM-DD")}
            </BoardViewLabel>
          </div>
        </div>
        {/* content */}
        <div className={style["news-detail__content"]}>
          <HtmlViewer
            html={`${data?.content === undefined ? "" : data?.content}`}
          />
        </div>
      </article>
      {/* next article & prev article */}
      <BoardExplore>
        <BoardExploreItem
          label="이전"
          id={data?.prev_newsletter.prev_idx || 0}
          title={data?.prev_newsletter.prev_title || ""}
          onClick={handleChangeId}
        />
        <BoardExploreItem
          label="다음"
          id={data?.next_newsletter.next_idx || 0}
          title={data?.next_newsletter.next_title || ""}
          onClick={handleChangeId}
        />
      </BoardExplore>
    </Layout>
  );
}
