import React, { useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  Legend,
} from 'recharts';
import { BasicTooltip } from './BasicTooltip';

const LegendFormatter = ({ value }: { value: string }) => {
  return <span style={{ color: 'var(--color-neutral50)' }}>{value}</span>;
};

export const BarCharts = ({
  type,
  height,
  chartData,
  barSize,
  tickCount,
  domain,
  xKey = 'item_label',
  yKey,
  xTickFormatter,
  yTickFormatter,
  toolTip = <BasicTooltip />,
  fill,
  hasGrid = false,
  diffSet,
  isTooltip = true,
  isLegend,
  isLabelList,
  LabelListFormatter,
  angle,
}: {
  type?: string;
  height?: string;
  chartData: any;
  barSize?: number;
  tickCount?: number;
  domain?: any[];
  xKey?: string;
  yKey?: string;
  xTickFormatter?: (value: string) => string;
  yTickFormatter?: (value: number) => string;
  toolTip?: any;
  fill?: string;
  hasGrid?: boolean;
  isTooltip?: boolean;
  isLegend?: boolean;
  diffSet?: { name: string; dataKey: string; fill: string }[];
  isLabelList?: boolean;
  LabelListFormatter?: (value: number) => string;
  angle?: number;
}) => {
  const chartDataName =
    chartData?.length > 0 ? Object.keys(chartData[0]) : null;
  const formatter = useCallback(
    (value: string) => <LegendFormatter value={value} />,
    []
  );
  return (
    <div style={{ height }}>
      {chartDataName ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            barSize={barSize}
            margin={{
              top: 15,
              bottom: 15,
              left: 15,
            }}
          >
            <CartesianGrid strokeDasharray="2 0" vertical={hasGrid} />
            <XAxis
              dataKey={xKey}
              axisLine={false}
              tickLine={false}
              interval={0}
              tickFormatter={xTickFormatter}
              angle={angle}
              textAnchor={angle ? 'end' : 'middle'}
            />
            <YAxis
              tickCount={tickCount}
              axisLine={false}
              tickLine={false}
              domain={domain}
              interval={0}
              tickFormatter={(value: number) => value.toLocaleString()}
            />
            {isTooltip && <Tooltip content={toolTip} />}
            {isLegend && (
              <Legend
                iconType="circle"
                iconSize={12}
                formatter={formatter}
                wrapperStyle={{ paddingTop: angle ? '5rem' : '2rem' }}
              />
            )}
            {type === 'diff' && diffSet ? (
              <>
                <Bar
                  name={diffSet[0].name}
                  dataKey={diffSet[0].dataKey}
                  fill={diffSet[0].fill}
                />
                <Bar
                  name={diffSet[1].name}
                  dataKey={diffSet[1].dataKey}
                  fill={diffSet[1].fill}
                />
              </>
            ) : (
              <Bar dataKey={chartDataName[1]} fill={fill}>
                {isLabelList && (
                  <LabelList
                    dataKey={yKey ?? chartDataName[1]}
                    position="top"
                    formatter={LabelListFormatter}
                  />
                )}
              </Bar>
            )}
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Skeleton height={height} baseColor="#fcfcfc" />
      )}
    </div>
  );
};
