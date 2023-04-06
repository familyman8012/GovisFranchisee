import React from "react";
import setComma from "LibFarm/PriceUtil";
import { LineChart, ResponsiveContainer, Tooltip, XAxis, Line, YAxis, Legend } from "recharts";

export interface iHomeDefaultAreaChartData {
  [key: string]: number | string;
  name: string;
  // 이번주: number,
  // 지난주: number,
}

const HomeDefaultAreaChartTooltip = (props: any) => {
  const { label, date, payload, labelPrefix, labelSuffix, valueUnit } = props;

  if (payload && payload.length > 0) {
    return (
      <ul className={`chart-wrapper-bar__tooltip`}>
        <li style={{ fontWeight: 500 }}>{`${labelPrefix} - ${label}${labelSuffix}`}</li>

        <li style={{ color: "#FFAB6C", fontWeight: 500 }}>
          {payload[0]["dataKey"]} : {setComma(payload[0]["value"])}
          {valueUnit}
        </li>
        <li style={{ color: "#FFD98E", fontWeight: 500 }}>
          {payload[1]["dataKey"]} : {setComma(payload[1]["value"])}
          {valueUnit}
        </li>
      </ul>
    );
  }
  return null;
};

export default function HomeDefaultAreaChart(props: any) {
  const { data, labelPrefix, labelSuffix, valueUnit, xAxisDataKey_1, xAxisDataKey_2 } = props;
  return (
    <div className={"chart-wrapper"}>
      <ResponsiveContainer width="100%" height="100%" className="chart-wrapper__view" debounce={300}>
        <LineChart data={data}>
          <XAxis padding={{ left: 10, right: 10 }} tickMargin={10} axisLine={false} tickLine={false} dataKey="name" />
          <Tooltip
            content={
              <HomeDefaultAreaChartTooltip labelPrefix={labelPrefix} labelSuffix={labelSuffix} valueUnit={valueUnit} />
            }
          />
          <Legend
            iconType="plainline"
            iconSize={15}
            wrapperStyle={{ transform: "translateY(10px)" }}
            formatter={(value) => <span className="recharts-legend-label">{value}</span>}
          />
          <Line strokeWidth={2.5} dot={false} type="monotone" dataKey={xAxisDataKey_1} stroke="#FFAB6C" />
          <Line strokeWidth={2.5} dot={false} type="monotone" dataKey={xAxisDataKey_2} stroke="#FFD98E" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
