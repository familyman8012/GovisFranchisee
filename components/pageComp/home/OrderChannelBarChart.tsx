import React from "react";
import { BarChart, Bar, XAxis, Legend, ResponsiveContainer, Tooltip } from "recharts";
import setComma from "LibFarm/PriceUtil";

export interface iOrderChannelBarChart {
  name: string;
  [key: string]: any;
}

const OrderChannelBarChartLegend = (props: { date_1: string; date_2: string }) => {
  const { date_1, date_2 } = props;

  return (
    <ul className={`chart-wrapper-bar__legend `}>
      <li className={``}>
        <svg className={``} width="14" height="14" viewBox="0 0 32 32" version="1.1">
          <path stroke="none" fill="#FFAB6C" d="M0,4h32v24h-32z" className=""></path>
        </svg>
        <span className="" style={{ color: "#FFAB6C" }}>
          {date_1}
        </span>
      </li>

      <li className={``}>
        <svg className={``} width="14" height="14" viewBox="0 0 32 32" version="1.1">
          <path stroke="none" fill=" #FDD2B2" d="M0,4h32v24h-32z" className=""></path>
        </svg>
        <span className="" style={{ color: "#FDD2B2" }}>
          {date_2}
        </span>
      </li>
    </ul>
  );
};

const CustomTooltip = (props: any) => {
  const { label, date, payload } = props;

  if (payload.length > 0) {
    return (
      <ul className={`chart-wrapper-bar__tooltip`}>
        <li className={``}>{`주문 채널 - ${label}`}</li>

        <li style={{ color: "#FFAB6C" }}>
          {payload[1]["dataKey"]} : {setComma(payload[1]["value"])}원
        </li>
        <li style={{ color: "#FFD5B5" }}>
          {payload[0]["dataKey"]} : {setComma(payload[0]["value"])}원
        </li>
      </ul>
    );
  }
  return null;
};

export default function OrderChannelBarChart(props: { data: iOrderChannelBarChart[]; date_1: string; date_2: string }) {
  const { data, date_1, date_2 } = props;

  return (
    <div className={"chart-wrapper-bar"}>
      <ResponsiveContainer width="100%" height="100%" className={"chart-wrapper-bar__view"}>
        <BarChart barGap={-40} data={data}>
          <XAxis axisLine={false} tickLine={false} dataKey="name" />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<OrderChannelBarChartLegend date_1={date_1} date_2={date_2} />} />
          <Bar barSize={28} dataKey={date_2} fill="#FFD5B5" />
          <Bar barSize={28} dataKey={date_1} fill="#FFAB6C" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
