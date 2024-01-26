import React from "react";
import { useQuery } from "react-query";
import { fetchAisttStoreList } from "ApiFarm/aistt";
import Pagination from "@ComponentFarm/modules/Paginate/Pagination";
import { Tabs } from "@ComponentFarm/atom/Tab/Tab";
import TitleArea from "@ComponentFarm/layout/TitleArea";
import AisttDeviceFilter from "@ComponentFarm/template/aistt/device/DeviceFilter";
import { DevicePageStyle } from "@ComponentFarm/template/aistt/device/style";
import MonitoringStoreList from "@ComponentFarm/template/aistt/monitoring/MonitoringStoreList";
import { SectionStyle } from "@ComponentFarm/template/aistt/style";
import TitleBox from "@ComponentFarm/template/common/SubTitleBox";
import useQueryParams from "HookFarm/useQueryParams";
import Layout from "ComponentsFarm/layouts";

const MonitoringListPage = () => {
  const [params, updateParams, resetParams] = useQueryParams({
    current_num: 1,
    per_num: 10,
    is_use_stt: "1",
    program_status: "",
  });

  const { data, isFetching } = useQuery(
    ["aistt-store-list", params],
    () =>
      fetchAisttStoreList({
        ...params,
        sort_target: params.sort_target ? params.sort_target : "store_name",
        sort_type: params.sort_target ? params.sort_type : "desc",
      }),
    {
      keepPreviousData: true,
    }
  );

  return (
    <Layout>
      <TitleArea title="매장 모니터링" BtnBox={<></>} />
      <Tabs
        id="aistt-monitoring-list"
        tabs={[{ title: "매장 목록" }]}
        activeTabIndex={0}
        onTabChange={() => {}}
      />
      <DevicePageStyle className="bg-gray">
        <TitleBox
          title="매장 목록"
          desc="Smart Topping Table이 적용된 매장을 확인할 수 있습니다."
          hideUnderline
        />
        <AisttDeviceFilter
          params={params}
          updateParams={updateParams}
          resetParams={resetParams}
          hideStatusFilter
        />
        <SectionStyle>
          <h3 className="title">매장 목록</h3>
          <span className="count">
            총 <span className="number">{data?.total_count ?? 0}</span> 개
          </span>
        </SectionStyle>
        <MonitoringStoreList
          loading={isFetching}
          list={data?.list ?? []}
          updateParams={updateParams}
        />
        <Pagination
          pageInfo={[Number(params.current_num), Number(params.per_num)]}
          totalCount={data?.total_count ?? 0}
          handlePageChange={(current_num) => updateParams({ current_num })}
        />
      </DevicePageStyle>
    </Layout>
  );
};

export default MonitoringListPage;
