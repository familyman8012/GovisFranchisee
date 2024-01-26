// pages/index.js 또는 다른 컴포넌트 파일
import React, { useCallback } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  PieLabelRenderProps,
  ResponsiveContainer,
} from 'recharts';

interface ChartProps {
  chartData: { name: string; value: number }[];
  size: string;
  gradient?: [string, string];
  labelComponent?: React.ReactElement;
}

const RingChart = ({
  chartData,
  size,
  gradient,
  labelComponent,
}: ChartProps) => {
  const renderLabel = useCallback(
    (props: PieLabelRenderProps) => {
      if (props.index === 0 && labelComponent)
        return React.cloneElement(labelComponent, props);
      return null;
    },
    [labelComponent]
  );

  return (
    <div style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          {gradient && (
            <defs>
              <linearGradient id="customGradient" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor={gradient[0]} />
                <stop offset="1" stopColor={gradient[1]} />
              </linearGradient>
            </defs>
          )}
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius="83%"
            outerRadius="100%"
            startAngle={90}
            endAngle={450}
            dataKey="value"
            label={renderLabel}
            labelLine={false}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === 0 ? 'url(#customGradient)' : '#FFECEC'}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RingChart;
