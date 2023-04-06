import React, { useMemo, useRef } from "react";
import { Bar, BarChart, Tooltip, XAxis, ResponsiveContainer, Pie, Legend, PieChart, Cell } from "recharts";

import useElementSize from "HookFarm/useElementSize";

import { PALLETES } from "LibFarm/color";

import { ListLoading } from "ComponentsFarm/elements/Loading";

import { PRODUCT_CATEGORIES } from "./constants";

import OverflowChartWrapper from "./OverflowChartWrapper";
import { IProductResultChartItem } from "InterfaceFarm/Product";
import { EmptyView } from "ComponentsFarm/elements/EmptyView";

interface ProductBarChartProps {
  data: IProductResultChartItem[];
  loading?: boolean;
  tickWidth?: number;
}

interface ITooltipItem {
  payload: IProductResultChartItem;
  dataKey: string;
  color: string;
  value: number;
}

const CustomTooltip = ({ active, payload }: any) => {
  return (
    active && (
      <ul className={`chart-wrapper-bar__tooltip gv-typo-body-2`}>
        {payload?.map((item: ITooltipItem, i: number) => (
          <li key={i}>
            <p className={`text-typo-1 weight-bold w-100 d-flex justify-content-between`}>
              {item.payload?.display_label}
              <span className="ps-3 text-typo-3 weight-bold">{`총 주문 수: ${item.value}`}</span>
            </p>
            <ul className="mt-1">
              {item.payload.display_item
                .sort((a, b) => b.order_count - a.order_count)
                .map((displayItem) => {
                  const category = PRODUCT_CATEGORIES[displayItem.product_category];
                  return (
                    <li
                      key={displayItem.product_category}
                      className={`mb-0 mt-0 weight-bold w-100 d-flex justify-content-between`}
                    >
                      {category.label}
                      <span className="text-typo-3">{`${displayItem.order_count} (${Math.round(
                        (displayItem.order_count / item.value) * 100
                      )}%)`}</span>
                    </li>
                  );
                })}
            </ul>
          </li>
        ))}
      </ul>
    )
  );
};

const ProductBarChart = ({ data, loading, tickWidth = 80 }: ProductBarChartProps) => {
  const ref = useRef(null);
  const [width] = useElementSize(ref);
  const contentWidth = useMemo(
    () => (tickWidth * data.length >= width ? tickWidth * data.length : "100%"),
    [width, data, tickWidth]
  );

  const chartData = useMemo(
    () =>
      data?.map((item) => ({
        ...item,
        total_count: item.display_item.reduce((tot, item) => tot + item.order_count, 0),
      })) ?? [],
    [data]
  );

  const $tooltip = React.useCallback((props: any) => <CustomTooltip {...props} />, []);

  if (loading) {
    return (
      <div className={"chart-wrapper-bar"} ref={ref}>
        <ListLoading full />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={"chart-wrapper-bar"} ref={ref}>
        <EmptyView full>조회된 데이터가 없습니다.</EmptyView>
      </div>
    );
  }

  return (
    <OverflowChartWrapper ref={ref} len={data.length} className={"chart-wrapper-bar"}>
      <ResponsiveContainer width={contentWidth} height="100%" className={"chart-wrapper-bar__view"}>
        <BarChart margin={{ top: 20, left: 0, right: 0 }} data={chartData}>
          <Tooltip content={$tooltip} cursor={{ fill: PALLETES["typo-6"] }} />
          <XAxis
            tickLine={false}
            axisLine={{
              stroke: PALLETES["typo-4"],
            }}
            dataKey="display_label"
            interval={0}
          />
          <Bar
            isAnimationActive={false}
            barSize={28}
            label={{ style: { fontWeight: 500, fontSize: "12px" }, fill: PALLETES["typo-3"], position: "top" }}
            dataKey={"total_count"}
            fill={PALLETES["p-orange-1"]}
          />
        </BarChart>
      </ResponsiveContainer>
    </OverflowChartWrapper>
  );
};

export default ProductBarChart;
