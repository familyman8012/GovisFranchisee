import React from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useQuery } from "react-query";
import { fetchChannelAnalyze } from "ApiFarm/product-analyze-dashboard";
import { IProductAnalyzeReq } from "InterfaceFarm/product-analyze";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import { BarCharts } from "@ComponentFarm/chart/BarCharts";
import { AreaBox } from "@ComponentFarm/template/common/AreaBox";
import { QueryParams } from "HookFarm/useQueryParams";
import { dateParams } from "./moreLinkDateParams";

const ChannelSaels = ({ params }: { params: QueryParams }) => {
  const { data: channelData } = useQuery(
    ["ChannelAnalyze-Dashboard", params],
    () => fetchChannelAnalyze(params as IProductAnalyzeReq),
    { enabled: !!params.evi_product_category }
  );

  return (
    <AreaBox
      title="주문채널별 제품 판매 현황"
      moreLink={`/product-analyze/channel${
        params.base_dt_start ? `?${dateParams(params)}` : ""
      }`}
    >
      {channelData?.total.total_base_sales_count === 0 &&
      channelData.total.total_comparison_sales_count === 0 ? (
        <Empty Icon={<IoAlertCircleOutline size={42} />}>
          해당 조회 조건의 제품 판매 현황 데이터가 없습니다.
        </Empty>
      ) : (
        <BarCharts
          type="diff"
          height="40rem"
          chartData={channelData?.list}
          barSize={6}
          tickCount={7}
          isLegend
          diffSet={[
            {
              name: "기준일",
              dataKey: "base_sales_count",
              fill: "#5A6ACF",
            },
            {
              name: "비교일",
              dataKey: "comparison_sales_count",
              fill: "#E6E8EC",
            },
          ]}
        />
      )}
    </AreaBox>
  );
};

export default ChannelSaels;
