import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { fetchInspectionList } from "ApiFarm/aistt";
import { fetchStoreSearchModal } from "ApiFarm/search-modal";
import Pagination from "@ComponentFarm/modules/Paginate/Pagination";
import AnalysisVideoList from "@ComponentFarm/template/aistt/analysis/AnalysisVideoList";
import { AnalysisPageStyle } from "@ComponentFarm/template/aistt/analysis/style";
import MonitoringDetailFilter from "@ComponentFarm/template/aistt/monitoring/MonitoringDetailFilter";
import { SectionStyle } from "@ComponentFarm/template/aistt/style";
import LayoutTitleBoxWithTab from "@ComponentFarm/template/layout/LayoutWithTitleBoxAndTab";
import useQueryParams from "HookFarm/useQueryParams";
import Layout from "ComponentsFarm/layouts";

const MonitoringAnalysisListPage = () => {
  const router = useRouter();

  const store_idx = useMemo(
    () => parseInt(router.query?.store_idx as string, 10),
    [router.query, router.isReady]
  );

  const [params, updateParams, resetParams] = useQueryParams({
    per_num: 20,
    current_num: 1,
  });

  const { data: storeInfo } = useQuery(
    ["aistt-store-info", store_idx],
    () =>
      fetchStoreSearchModal({
        store_idx,
      }),
    {
      enabled: !!store_idx,
    }
  );

  const { data, isFetching } = useQuery(
    ["monitoring-analysis-list", params],
    () =>
      fetchInspectionList({
        ...params,
        inspection_status: "complete",
        store_idx,
      }),
    {
      enabled: !!store_idx,
      keepPreviousData: true,
    }
  );

  return (
    <Layout>
      <LayoutTitleBoxWithTab
        title="제품 모니터링"
        tabs={React.useMemo(
          () => [
            {
              title: "제조 제품 목록",
              path: `/aistt-monitoring/[store_idx]`,
            },
            {
              title: "매장 테이블 영상 목록",
              path: `/aistt-monitoring/[store_idx]/videos`,
            },
          ],
          []
        )}
      />
      <AnalysisPageStyle>
        <MonitoringDetailFilter
          storeName={storeInfo?.list?.[0].store_name ?? ""}
          params={params}
          updateParams={updateParams}
          resetParams={resetParams}
        />
        <SectionStyle>
          <span className="count">
            총 <span className="number">{data?.total_count}</span> 건
          </span>
        </SectionStyle>
        <AnalysisVideoList
          loading={isFetching}
          list={data?.list ?? []}
          onItemSelect={(item) => {
            router.push({
              pathname: `/aistt-monitoring/${store_idx}/analysis/${item.inspection_info_idx}`,
              query: router.query,
            });
          }}
        />
        <Pagination
          pageInfo={[Number(params?.current_num), Number(params?.per_num)]}
          totalCount={data?.total_count ?? 0}
          handlePageChange={(current_num) => updateParams({ current_num })}
        />
      </AnalysisPageStyle>
    </Layout>
  );
};

export default MonitoringAnalysisListPage;
