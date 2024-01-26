// pages/myChartPage.js 또는 components/MyChartComponent.js

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import CustomTooltip from './CustomTooltip';

// 샘플 데이터
const data = [
  { name: '배달', value: 0.5, fill: '#FF4600' },
  { name: '내점', value: -0.8, fill: '#2264E5' },
  { name: '포장', value: 1.8, fill: '#FF4600' },
];

// 차트 컴포넌트
const BarIncreaseChart = () => (
  <ResponsiveContainer width="100%" aspect={2.5}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 0" vertical={false} />
      <XAxis dataKey="name" axisLine={false} tickLine={false} />
      <YAxis
        tickCount={undefined}
        axisLine={false}
        tickLine={false}
        domain={[-2, 2]}
        tickFormatter={tickItem => tickItem.toFixed(1)}
      />
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="value" fill="#8884d8">
        <LabelList
          dataKey="value"
          position="top"
          formatter={(value: number) =>
            `${value > 0 ? '+' : ''}${(value * 100).toFixed(0)}%`
          }
        />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export default BarIncreaseChart;
