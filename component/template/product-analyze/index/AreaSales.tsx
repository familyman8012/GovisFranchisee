import React, { useMemo } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useQuery } from "react-query";
import { css } from "@emotion/react";
import { fetchAreaAnalyze } from "ApiFarm/product-analyze";
import { IProductAnalyzeReq } from "InterfaceFarm/product-analyze";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import DonutChart from "@ComponentFarm/chart/DonutChart";
import { AreaBox } from "@ComponentFarm/template/common/AreaBox";
import { QueryParams } from "HookFarm/useQueryParams";
import { dateParams } from "./moreLinkDateParams";
import { OrderDonutLegend } from "../order/OrderDonutLegend";

const AreaSales = ({ params }: { params: QueryParams }) => {
  const { data } = useQuery(
    ["AreaAnalyze-Dashboard", params],
    () => fetchAreaAnalyze(params as IProductAnalyzeReq),
    { enabled: !!params.evi_product_category }
  );

  const chartData = useMemo(
    () =>
      data?.list.map((el, i) =>
        i === 0
          ? { ...el, fill: "#06B6D4" }
          : i === 1
          ? { ...el, fill: "#3B82F6" }
          : i === 2
          ? { ...el, fill: "#0EA5E9" }
          : { ...el, fill: "#6366F1" }
      ),
    [data?.list]
  );

  return (
    <AreaBox
      title="상권별 제품 판매 현황"
      moreLink={`/product-analyze/area${
        params.base_dt_start ? `?${dateParams(params)}` : ""
      }`}
      css={css`
        height: data?.total.total_base_sales_count === 0 ? auto : 61.8rem;
      `}
    >
      {data?.total.total_base_sales_count === 0 ? (
        <Empty Icon={<IoAlertCircleOutline size={42} />}>
          해당 조회 조건의 제품 판매 현황 데이터가 없습니다.
        </Empty>
      ) : (
        <DonutChart
          height="50rem"
          chartData={chartData}
          legend={<OrderDonutLegend />}
        />
      )}
    </AreaBox>
  );
};

export default AreaSales;
