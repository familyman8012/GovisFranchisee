import React, { useEffect, useMemo } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import {
  fetchMonitoringStoreRecordList,
  fetchMonitoringStoreVideoList,
} from "ApiFarm/aistt";
import { IFqsMonitoringVideoInfo } from "InterfaceFarm/ai-fqs";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import MonitoringRecordItem from "@ComponentFarm/template/aistt/monitoring/MonitoringRecordItem";
import MonitoringVideoView from "@ComponentFarm/template/aistt/monitoring/MonitoringVideoView";
import { confirmModalStore } from "MobxFarm/store";
import Layout from "ComponentsFarm/layouts";
import {
  MonitoringListStyle,
  MonitoringPageStyle,
} from "@ComponentFarm/template/aistt/monitoring/style";
import { Tabs } from "@ComponentFarm/atom/Tab/Tab";

const MonitoringStoreVideos = () => {
  const router = useRouter();
  // video 탐색시 최초 한번되도록 하는 플래그
  const [initialVideoSearched, setInitialVideoSearched] = React.useState(false);

  const [activeDate, setActiveDate] = React.useState<string>("");
  const [activeVideo, setActiveVideo] =
    React.useState<IFqsMonitoringVideoInfo | null>(null);

  const makingTime = useMemo(
    () => dayjs((router.query.d ? router.query.d : "invalid Date") as string),
    [router.query]
  );

  const { data } = useQuery(["aistt-monitoring-record"], () =>
    fetchMonitoringStoreRecordList()
  );

  const { data: storeVideoData, isLoading } = useQuery(
    ["aistt-monitoring-video", activeDate],
    () =>
      fetchMonitoringStoreVideoList({
        record_date: activeDate,
      }),
    {
      enabled: !!activeDate,
    }
  );

  // 최초 로딩 시 activeDate 설정
  useEffect(() => {
    if (!router.isReady || !makingTime.isValid() || initialVideoSearched)
      return;

    setActiveDate(makingTime.format("YYYY-MM-DD"));
  }, [router.isReady]);

  // 최초 로딩 시 activeVideo 설정
  useEffect(() => {
    if (!storeVideoData || !router.isReady || initialVideoSearched) return;

    setInitialVideoSearched(true);

    if (!makingTime.isValid()) return;

    const currentVideo = storeVideoData.list.find((video) => {
      const start = dayjs(video.record_dt);
      const end = dayjs(video.record_finish_dt);

      return makingTime.isAfter(start) && makingTime.isBefore(end);
    });

    if (currentVideo) {
      setActiveVideo(currentVideo);
    } else {
      confirmModalStore.openModal({
        title: "원본 영상 확인",
        content: <p>조회된 영상 내역이 없습니다.</p>,
        showCloseButton: false,
        showCancelButton: false,
        onFormSubmit: () => {
          confirmModalStore.isOpen = false;
          router.back();
        },
        onClose: () => {
          confirmModalStore.isOpen = false;
          router.back();
        },
        onCancel: () => {
          confirmModalStore.isOpen = false;
          router.back();
        },
      });
    }
  }, [storeVideoData, router.isReady]);

  return (
    <Layout>
      <Tabs
        id="aistt-monitoring-view"
        tabs={[
          {
            title: "매장 테이블 영상 목록",
          },
        ]}
        activeTabIndex={0}
        onTabChange={() => {}}
      />
      <MonitoringPageStyle>
        <MonitoringListStyle>
          <div className="wrap">
            <div className="side">
              <h2 className="title">일자 선택</h2>
              <div className="list">
                {data?.list.map((record) => (
                  <MonitoringRecordItem
                    key={record.record_date}
                    itemLoading={isLoading}
                    recordDate={record.record_date}
                    active={activeDate === record.record_date}
                    onClickItem={(date) => setActiveDate(date)}
                  >
                    {storeVideoData?.list.map((video) => (
                      <button
                        key={video.store_stt_cctv_idx}
                        type="button"
                        className={`option ${
                          activeVideo?.store_stt_cctv_idx ===
                          video.store_stt_cctv_idx
                            ? "active"
                            : ""
                        }`}
                        onClick={() => setActiveVideo(video)}
                      >
                        {`${dayjs(video.record_dt).format("HH:mm")} ~ ${dayjs(
                          video.record_finish_dt
                        ).format("HH:mm")}`}
                        <span className="sub">
                          {dayjs("1970-01-01 00:00:00")
                            .add(video.video_length, "second")
                            .format("HH:mm")}
                        </span>
                      </button>
                    ))}
                  </MonitoringRecordItem>
                ))}
              </div>
            </div>
            <div className="view">
              {activeVideo ? (
                <MonitoringVideoView
                  key={activeVideo.store_stt_cctv_idx}
                  activeDate={activeDate}
                  videoInfo={activeVideo}
                />
              ) : (
                <Empty>
                  <b>조회된 영상내역이 없습니다.</b>
                  <br />
                  {!makingTime.isValid() && (
                    <span className="sub">날짜 및 영상을 조회해주세요.</span>
                  )}
                </Empty>
              )}
            </div>
          </div>
        </MonitoringListStyle>
      </MonitoringPageStyle>
    </Layout>
  );
};

export default MonitoringStoreVideos;
