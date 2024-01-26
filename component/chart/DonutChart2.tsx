import { DonutArea } from "@ComponentFarm/template/aistt/common/style";
import React, { useEffect, useRef, useState } from "react";

import Skeleton from "react-loading-skeleton";
import { ResponsiveContainer, PieChart, Pie, Sector } from "recharts";

const DonutChart = ({
  chartData,
  height,
  activeIndex,
}: {
  chartData: any;
  height: string;
  activeIndex: number | null;
}) => {
  const containerRef = useRef<any>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // 컨테이너 크기 업데이트 함수
  const updateContainerSize = () => {
    if (containerRef.current) {
      // eslint-disable-next-line no-shadow
      const { width, height } = containerRef.current.getBoundingClientRect();
      setContainerSize({ width, height });
    }
  };

  useEffect(() => {
    // 첫 마운트에서 컨테이너 크기를 설정
    updateContainerSize();
  }, []);

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      fill2,
      payload,
      percent,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx;
    // const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    // const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    // const x = cx + radius * Math.cos(-midAngle * RADIAN);
    // const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // 추가된 배경색 사각형을 위한 계산
    const textHeight = 20; // 텍스트 높이 추정값

    // 초기 차트 너비 설정
    const initialWidth = 600; // 초기 차트 너비를 적절한 값으로 설정하세요
    const initialHeight = 500; // 초기 차트 높이

    const scaleX = containerSize.width / initialWidth;
    const scaleY = containerSize.height / initialHeight;

    interface Idynamic {
      [key: string]: number;
    }

    // 동적으로 조정된 너비와 위치 계산
    const dynamicWidth: Idynamic = {
      "100점~80점": 81 * scaleX,
      "80점~50점": 76 * scaleX,
      "50점~0점": 66 * scaleX, // '50점 미만'과 같은 다른 레이블에 대한 처리
    };

    const dynamicX: Idynamic = {
      "100점~80점": ex + (cos >= 0 ? 1 : -8.4) * (11 * scaleX),
      "80점~50점": ex + (cos >= 0 ? 1 : -1 * 7.8) * (11 * scaleX),
      "50점~0점": ex + (cos >= 0 ? 1 : -7) * (11 * scaleX),
    };

    // 활성화된 Sector의 중심 좌표 계산
    const activeInnerRadius =
      activeIndex === props.index ? innerRadius - 10 * 1.2 : innerRadius - 10;
    const activeOuterRadius =
      activeIndex === props.index ? outerRadius + 35 * 1.2 : outerRadius + 10;
    const activeRadius =
      activeInnerRadius + (activeOuterRadius - activeInnerRadius) * 0.5;
    const activeX = cx + activeRadius * Math.cos(-midAngle * RADIAN);
    const activeY = cy + activeRadius * Math.sin(-midAngle * RADIAN);

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={
            activeIndex === props.index ? outerRadius * 1.2 : outerRadius
          }
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill2}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={
            activeIndex === props.index
              ? outerRadius + 31 * 1.2
              : outerRadius + 6
          }
          outerRadius={
            activeIndex === props.index
              ? outerRadius + 35 * 1.2
              : outerRadius + 10
          }
          fill={fill}
        />
        {props.percent !== 0 && (
          <>
            <path
              d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
              stroke={fill}
              fill="none"
            />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />

            <text
              x={ex + (cos >= 0 ? 1 : -1) * (15 * scaleX)}
              y={ey + 4 * scaleX}
              textAnchor={textAnchor}
              fill={fill}
              className="donut-text"
            >{`${props.item_label}`}</text>
            <text
              x={activeX}
              y={activeIndex === props.index ? activeY - 5 : activeY}
              fill={fill} // 텍스트 색상을 흰색으로 변경
              textAnchor="middle" // 텍스트를 가운데 정렬
              dominantBaseline="central"
              className="donut-text text2"
            >
              {`${(percent * 100).toFixed(0)}%`}
            </text>
            {activeIndex === props.index && (
              <text
                x={activeX}
                y={activeY + 12}
                fill={fill} // 텍스트 색상을 흰색으로 변경
                textAnchor="middle" // 텍스트를 가운데 정렬
                dominantBaseline="central"
                className="donut-text text2"
              >
                ({props.value}개)
              </text>
            )}
          </>
        )}
      </g>
    );
  };

  return (
    <DonutArea ref={containerRef}>
      {chartData ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart
            margin={{
              top: 20,
              bottom: 20,
              left: 50,
              right: 50,
            }}
          >
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderActiveShape}
              innerRadius="50%"
              outerRadius="70%"
              fill="#8884d8"
              paddingAngle={5}
              dataKey="base_sales_count"
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <Skeleton height={height} baseColor="#fcfcfc" />
      )}
    </DonutArea>
  );
};

export default DonutChart;
