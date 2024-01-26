import React, { useMemo } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useQuery } from "react-query";
import { fetchOrderAnalyze } from "ApiFarm/product-analyze-dashboard";
import { IProductAnalyzeReq } from "InterfaceFarm/product-analyze";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import DonutChart from "@ComponentFarm/chart/DonutChart";
import { AreaBox } from "@ComponentFarm/template/common/AreaBox";
import { QueryParams } from "HookFarm/useQueryParams";
import { dateParams } from "./moreLinkDateParams";
import { OrderDonutLegend } from "../order/OrderDonutLegend";

const OrderSales = ({ params }: { params: QueryParams }) => {
  const { data: orderData } = useQuery(
    ["OrderAnalyze-Dashboard", params],
    () => fetchOrderAnalyze(params as IProductAnalyzeReq),
    { enabled: !!params.evi_product_category }
  );

  const chartData = useMemo(
    () =>
      orderData?.list.map((el, i) =>
        i === 0
          ? { ...el, fill: "#5A6ACF" }
          : i === 1
          ? { ...el, fill: "#8593ED" }
          : { ...el, fill: "#C7CEFF" }
      ),
    [orderData?.list]
  );

  return (
    <AreaBox
      title="주문방식별 제품 판매 현황"
      moreLink={`/product-analyze/order${
        params.base_dt_start ? `?${dateParams(params)}` : ""
      }`}
    >
      {orderData?.total.total_base_sales_count === 0 ? (
        <Empty Icon={<IoAlertCircleOutline size={42} />}>
          해당 조회 조건의 제품 판매 현황 데이터가 없습니다.
        </Empty>
      ) : (
        <DonutChart
          height="40rem"
          chartData={chartData}
          legend={<OrderDonutLegend />}
        />
      )}
    </AreaBox>
  );
};

export default OrderSales;
