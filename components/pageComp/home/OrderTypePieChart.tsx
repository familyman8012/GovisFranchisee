import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

export interface iOrderTypePieChartData {
  name: string;
  value: number;
}

const COLORS = ["#FFAB6C", "#7DA9FF", "#A585FF", "#FF92A5"];

const OrderTypeLegend = (props: any) => {
  const { payload } = props;

  return (
    <div className={"chart-wrapper__legend"}>
      <ul>
        {payload
          .sort((a: { value: number }, b: { value: number }) => a.value - b.value)
          .map((item: any) => (
            <li key={item.value}>
              <span className="chart-wrapper__symbol" style={{ color: item.color }} />
              {item.value}
              <span className="chart-wrapper__unit weight-600">{Math.round((item.payload.percent || 0) * 100)}%</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default function OrderTypePieChart(props: { data: Array<iOrderTypePieChartData> }) {
  const { data } = props;
  return (
    <div className={"chart-wrapper"}>
      <ResponsiveContainer width="100%" height="100%" className={"chart-wrapper__view"}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" fill="#8884d8" dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            layout="vertical"
            verticalAlign="middle"
            wrapperStyle={{ width: "40%" }}
            align="right"
            content={OrderTypeLegend}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
