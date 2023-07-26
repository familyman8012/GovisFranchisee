import Head from "next/head";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ParsedUrlQuery } from "querystring";
import { useQuery, useQueryClient } from "react-query";
import { useRouter } from "next/router";

import style from "StyleFarm/scss/modules/Notice.module.scss";

import { fetchNoticeList } from "ApiFarm/notice";
import {
  INoticeBoardListRow,
  INoticeBoardListRequest,
  INoticeBoardListResponse,
} from "InterfaceFarm/Notice";

import Layout from "ComponentsFarm/layouts";

import ListMoreButton from "ComponentsFarm/elements/ListMoreButton";

import NoticeListHeader from "ComponentsFarm/pageComp/notice/NoticeListHeader";
import NoticeBoardList from "ComponentsFarm/pageComp/notice/NoticeList";

import { useQueryString } from "HookFarm/useQueryString";
import { authStore } from "src/mobx/store";

export default function NoticeList() {
  const router = useRouter();

  const qs = React.useMemo(
    () => new URLSearchParams(router.asPath.split("?")[1]),
    []
  );
  const queryClient = useQueryClient();

  const [totalCount, setTotalCount] = useState(0);
  const [list, setList] = useState<INoticeBoardListRow[]>([]);

  const user_id = useMemo(
    () => authStore.user_info?.user_idx ?? -1,
    [authStore.user_info?.user_idx]
  );

  const [params, setParams] = useQueryString<
    Omit<INoticeBoardListRequest, "user_id">
  >({
    page: parseInt((qs.get("page") as string) ?? "1"),
    size: 10,
    search: qs.get("search") ?? "",
  });

  const isInitialize = useMemo(
    () => list.length === 0 && params.page > 1,
    [list, params]
  );

  const { data, isLoading } = useQuery<INoticeBoardListResponse>(
    ["notices", params],
    () =>
      fetchNoticeList(
        isInitialize
          ? {
              user_id,
              ...params,
              page: 1,
              size: params.page * params.size,
            }
          : { ...params, user_id }
      ),
    {
      enabled: user_id > 0,
    }
  );

  useEffect(() => {
    if (!data) return;
    setTotalCount(data.count);
    setList(params.page === 1 ? data.list : [...list, ...data.list]);
  }, [data]);

  const handleClick = React.useCallback((sbnIdx: number) => {
    router.push({
      pathname: `/notice/board/${sbnIdx}`,
      query: router.query,
    });
  }, []);

  const handlerBtnMore = React.useCallback(
    () => setParams({ ...params, page: params.page + 1 }),
    [params]
  );
  const handlerSearch = (search: string) => {
    setParams({ ...params, page: 1, search });
  };

  // if (loading) {
  //   return (
  //     <Layout>
  //       <ListLoading full />
  //     </Layout>
  //   );
  // }

  return (
    <Layout>
      <Head>
        <title>공지사항 | GOVIS For Franchisee</title>
      </Head>
      <div className={`p-0 pb-5 ${style["notice"]}`}>
        <NoticeListHeader
          initialKeyword={params.search}
          callbackSearch={handlerSearch}
        />
        <NoticeBoardList
          className="orders"
          notices={list}
          loading={isLoading}
          searched={!!params.search}
          onClick={(row) => handleClick(row.sbn_idx)}
        />
        {list.length !== totalCount && (
          <ListMoreButton handler={handlerBtnMore} />
        )}
      </div>
    </Layout>
  );
}
