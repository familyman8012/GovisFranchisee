import React from 'react';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import FqsVideo from '@ComponentFarm/template/aistt/common/FqsVideo';
import type { VideoTimeDiff } from '@ComponentFarm/template/aistt/common/VideoTimeDiffCalculator';

const VideoTimeDiffCalculator = dynamic(
  () => import('@ComponentFarm/template/aistt/common/VideoTimeDiffCalculator'),
  {
    ssr: false,
  }
);

const src =
  'https://dev-govis-ai.s3.ap-northeast-2.amazonaws.com/cctv/2024/01/02/cctv_11_20240102120000_20240102130000_dev.mp4';

const MonitoringPageWrap = styled.div`
  button {
    background-color: transparent;
    appearance: none;
    padding: 1rem;
    border: 1px solid currentColor;
    border-radius: 0.5rem;
  }

  ul {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
    max-width: 1024px;
    margin: 1rem auto;
    flex-wrap: wrap;
  }
`;

const AisttMonitoringPage = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = React.useState<number>(0);
  const [ocrLoading, setOcrLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<VideoTimeDiff[]>([]);

  React.useLayoutEffect(() => {
    videoRef.current?.addEventListener('loadedmetadata', () => {
      setDuration(videoRef.current?.duration ?? 0);
    });
  }, [videoRef.current, src, data, ocrLoading]);

  const videoTimes = React.useMemo(() => {
    const cnt = 20;
    const cycle = (duration ?? 0) / cnt;
    const result = [];
    if (!duration) return [];
    for (let i = 0; i < cnt; i += 1) {
      const time = cycle * i;
      result.push(time);
    }

    return result;
  }, [data, duration]);

  const setVideoRealTime = (time: number) => {
    const video = videoRef.current;
    if (!video || data.length === 0) return;

    // 가장 가까운 작은 값과 가장 가까운 큰 값 변수
    let closestSmaller: VideoTimeDiff | undefined;
    let closestLarger: VideoTimeDiff | undefined;

    data.forEach(entry => {
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

  return (
    <MonitoringPageWrap>
      <h1>Aistt Monitoring</h1>
      {JSON.stringify(data)}
      <VideoTimeDiffCalculator
        videoSrc={src}
        debug
        onLoaded={loadData => {
          setData(loadData);
          setOcrLoading(false);
        }}
      />
      <FqsVideo
        ref={videoRef}
        loading={ocrLoading}
        src={src}
        crossOrigin="anonymous"
      />
      <ul>
        {videoTimes.map(time => (
          <li key={time}>
            <button
              type="button"
              onClick={() => {
                setVideoRealTime(time);
              }}
            >
              {`${Math.floor(time / 60)}분${Math.round(time % 60)}초`}
            </button>
          </li>
        ))}
      </ul>
    </MonitoringPageWrap>
  );
};

export default AisttMonitoringPage;
