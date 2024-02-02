import React from "react";
import useReponsive from "HookFarm/useResponsive";
import styled from "@emotion/styled";
import { useQuery } from "react-query";
import {
  fetchMonitoringStoreRecordList,
  fetchMonitoringStoreVideoList,
} from "ApiFarm/aistt";
import { IFqsMonitoringVideoInfo } from "InterfaceFarm/ai-fqs";
import MonitoringDayRecord from "./MonitoringDayRecord";
import MonitoringVideoRecord from "./MonitoringVideoRecord";
import { Select } from "@ComponentFarm/atom/Select/Select";
import dayjs from "dayjs";

const MonitoringTimeFilterStyle = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  .select-wrap {
    display: flex;
    flex-direction: row;
    gap: 1.2rem;

    > * {
      width: 100%;
    }
  }
`;

interface Props {
  activeDate: string;
  activeVideo?: IFqsMonitoringVideoInfo | null;
  onChangeDate: (date: string) => void;
  onChangeVideo: (videoInfo: IFqsMonitoringVideoInfo) => void;
}

const MonitoringTimeFilter = ({
  activeDate,
  activeVideo,
  onChangeDate,
  onChangeVideo,
}: Props) => {
  const { data } = useQuery(["aistt-monitoring-record"], () =>
    fetchMonitoringStoreRecordList()
  );

  const { data: storeVideoData } = useQuery(
    ["aistt-monitoring-video", activeDate],
    () =>
      fetchMonitoringStoreVideoList({
        record_date: activeDate,
      }),
    {
      enabled: !!activeDate,
    }
  );

  const { isMobile } = useReponsive();

  if (isMobile) {
    return (
      <MonitoringTimeFilterStyle>
        <h2 className="title">일자 선택</h2>
        <div className="select-wrap">
          <Select
            placeholder="일자 선택"
            selectedOption={activeDate}
            isSearchable={false}
            options={
              data?.list.map((date) => ({
                label: date.record_date,
                value: date.record_date,
              })) ?? []
            }
            setSelectedOption={(option) => onChangeDate(option.value)}
          />
          <Select
            placeholder="시간 선택"
            selectedOption={activeVideo?.store_stt_cctv_idx}
            options={
              storeVideoData?.list.map((video) => ({
                label: `${dayjs(video.record_dt).format("HH:mm")} ~ ${dayjs(
                  video.record_finish_dt
                ).format("HH:mm")}`,
                value: video.store_stt_cctv_idx,
              })) ?? []
            }
            isSearchable={false}
            setSelectedOption={(option) =>
              onChangeVideo(
                storeVideoData?.list.find(
                  (video) => video.store_stt_cctv_idx === option.value
                ) as IFqsMonitoringVideoInfo
              )
            }
          />
        </div>
      </MonitoringTimeFilterStyle>
    );
  }

  return (
    <MonitoringTimeFilterStyle>
      <h2 className="title">일자 선택</h2>
      <div className="list">
        {data?.list.map((record) => (
          <MonitoringDayRecord
            key={record.record_date}
            recordDate={record.record_date}
            active={activeDate === record.record_date}
            onClickItem={(date) => onChangeDate(date)}
          >
            {storeVideoData?.list.map((video) => (
              <MonitoringVideoRecord
                key={video.store_stt_cctv_idx}
                active={
                  activeVideo?.store_stt_cctv_idx === video.store_stt_cctv_idx
                }
                videoInfo={video}
                onClickItem={(videoInfo) => onChangeVideo(videoInfo)}
              />
            ))}
          </MonitoringDayRecord>
        ))}
      </div>
    </MonitoringTimeFilterStyle>
  );
};

export default MonitoringTimeFilter;
