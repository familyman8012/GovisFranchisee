import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, YAxis } from 'recharts';

// 데이터
const data = [
  {
    name: '피자',
    uv: 3054,
    fill: '#ff672e',
  },
];

// 차트 컴포넌트
const ProgressBarChart = ({ chartData }: { chartData: any }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} layout="vertical">
      <XAxis type="number" hide />
      <YAxis type="category" hide />
      <Bar dataKey="uv" radius={[32, 0, 0, 32]} background={{ fill: '#eee' }} />
    </BarChart>
  </ResponsiveContainer>
);

export default ProgressBarChart;
