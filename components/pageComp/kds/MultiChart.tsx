import { PALLETES } from "LibFarm/color";
import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import OverflowChartWrapper from "../statistics/product/OverflowChartWrapper";

interface DataItem {
  display_label: string;
  display_item: {
    order_count: number;
    average_processing_time: number;
  };
}

interface Props {
  data: {
    list: DataItem[];
  };
}

const MultiChart: React.FC<Props> = ({ data }) => {
  const chartData = data.list.map((item) => ({
    label: item.display_label,
    orderCount: item.display_item.order_count,
    avgProcessingTime: item.display_item.average_processing_time,
  }));

  const legendFormatter = (value: string) => {
    switch (value) {
      case "orderCount":
        return "주문수";
      case "avgProcessingTime":
        return "평균처리시간";
      default:
        return value;
    }
  };

  const formatTime = (value: number) => {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = value % 60;
    return `${hours > 0 ? hours + "시간 " : ""}${minutes}분 ${seconds}초`;
  };

  const tooltipFormatter = (value: number, name: string) => {
    switch (name) {
      case "orderCount":
        return [value, "주문수"];
      case "avgProcessingTime":
        return [formatTime(value), "평균처리시간"];
      default:
        return [value, name];
    }
  };

  const timeFormatter = (value: number) => {
    return formatTime(value)
      .replace("시간", ":")
      .replace("분", ":")
      .replace("초", "");
  };

  return (
    <div className="wrap_chart">
      <div className="head">
        <h3 className="title">시간대별 주문 현황</h3>
      </div>
      <OverflowChartWrapper len={chartData.length}>
        <ResponsiveContainer width={1000} height={179}>
          <ComposedChart
            data={chartData}
            margin={{ top: 20, left: 0, right: 0 }}
          >
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={{
                stroke: PALLETES["typo-4"],
              }}
            />
            {/* <YAxis yAxisId="left" />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={timeFormatter}
          /> */}
            <Tooltip
              formatter={tooltipFormatter}
              cursor={{ fill: PALLETES["typo-6"] }}
            />
            {/* <Legend formatter={legendFormatter} /> */}
            <Bar
              yAxisId="left"
              dataKey="orderCount"
              barSize={28}
              label={{
                style: { fontWeight: 500, fontSize: "12px" },
                fill: PALLETES["typo-3"],
                position: "top",
              }}
              fill="#ffab6c"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="avgProcessingTime"
              stroke="#FFD98E"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </OverflowChartWrapper>
    </div>
  );
};

export default MultiChart;
