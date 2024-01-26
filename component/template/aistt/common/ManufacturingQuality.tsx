/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { IoAlertCircleOutline } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { IManufacturingQualityItem } from "InterfaceFarm/aistt";
import { TextBadge, TextBadgeColor } from "@ComponentFarm/atom/Badge/TextBadge";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import DonutChart from "@ComponentFarm/chart/DonutChart2";
import { QueryParams } from "HookFarm/useQueryParams";
import { Badge } from "@ComponentFarm/atom/Badge/Badge";
import {
  List,
  ManufacturingQualityListWrap,
  ManufacturingQualityWrap,
  SkeletonWrap,
} from "./style";

const textBadgeLabel: {
  [key: number]: { text: string; color: TextBadgeColor };
} = {
  1: { text: "100 ~ 80", color: "blue" },
  2: { text: "80 ~ 50", color: "yellow" },
  3: { text: "50 ~ 0", color: "orange" },
};

export const ManufacturingQuality = ({
  selectScoreRange,
  data,
}: {
  selectScoreRange: string;
  data: IManufacturingQualityItem;
}) => {
  const chartArray = [
    {
      title: "제조수",
      color: "var(--color-green30)",
      progress: data.manufacturing_count_per,
    },
  ];

  return (
    <ManufacturingQualityWrap
      className={
        selectScoreRange === String(data.score_range)
          ? `manufacturing on_${data.score_range}`
          : "manufacturing"
      }
    >
      <div className="status_head">
        <span className="title">점수대별 현황</span>
        <Badge dot color={textBadgeLabel[data.score_range].color} size="sm">
          {textBadgeLabel[data.score_range].text}
        </Badge>
      </div>
      <div className="status_content">
        <div className="info">
          <dl>
            <dt>제조 수</dt>
            <dd>
              <span className="txt1">
                {data.manufacturing_count.toLocaleString()}
              </span>
              <span className="txt2">개</span>
            </dd>
          </dl>
          <dl>
            <dt>제조 비율</dt>
            <dd>
              {chartArray.map((el) => (
                <span className="txt_progress" key={el.title}>
                  <span className="txt1">{el.progress.toFixed(1)}</span>
                  <span className="txt2">%</span>
                </span>
              ))}
            </dd>
          </dl>
        </div>
      </div>
    </ManufacturingQualityWrap>
  );
};

export const ManufacturingQualityList = ({
  type,
  params,
  updateParams,
  data,
}: {
  type?: string;
  params?: QueryParams;
  updateParams?: (newParams: QueryParams) => void;
  data?: IManufacturingQualityItem[];
}) => {
  const router = useRouter();
  const [selectScoreRange, setselectScoreRange] = useState("");

  useEffect(() => {
    if (data) {
      setselectScoreRange(String(params?.score_range));
    }
  }, [data]);

  const chartDataArr = useMemo(
    () => [
      { item_label: "100점~80점", fill: "#5e5adb", fill2: "#c7d7fe" },
      { item_label: "80점~50점", fill: "#14804a", fill2: "#abefc6" },
      { item_label: "50점~0점", fill: "#d1293d", fill2: "#fecdca" },
    ],
    []
  );

  const chartData = useMemo(
    () =>
      data?.map((el, i) => {
        return {
          ...chartDataArr[i],
          base_sales_count: el.manufacturing_count,
          manufacturing_count_per: el.manufacturing_count_per,
        };
      }),
    [chartDataArr, data]
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (params?.score_range) {
      setActiveIndex(Number(params.score_range) - 1);
    }
  }, []);

  const handlerScoreRange = (item: any) => {
    if (type === "state") {
      router.push({
        pathname: "/aistt-state/quality",
        query: { ...router.query, score_range: item.score_range },
      });
    }
    if (type !== "state" && updateParams) {
      if (selectScoreRange === String(item.score_range)) {
        setselectScoreRange("");
        updateParams({ score_range: undefined });
      } else {
        setselectScoreRange(String(item.score_range));
        updateParams({ score_range: item.score_range });
      }
    }
  };

  return (
    <>
      {data ? (
        <ManufacturingQualityListWrap>
          {data?.every((el) => el.manufacturing_count === 0) ? (
            <Empty Icon={<IoAlertCircleOutline size={42} />}>
              조회된 조건의 제조 피자가 없습니다.
            </Empty>
          ) : (
            <DonutChart
              height="50rem"
              chartData={chartData}
              activeIndex={activeIndex}
            />
          )}
          <List>
            {data?.map((item, i: number) => (
              // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
              <div
                key={i}
                className="items"
                onMouseOver={() => {
                  setselectScoreRange("");
                  setActiveIndex(i);
                }}
                onMouseLeave={() => {
                  setselectScoreRange(String(params?.score_range));
                  setActiveIndex(Number(params?.score_range) - 1);
                }}
                onClick={() => handlerScoreRange(item)}
              >
                <ManufacturingQuality
                  data={item}
                  selectScoreRange={selectScoreRange}
                />
              </div>
            ))}
          </List>
        </ManufacturingQualityListWrap>
      ) : (
        <SkeletonWrap>
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} baseColor="#fcfcfc" />
          ))}
        </SkeletonWrap>
      )}
    </>
  );
};
