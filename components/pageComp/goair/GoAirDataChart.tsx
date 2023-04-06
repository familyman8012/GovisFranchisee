import React, { useMemo } from "react";
import { ResponsiveContainer, ComposedChart, XAxis, Line, Area, Tooltip, Legend } from "recharts";
import { useQuery } from "react-query";
import dayjs from "dayjs";

import style from "StyleFarm/scss/modules/Goair.module.scss";
import { PALLETES } from "LibFarm/color";

import * as GoAirService from "ApiFarm/goair";

import useInterval from "HookFarm/useInterval";

import { SENSOR_TYPE_OPTIONS } from "./constants";
import { ThumbnailLoading } from "ComponentsFarm/elements/Loading";
import { EmptyView } from "ComponentsFarm/elements/EmptyView";

interface GoAirDataChartProps {
  sectionId: number;
  moduleId: number;
  moduleName: string;
  sensorType: number;
}

interface ITooltipItem {
  payload: { search_label?: string };
  dataKey: "min" | "max" | "data_value";
  color: string;
  value: number;
}

const CustomTooltip = ({ active, payload, sensorType }: any) => {
  const type = SENSOR_TYPE_OPTIONS.find(({ value }) => value === sensorType);
  const FIELD_KEYS = {
    min: "이상 기준 최소",
    max: "이상 기준 최대",
    data_value: "현재",
  };

  return (
    active && (
      <ul className={`chart-wrapper-bar__tooltip gv-typo-body-2`}>
        {payload?.map((item: ITooltipItem, i: number) => (
          <li style={{ color: item.color }} key={i}>
            {i === 0 ? (
              <p className={`text-typo-1 weight-bold w-100 d-flex justify-content-between`}>
                {item.payload?.search_label}
                <span className="ps-2 text-typo-3 weight-bold">{`단위: (${type?.unit})`}</span>
              </p>
            ) : (
              ""
            )}
            <p
              className={`${i !== 0 ? "mt-1" : ""} mb-0 weight-bold w-100 d-flex justify-content-between`}
              style={{ color: item?.color }}
            >
              {`${FIELD_KEYS[item["dataKey"]]}: ${item?.value}`}
            </p>
          </li>
        ))}
      </ul>
    )
  );
};

export const GoAirSensorDataChart = ({ sectionId, moduleId, moduleName, sensorType }: GoAirDataChartProps) => {
  const updateDt = React.useRef<string>("");

  const type = useMemo(() => SENSOR_TYPE_OPTIONS.find((t) => t.value === sensorType), [sensorType]);

  const { data, isLoading, isError, refetch } = useQuery(
    ["goair-sensors-data", sectionId, moduleId, sensorType],
    ({ queryKey }) => getMergedSensorData(queryKey[1] as number, queryKey[2] as number, queryKey[3] as number)
  );

  const getMergedSensorData: Function = React.useCallback(
    (sectionId: number, moduleId: number, sensorType: number): Promise<{}> => {
      const now = dayjs();
      const restMinites = now.minute() % 10;
      const nowPrevTenMinute = dayjs().add(-restMinites, "minutes");
      const nowPrevOneDay = dayjs().add(-1, "days").add(-restMinites, "minutes");
      const FORMAT = "YYYY-MM-DD HH:mm";

      return Promise.all([
        GoAirService.fetchSensorData({
          goair_area_info_idx: sectionId,
          goair_module_info_idx: moduleId,
          sensor_type: sensorType,
          search_dt_end: now.format(FORMAT),
          search_dt_start: nowPrevTenMinute.format(FORMAT),
          tic: 1,
        }),
        GoAirService.fetchSensorData({
          goair_area_info_idx: sectionId,
          goair_module_info_idx: moduleId,
          sensor_type: sensorType,
          search_dt_end: nowPrevTenMinute.format(FORMAT),
          search_dt_start: nowPrevOneDay.format(FORMAT),
          tic: 10,
        }),
      ]).then((datas) => {
        // 최근 업데이트 시간 같으면 데이터 반영안함
        if (data && updateDt.current === datas[1].payload_updated_dt) {
          return data;
        }

        updateDt.current = datas[1].payload_updated_dt;

        let min = 9999,
          max = 0;

        const list = datas
          .map((response, i) => {
            min = Math.min(min, parseInt(response.range.data_min));
            max = Math.max(max, parseInt(response.range.data_max));
            return i === 0 ? response.list.slice(response.list.length - 1) : response.list.reverse();
          })
          .reduce((list, dataList) => list.concat(dataList), [])
          .map((data, i, origins) => ({
            ...data,
            label:
              i === 0
                ? "now"
                : Math.floor(origins.length / 2) === i
                ? "-12hr"
                : i === origins.length - 1
                ? "-24hrs"
                : null,

            min,
            max,
          }))
          .reverse();

        return {
          list,
          min,
          max,
        } as any;
      });
    },
    [data]
  );

  useInterval(
    () =>
      refetch({
        throwOnError: true,
      }),
    10000,
    isError
  );

  const $tooltip = React.useCallback(
    (props: any) => <CustomTooltip {...props} sensorType={sensorType} />,
    [sensorType]
  );

  if (isLoading || isError) {
    return (
      <div className={style["goair-data-chart"]}>
        <h4 className="gv-typo-body-1 weight-500"> </h4>
        <div className={style["goair-data-chart__wrapper"]}>
          {isError ? <EmptyView full>데이터를 조회할 수 없습니다.</EmptyView> : <ThumbnailLoading full />}
        </div>
      </div>
    );
  }

  return (
    <div className={style["goair-data-chart"]}>
      <h4 className="gv-typo-body-1 weight-500">
        {moduleName} {type?.label}
      </h4>
      <div className={style["goair-data-chart__wrapper"]}>
        <ResponsiveContainer width="100%" height="100%" className={style["goair-data-chart__view"]}>
          <ComposedChart
            data={data?.list ?? []}
            margin={{
              top: 30,
              right: 20,
              left: 20,
              bottom: 25,
            }}
          >
            <Tooltip content={$tooltip} />
            <XAxis dataKey="label" tickMargin={10} axisLine={false} tickLine={false} interval={0} />

            <Legend
              iconType="plainline"
              iconSize={10}
              wrapperStyle={{ transform: "translateY(13px)" }}
              payload={[
                {
                  id: "ID1",
                  type: "plainline",
                  value: "관측수치",
                  color: PALLETES["p-orange-1"],
                  payload: {
                    strokeDasharray: "",
                  },
                },
                {
                  id: "ID2",
                  type: "plainline",
                  value: "기준선",
                  color: PALLETES["error-1"],
                  payload: {
                    strokeDasharray: "",
                  },
                },
              ]}
              formatter={(value) => <span className="recharts-legend-label">{value}</span>}
            />

            <Line
              dataKey="min"
              stroke={PALLETES["error-1"]}
              activeDot={{ r: 4, strokeWidth: 0 }}
              dot={false}
              isAnimationActive={false}
              strokeWidth={1}
              connectNulls={true}
            />
            <Line
              dataKey="max"
              stroke={PALLETES["error-1"]}
              activeDot={{ r: 4, strokeWidth: 0 }}
              dot={false}
              isAnimationActive={false}
              strokeWidth={1}
              connectNulls={true}
            />

            <Area
              type="monotone"
              dataKey="data_value"
              stroke={PALLETES["p-orange-1"]}
              fill={"transparent"}
              activeDot={{
                r: 4,
                stroke: PALLETES["p-orange-1"],
                fill: PALLETES["white"],
                strokeWidth: 2.5,
              }}
              strokeWidth={3}
              animationDuration={1000}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
