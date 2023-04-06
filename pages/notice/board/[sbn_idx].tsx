import Head from "next/head";
import React from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import dayjs from "dayjs";

import { Calendar } from "@emotion-icons/bootstrap/Calendar";
import { PersonCircle } from "@emotion-icons/bootstrap/PersonCircle";

import style from "StyleFarm/scss/modules/Notice.module.scss";

import useBack from "HookFarm/useBack";
import { fetchNotice } from "ApiFarm/notice";

import { INoticeBoardViewResponse } from "InterfaceFarm/Notice";

import { ListLoading } from "ComponentsFarm/elements/Loading";
import HtmlViewer from "ComponentsFarm/elements/HtmlViewer";
import Layout from "ComponentsFarm/layouts";

import { BoardExplore, BoardExploreItem, BoardViewLabel } from "ComponentsFarm/module/Board";
import { authStore } from "src/mobx/store";

export default function NoticeBoardView() {
  const router = useRouter();
  const back = useBack({ passQuery: true });
  const { session, loading } = authStore;

  const sbn_idx = React.useMemo(() => parseInt(router.query.sbn_idx as string), [router.query]);

  const { data, isLoading } = useQuery<INoticeBoardViewResponse>(
    ["notices", sbn_idx],
    () => fetchNotice({ sbn_idx, user_id: session?.info?.user_id ?? -1 }),
    {
      enabled: !isNaN(sbn_idx),
    }
  );

  const handleChangeNotice = React.useCallback((changeIdx: number) => router.push(`/notice/board/${changeIdx}`), []);

  if (isLoading) {
    return (
      <Layout>
        <ListLoading full />
      </Layout>
    );
  }

  return (
    <Layout menuIconType="back" handlerMenuIcon={back}>
      <Head>
        <title>{data?.title ?? "공지사항"} | GOVIS For Franchisee</title>
      </Head>
      <article className={style["notice-detail"]}>
        <h3 className={style["notice-detail__title"]}>{data?.title}</h3>
        <div className={style["notice-detail__info"]}>
          <BoardViewLabel icon={<PersonCircle />}>관리자</BoardViewLabel>
          <div>
            <BoardViewLabel icon={<Calendar />}>{dayjs(data?.created_at).format("YYYY-MM-DD")}</BoardViewLabel>
          </div>
        </div>
        <div className={style["notice-detail__content"]}>
          <HtmlViewer html={`${data?.content === undefined ? "" : data?.content}`} />
        </div>
      </article>
      <BoardExplore>
        <BoardExploreItem
          label="이전"
          id={data?.previous_notice.sbn_idx ?? 0}
          title={data?.previous_notice?.title ?? ""}
          onClick={handleChangeNotice}
        />
        <BoardExploreItem
          label="다음"
          id={data?.next_notice.sbn_idx ?? 0}
          title={data?.next_notice?.title ?? ""}
          onClick={handleChangeNotice}
        />
      </BoardExplore>
    </Layout>
  );
}
