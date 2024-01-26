import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useInfiniteQuery } from "react-query";
import { fetchDataHistoryList } from "ApiFarm/history";
import { IEnvironmentRes } from "InterfaceFarm/environment";
import { IHistoryResItem } from "InterfaceFarm/history";
import PageLayout from "@ComponentFarm/layout/PageLayout";
import InfiniteHistoryTable from "./InfiniteHistoryTable";
import { HistoryPageLayout } from "./style";
import { Tab } from "../product/manage/const";

type Config = {
  idx: string;
  endpoint: string;
  subTitle?: string;
  tabData: Tab[];
  subRoot?: boolean;
};

/**
 * @TODO 구조 통일 generateHistoryPage, generateHistoryPage2
 */
const generateHistoryPage2 = (config: Config) => {
  return function HistoryPage({
    environment,
  }: {
    environment: IEnvironmentRes;
  }) {
    const router = useRouter();
    const [params] = useState({
      per_num: 20,
    });

    const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery(
      [config.endpoint, router.query.id],
      ({ pageParam = 1 }) =>
        fetchDataHistoryList(`${config.endpoint}/${config.idx}`, {
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
        cacheTime: 60,
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
      <PageLayout
        subRoot={config.subRoot}
        tabData={config.tabData}
        title={config.subTitle}
      >
        <HistoryPageLayout>
          {config.subTitle && <h2>{config.subTitle}</h2>}
          <InfiniteHistoryTable
            envs={environment?.list ?? []}
            list={list}
            loading={isLoading}
            onBottomScroll={handleLoadData}
          />
        </HistoryPageLayout>
      </PageLayout>
    );
  };
};

export default generateHistoryPage2;
