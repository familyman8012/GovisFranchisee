import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import dayjs from "dayjs";

import { Calendar } from "@emotion-icons/bootstrap/Calendar";
import { PersonCircle } from "@emotion-icons/bootstrap/PersonCircle";

import style from "StyleFarm/scss/modules/ProductRecipe.module.scss";

import * as PracticeService from "ApiFarm/practice";
import { IPractice } from "InterfaceFarm/Practice";
import useBack from "HookFarm/useBack";

import Layout from "ComponentsFarm/layouts";
import HtmlViewer from "ComponentsFarm/elements/HtmlViewer";
import { BoardExplore, BoardExploreItem, BoardViewLabel } from "ComponentsFarm/module/Board";
import { ListLoading } from "ComponentsFarm/elements/Loading";

export default function PracticeView() {
  const back = useBack({
    passQuery: true,
  });
  const router = useRouter();

  const sbs_idx = useMemo(() => parseInt(router.query.sbs_idx as string), [router.query]);

  const { data, isLoading } = useQuery<IPractice>(
    ["best-practices", sbs_idx],
    () => PracticeService.fetchPractice(sbs_idx),
    {
      onError: () => back(),
      enabled: router.isReady,
    }
  );

  const handleChangeId = (changeIdx: number) => router.push(`/board/best-practices/${changeIdx}`);

  if (isLoading) {
    return (
      <Layout menuIconType={"back"} handlerMenuIcon={back}>
        <ListLoading full />
      </Layout>
    );
  }

  return (
    <Layout menuIconType={"back"} handlerMenuIcon={back}>
      <article className={style["product-recipe-detail"]}>
        <h3 className={style["product-recipe-detail__title"]}>{data?.title}</h3>
        <div className={style["product-recipe-detail__info"]}>
          <BoardViewLabel icon={<PersonCircle />}>관리자</BoardViewLabel>
          <div>
            <BoardViewLabel icon={<Calendar />}>{dayjs(data?.created_at).format("YYYY-MM-DD")}</BoardViewLabel>
          </div>
        </div>
        {/* content */}
        <div className={style["product-recipe-detail__content"]}>
          <HtmlViewer html={`${data?.content === undefined ? "" : data?.content}`} />
        </div>
      </article>
      {/* next article & prev article */}
      <BoardExplore>
        <BoardExploreItem
          label="이전"
          id={data?.prev_story?.prev_idx || 0}
          title={data?.prev_story?.prev_title || ""}
          onClick={handleChangeId}
        />
        <BoardExploreItem
          label="다음"
          id={data?.next_story?.next_idx || 0}
          title={data?.next_story?.next_title || ""}
          onClick={handleChangeId}
        />
      </BoardExplore>
    </Layout>
  );
}
