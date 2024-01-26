/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import styled from '@emotion/styled';
import { AreaBox } from '@ComponentFarm/template/common/AreaBox';

const data = [
  { name: '00시', value: 5000 },
  { name: '01시', value: 5000 },
  { name: '02시', value: 5000 },
  { name: '03시', value: 5000 },
  { name: '04시', value: 5000 },
  { name: '05시', value: 5000 },
  { name: '06시', value: 5000 },
  { name: '07시', value: 5000 },
  { name: '08시', value: 5000 },
  { name: '09시', value: 5000 },
  { name: '10시', value: 5000 },
  { name: '11시', value: 5000 },
  { name: '12시', value: 5000 },
  { name: '13시', value: 5000 },
  { name: '14시', value: 5000 },
  { name: '15시', value: 5000 },
  { name: '16시', value: 5000 },
  { name: '17시', value: 5000 },
  { name: '18시', value: 5000 },
  { name: '19시', value: 5000 },
  { name: '20시', value: 5000 },
  { name: '21시', value: 5000 },
  { name: '22시', value: 5000 },
  { name: '23시', value: 5000 },
];

const OverHeadTooltip = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;
  position: relative;
  padding: 1.6rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.4rem;
  background: #fff;
  box-shadow: 0px 2.55556px 5.11111px 0px rgba(0, 0, 0, 0.04);
  .btn_close {
    position: absolute;
    bottom: -13px;
    left: 50%;
    transform: translateX(-50%);
  }

  dl {
    dt {
      margin-bottom: 0.6rem;
      color: var(--gray400);
      font-size: 1.2rem;
      font-weight: 400;
      line-height: 120%;
    }
    dd {
      span {
        &:nth-of-type(1) {
          margin-right: 0.4rem;
          color: #242424;
          font-family: 'Inter';
          font-size: 2rem;
          font-weight: 500;
        }
        &:nth-of-type(2) {
          svg {
            margin-right: 0.2rem;
          }
          color: var(--color-green300);
          text-align: center;
          font-family: 'Inter';
          font-size: 1.5rem;
          font-weight: 500;
        }
      }
    }
  }
`;

const BarHorizonChartWrap = styled.div`
  .recharts-bar-rectangle {
    cursor: pointer;
  }
`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active) {
    return (
      <OverHeadTooltip>
        <dl>
          <dt>기준일 제조 수</dt>
          <dd>
            <span>879</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.00011 3.98425C6.25311 3.98425 6.49511 4.10075 6.66311 4.30525L8.76961 6.85425C9.02161 7.15975 9.07161 7.59325 8.89911 7.95975C8.74661 8.28325 8.44311 8.48425 8.10661 8.48425L3.89361 8.48425C3.55711 8.48425 3.25361 8.28325 3.10111 7.95975C2.92811 7.59325 2.97861 7.15975 3.23011 6.85475L5.33711 4.30525C5.50511 4.10075 5.74711 3.98425 6.00011 3.98425Z"
                  fill="#14804A"
                />
              </svg>
              3.4%
            </span>
          </dd>
        </dl>
        <dl>
          <dt>비교일 제조 수</dt>
          <dd>
            <span>653</span>
          </dd>
        </dl>
        <dl>
          <dt>증감율</dt>
          <dd>
            <span>226</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.00011 3.98425C6.25311 3.98425 6.49511 4.10075 6.66311 4.30525L8.76961 6.85425C9.02161 7.15975 9.07161 7.59325 8.89911 7.95975C8.74661 8.28325 8.44311 8.48425 8.10661 8.48425L3.89361 8.48425C3.55711 8.48425 3.25361 8.28325 3.10111 7.95975C2.92811 7.59325 2.97861 7.15975 3.23011 6.85475L5.33711 4.30525C5.50511 4.10075 5.74711 3.98425 6.00011 3.98425Z"
                  fill="#14804A"
                />
              </svg>
              12%
            </span>
          </dd>
        </dl>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="13"
          viewBox="0 0 14 13"
          fill="none"
          className="btn_close"
        >
          <path
            d="M13.0622 0.984253L7 11.4843L0.937823 0.984252L13.0622 0.984253Z"
            fill="white"
            stroke="#E5E5E5"
          />
        </svg>
      </OverHeadTooltip>
    );
  }

  return null;
};

interface PositionState {
  data?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  show: boolean;
}

export const BarHorizonChart2 = () => {
  const [position, setPosition] = useState<PositionState | null>(null);

  useEffect(() => {
    const tooltip = document.querySelector(
      '#barHorizon .recharts-tooltip-wrapper'
    );
    if (!tooltip) return;
    // Init tooltip values
    const tooltipHeight = tooltip.getBoundingClientRect().height;
    const tooltipWidth = tooltip.getBoundingClientRect().width;
    const spaceForLittleTriangle = 10;

    // Rewrite tooltip styles
    (tooltip as any).style = `
      transform: translate(${Number(position?.data?.x)}px, ${
        Number(position?.data?.y) - 10
      }px);
      pointer-events: none;  position: absolute;
      top: -${tooltipHeight + spaceForLittleTriangle}px;
      left: -${tooltipWidth / 2 - Number(position?.data?.width) / 2}px;
      opacity: ${position?.show ? '1' : 0};
      transition: all 400ms ease 0s;

    `;
  }, [position]);

  return (
    <BarHorizonChartWrap id="barHorizon">
      <ResponsiveContainer width="100%" aspect={2}>
        <BarChart width={500} height={300} data={data} barSize={8}>
          <CartesianGrid strokeDasharray="3 0" vertical={false} />
          <XAxis
            dataKey="name"
            interval={0}
            axisLine={false}
            tickLine={false}
          />
          <YAxis tickCount={11} axisLine={false} tickLine={false} />

          <Tooltip
            cursor={false}
            position={{
              x: position?.data?.x ?? 0,
              y: position?.data?.y ?? 0,
            }}
            content={<CustomTooltip />}
          />

          {/* <Legend /> */}
          <Bar
            dataKey="value"
            fill="var(--color-orange90)"
            onMouseMove={(data: any) => setPosition({ data, show: true })}
            onMouseLeave={(data: any) => setPosition({ data, show: true })}
          />
        </BarChart>
      </ResponsiveContainer>
    </BarHorizonChartWrap>
  );
};

interface BarHorizonChartCardProps {
  title: string;
  txt1?: string;
  txt2?: string;
  moreLink?: string;
  className?: string;
}

export const BarHorizonChartCard = ({
  title,
  moreLink,
  txt1,
  txt2,
  className,
}: BarHorizonChartCardProps) => {
  return (
    <AreaBox
      className={className}
      title={title}
      moreLink={moreLink}
      txt1={txt1}
      txt2={txt2}
    >
      <BarHorizonChart2 />
    </AreaBox>
  );
};
