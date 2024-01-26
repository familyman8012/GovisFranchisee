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
import { DevicePageStyle } from "@ComponentFarm/template/aistt/device/style";
import MonitoringRecordItem from "@ComponentFarm/template/aistt/monitoring/MonitoringRecordItem";
import MonitoringVideoView from "@ComponentFarm/template/aistt/monitoring/MonitoringVideoView";
import {
  FqsInfoTable,
  SectionStyle,
} from "@ComponentFarm/template/aistt/style";
import LayoutTitleBoxWithTab from "@ComponentFarm/template/layout/LayoutWithTitleBoxAndTab";
import { MenuOptionListStyle } from "@ComponentFarm/template/menu/style";
import { confirmModalStore } from "MobxFarm/store";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";
import Layout from "ComponentsFarm/layouts";

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
  const store_idx = useMemo(
    () => parseInt(router.query?.store_idx as string, 10),
    [router.query, router.isReady]
  );

  const { data } = useQuery(
    ["aistt-monitoring-record", store_idx],
    () => fetchMonitoringStoreRecordList(store_idx),
    {
      enabled: !!store_idx,
    }
  );

  const { data: storeVideoData, isLoading } = useQuery(
    ["aistt-monitoring-video", store_idx, activeDate],
    () =>
      fetchMonitoringStoreVideoList({
        store_idx,
        record_date: activeDate,
      }),
    {
      enabled: !!store_idx && !!activeDate,
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
      <LayoutTitleBoxWithTab
        title="제품 모니터링"
        tabs={React.useMemo(
          () => [
            {
              title: "제조 제품 목록",
              path: `/aistt-monitoring/[store_idx]`,
            },
            {
              title: "매장 테이블 영상 목록",
              path: `/aistt-monitoring/[store_idx]/videos`,
            },
          ],
          []
        )}
      />
      <DevicePageStyle>
        <SectionStyle>
          <h3 className="title">Smart Topping Table 영상 목록</h3>
        </SectionStyle>
        <FqsInfoTable bordered>
          <colgroup>
            <col width={getTableWidthPercentage(120)} />
            <col width={getTableWidthPercentage(1384)} />
          </colgroup>
          <tbody>
            <tr>
              <th>매장명</th>
              <td>{data?.info.store_name}</td>
            </tr>
          </tbody>
        </FqsInfoTable>
        <SectionStyle>
          <h3 className="title">일자 목록</h3>
        </SectionStyle>
        <MenuOptionListStyle>
          <div className="wrap">
            <div className="side">
              <div className="list abs">
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
                  storeIdx={store_idx}
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
        </MenuOptionListStyle>
      </DevicePageStyle>
    </Layout>
  );
};

export default MonitoringStoreVideos;
