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

import MonitoringVideoView from "@ComponentFarm/template/aistt/monitoring/MonitoringVideoView";

import { confirmModalStore } from "MobxFarm/store";
import Layout from "ComponentsFarm/layouts";
import {
  MonitoringListStyle,
  MonitoringPageStyle,
} from "@ComponentFarm/template/aistt/monitoring/style";
import { Tabs } from "@ComponentFarm/atom/Tab/Tab";

import { MonitoringViewLoading } from "@ComponentFarm/template/aistt/monitoring/MonitoringViewLoading";
import MonitoringTimeFilter from "@ComponentFarm/template/aistt/monitoring/MonitoringTimeFilter";

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

  const { data, isLoading } = useQuery(["aistt-monitoring-record"], () =>
    fetchMonitoringStoreRecordList()
  );

  const { data: storeVideoData, isLoading: storeVideoLoading } = useQuery(
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

      return (
        (makingTime.isAfter(start) || makingTime.isSame(start)) &&
        (makingTime.isBefore(end) || makingTime.isSame(end))
      );
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

  if (isLoading) {
    return (
      <Layout>
        <MonitoringPageStyle>
          <MonitoringViewLoading />
        </MonitoringPageStyle>
      </Layout>
    );
  }

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
              <MonitoringTimeFilter
                activeDate={activeDate}
                activeVideo={activeVideo}
                onChangeDate={(date) => setActiveDate(date)}
                onChangeVideo={(videoInfo) => setActiveVideo(videoInfo)}
              />
            </div>
            <div className="view">
              {activeVideo ? (
                <MonitoringVideoView
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
