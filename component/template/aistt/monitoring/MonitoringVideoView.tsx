import React, { useEffect } from "react";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import styled from "@emotion/styled";
import { fetchMonitoringStoreProductList } from "ApiFarm/aistt";
import { IFqsMonitoringVideoInfo } from "InterfaceFarm/ai-fqs";
import type { VideoTimeDiff } from "@ComponentFarm/template/aistt/common/VideoTimeDiffCalculator";
import MonitoringMakeHistory from "./MonitoringMakeHistory";
import FqsVideo from "../common/FqsVideo";
import { breakpoints, mqMaxWidth } from "@ComponentFarm/common";
import { vi } from "date-fns/locale";
import useWifiPopup from "HookFarm/useWifiPopup";
import VideoPlayConfirm from "../common/VideoPlayConfirm";

const VideoTimeDiffCalculator = dynamic(
  () => import("@ComponentFarm/template/aistt/common/VideoTimeDiffCalculator"),
  {
    ssr: false,
  }
);

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

  const [isVideoLoaded, setIsVideoLoaded] = React.useState<boolean>(false);
  const [timeDiffList, setTimeDiffList] = React.useState<VideoTimeDiff[]>([]);

  const makingTime = React.useMemo(
    () => router.query.d as string,
    [router.query]
  );

  const { data } = useQuery(
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

  const setVideoRealTime = (time: number) => {
    const video = videoRef.current;
    if (!video || timeDiffList.length === 0) return;

    // 가장 가까운 작은 값과 가장 가까운 큰 값 변수
    let closestSmaller: VideoTimeDiff | undefined;
    let closestLarger: VideoTimeDiff | undefined;

    timeDiffList.forEach((entry) => {
      if (
        entry.videoTime <= time &&
        (!closestSmaller || entry.videoTime > closestSmaller.videoTime)
      ) {
        closestSmaller = entry;
      }

      if (
        entry.videoTime >= time &&
        (!closestLarger || entry.videoTime < closestLarger.videoTime)
      ) {
        closestLarger = entry;
      }
    });

    if (!closestSmaller || !closestLarger) {
      video.currentTime = time;
      return;
    }

    // closestSmaller.videoTime 값들 사이의 차이의 백분율을 계산합니다.
    const percentageDifference =
      (time - closestSmaller.videoTime) /
      (closestSmaller === closestLarger
        ? 1
        : closestLarger.videoTime - closestSmaller.videoTime);

    video.currentTime =
      closestSmaller.time +
      (closestLarger.time - closestSmaller.time) * percentageDifference;
  };

  // 비디오 및 OCR 로드 완료 시 시간 설정
  useEffect(() => {
    if (!isVideoLoaded || !makingTime) return;

    const baseTime = dayjs(videoInfo.record_dt)
      .set("second", 0)
      .set("minute", 0);
    const endTime = dayjs(videoInfo.record_finish_dt);
    const dt = dayjs(makingTime);

    const inTime = baseTime.unix() <= dt.unix() && endTime.unix() >= dt.unix();

    if (!inTime) return;

    if (dt.isValid()) setVideoRealTime(Math.abs(dt.diff(baseTime, "second")));
  }, [videoRef, makingTime, isVideoLoaded]);

  // 비디오 변경 시 로드 완료 상태 변경
  useEffect(() => {
    if (!videoInfo.cctv_video_url) return;
    setIsVideoLoaded(false);
  }, [videoInfo.cctv_video_url]);

  return (
    <MonitoringVideoViewStyle>
      <div className="video-wrap">
        <h2 className="title">모니터링 영상</h2>
        {isConfirmed ? (
          <>
            <FqsVideo
              ref={videoRef}
              loading={!isVideoLoaded}
              src={videoInfo.cctv_video_url}
              crossOrigin="anonymous"
              sticky
            />
            <VideoTimeDiffCalculator
              videoSrc={videoInfo.cctv_video_url}
              frameCount={2}
              onLoaded={(diffList) => {
                setIsVideoLoaded(true);
                setTimeDiffList(diffList);
              }}
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
