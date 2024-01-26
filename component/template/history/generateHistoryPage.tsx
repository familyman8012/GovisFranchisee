import { useCallback, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useInfiniteQuery } from "react-query";
import { fetchDataHistoryList } from "ApiFarm/history";
import { IHistoryResItem } from "InterfaceFarm/history";
import { Button } from "@ComponentFarm/atom/Button/Button";
import type { LayoutWithTitleBoxAndTabProps } from "@ComponentFarm/template/layout/LayoutWithTitleBoxAndTab";
import LayoutTitleBoxWithTab from "@ComponentFarm/template/layout/LayoutWithTitleBoxAndTab";
import { useGoMove } from "HookFarm/useGoMove";
import { EnvStore } from "MobxFarm/store";
import InfiniteHistoryTable from "./InfiniteHistoryTable";
import { HistoryPageLayout } from "./style";

type Config = {
  endpoint: string;
  subTitle?: string;
  layoutProps: LayoutWithTitleBoxAndTabProps;
};

/**
 * @TODO 구조 통일 generateHistoryPage, generateHistoryPage2
 */
const generateHistoryPage = (config: Config) => {
  const HistoryPage = () => {
    const router = useRouter();
    const { onBack } = useGoMove();
    const [params] = useState({
      per_num: 20,
    });

    const computedEndpoint = useMemo(
      () =>
        config.endpoint
          .split("/")
          .map((v) => {
            const returnVal =
              v.search(/\[.*\]$/) !== -1
                ? router.query[v.replace(/\[(.*)\]/, "$1")]
                : v;
            return returnVal;
          })
          .join("/"),
      [router.query]
    );

    const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery(
      [computedEndpoint, params],
      ({ pageParam = 1 }) =>
        fetchDataHistoryList(computedEndpoint, {
          ...params,
          current_num: pageParam,
        }),
      {
        getNextPageParam: (response, allPages) => {
          const maxPageNumber = Math.ceil(
            response.total_count / params.per_num
          );
          if (maxPageNumber < allPages.length + 1) return undefined;
          return allPages.length + 1;
        },
        enabled: !!router.isReady,
      }
    );

    const list = useMemo(
      () =>
        ([] as IHistoryResItem[])
          .concat(...(data?.pages.map((res) => res.list) ?? []))
          .filter((item) => !item.log_column?.endsWith("_idx")),
      [data]
    );

    const handleLoadData = useCallback(() => {
      if (hasNextPage) fetchNextPage();
    }, [hasNextPage, fetchNextPage]);

    return (
      <HistoryPageLayout>
        <LayoutTitleBoxWithTab
          {...config.layoutProps}
          actionButtons={
            <Button variant="gostSecondary" onClick={() => onBack()}>
              이전
            </Button>
          }
        />
        {config.subTitle && <h2>{config.subTitle}</h2>}
        <InfiniteHistoryTable
          envs={EnvStore?.data?.list ?? []}
          list={list}
          loading={isLoading}
          onBottomScroll={handleLoadData}
        />
      </HistoryPageLayout>
    );
  };

  return observer(HistoryPage);
};

export default generateHistoryPage;
