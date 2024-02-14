import React, { useEffect } from "react";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import styled from "@emotion/styled";
import { fetchMonitoringStoreProductList } from "ApiFarm/aistt";
import { IFqsMonitoringVideoInfo } from "InterfaceFarm/ai-fqs";
import MonitoringMakeHistory from "./MonitoringMakeHistory";
import FqsVideo from "../common/FqsVideo";
import { breakpoints, mqMaxWidth } from "@ComponentFarm/common";
import useWifiPopup from "HookFarm/useWifiPopup";
import VideoPlayConfirm from "../common/VideoPlayConfirm";

const MonitoringVideoViewStyle = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  position: relative;

  .video-wrap {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1024px;
    justify-content: center;
    align-items: stretch;
  }

  .product-wrap {
    margin-right: 37.6rem;

    .product-list {
      top: 0;
      overflow: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;
      position: absolute;
      max-height: 100%;
      width: 36.6rem;
      margin-left: 1.6rem;
      border-radius: 0.4rem;
      padding-top: 1px;
    }

    .product-list > .title {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    .count {
      font-weight: 600;
      color: var(--color-gray9);

      .number {
        padding-left: 1rem;
        color: var(--color-orange60);
      }
    }
  }

  ${mqMaxWidth(breakpoints[1])} {
    flex-direction: column;
    .video-wrap {
      max-width: 100%;
      margin-right: 0;
      padding-top: 1.6rem;
    }

    .video-wrap .title {
      display: none;
    }

    .product-wrap {
      margin-right: 0;
      width: 100%;
      max-width: 100%;
      padding-top: 6.4rem;
      position: static;
      padding-bottom: 1.6rem;
      .product-list {
        position: static;
        width: 100%;
        margin-left: 0;
        padding-top: 0;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        overflow: visible;
      }
    }
  }
`;

interface MonitoringVideoViewProps {
  activeDate: string;
  videoInfo: IFqsMonitoringVideoInfo;
}

const MonitoringVideoView = ({
  activeDate,
  videoInfo,
}: MonitoringVideoViewProps) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const [isConfirmed, setIsConfirmed] = useWifiPopup();

  const makingTime = React.useMemo(
    () => router.query.d as string,
    [router.query]
  );

  const { data, isLoading } = useQuery(
    [
      "aistt-monitoring-time-products",
      activeDate,
      videoInfo.store_stt_cctv_idx,
    ],
    () =>
      fetchMonitoringStoreProductList({
        record_date: activeDate,
        store_stt_cctv_idx: videoInfo.store_stt_cctv_idx,
      }),
    {
      keepPreviousData: true,
    }
  );

  // 비디오 및 OCR 로드 완료 시 시간 설정
  useEffect(() => {
    if (isLoading || !makingTime || !isConfirmed) return;

    const dt = dayjs(makingTime);

    const { video_play_seconds } = data?.list.find((item) =>
      dt.isSame(item.manufacture_dt)
    ) ?? {
      video_play_seconds: 0,
    };

    if (dt.isValid() && videoRef.current && video_play_seconds) {
      videoRef.current.currentTime = video_play_seconds;
    }
  }, [videoRef, makingTime, isLoading, isConfirmed]);

  return (
    <MonitoringVideoViewStyle>
      <div className="video-wrap">
        <h2 className="title">모니터링 영상</h2>
        {isConfirmed ? (
          <>
            <FqsVideo
              ref={videoRef}
              src={videoInfo.cctv_video_url}
              crossOrigin="anonymous"
              sticky
            />
          </>
        ) : (
          <VideoPlayConfirm onPlay={() => setIsConfirmed(true)} />
        )}
      </div>
      <div className="product-wrap">
        <div className="product-list">
          <h2 className="title">
            제조 피자 타임라인
            <span className="count">
              총 제조 수<span className="number">{data?.total_count}</span>
            </span>
          </h2>
          {data?.list.map((item) => (
            <MonitoringMakeHistory
              key={item.inspection_info_idx}
              data={item}
              active={item.manufacture_dt === makingTime}
              onClickAnalysis={() => {
                router.push(
                  `/aistt-monitoring/analysis/${item.inspection_info_idx}`
                );
              }}
              onClickItem={(clickItem) => {
                router.replace(
                  {
                    pathname: router.pathname,
                    query: {
                      ...router.query,
                      d: clickItem.manufacture_dt,
                    },
                  },
                  undefined,
                  {
                    scroll: false,
                    shallow: true,
                  }
                );
              }}
            />
          ))}
        </div>
      </div>
    </MonitoringVideoViewStyle>
  );
};

export default MonitoringVideoView;
