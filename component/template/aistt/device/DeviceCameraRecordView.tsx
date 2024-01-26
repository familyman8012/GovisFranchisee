import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { useQuery } from "react-query";
import { fetchAisttDeviceCameraVideoList } from "ApiFarm/aistt";
import { IFqsStoreCameraInfo } from "InterfaceFarm/ai-fqs";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import SkeletonTh from "@ComponentFarm/atom/Skeleton/SkeletonTh";
import { Table, TableWrap } from "@ComponentFarm/common";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";
import StateInfoBox from "../../common/StateInfoBox";
import TableExpandRow from "../../common/TableExpandRow";
import FqsVideo, { VideoWrapStyle } from "../common/FqsVideo";
import { FqsInfoTable, SectionStyle } from "../style";

interface Props {
  storeId: number;
  cameraId: number;
  cameraType: string;
  cameraInfo: IFqsStoreCameraInfo;
}
const getRecordTime = (time: number) => {
  const hour = Math.floor(time / 3600);
  const min = Math.floor((time % 3600) / 60);
  const sec = Math.floor(time % 60);

  return dayjs().hour(hour).minute(min).second(sec).format("HH:mm:ss");
};

const CameraRecordList = ({
  cameraId,
  storeId,
  recordDate,
  recordCount,
  onClick,
}: Pick<Props, "cameraId" | "storeId"> & {
  recordDate: string;
  recordCount: number;
  onClick: (videoSource: string) => void;
}) => {
  const { data, isLoading } = useQuery(
    ["store-camera-record-list", cameraId, storeId, recordDate],
    () =>
      fetchAisttDeviceCameraVideoList({
        store_idx: storeId,
        store_stt_camera_idx: cameraId,
        recode_date: recordDate,
      })
  );

  return (
    <FqsInfoTable>
      <colgroup>
        <col width={getTableWidthPercentage(50, 1181)} />
        <col width={getTableWidthPercentage(200, 1181)} />
        <col width={getTableWidthPercentage(200, 1181)} />
        <col width={getTableWidthPercentage(600, 1181)} />
        <col />
      </colgroup>
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th className="left">등록시간</th>
          <th className="left">영상명</th>
          <th className="left">영상시간</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <SkeletonTh colLength={4} rowLength={recordCount} />
        ) : (
          data?.list.map((item) => (
            <tr
              key={item.cctv_video_name}
              onClick={() => onClick(item.cctv_video_url)}
            >
              <td>&nbsp;</td>
              <td className="code">{item.recode_dt}</td>
              <td>{item.cctv_video_name}</td>
              <td>{getRecordTime(item.video_length)}</td>
            </tr>
          ))
        )}
      </tbody>
    </FqsInfoTable>
  );
};

const DeviceCameraRecordView = ({
  storeId,
  cameraId,
  cameraType,
  cameraInfo,
}: Props) => {
  const [videoSource, setVideoSource] = useState(
    cameraInfo?.camera_info.last_cctv_video_url
  );
  const cameraState = useMemo(
    () =>
      cameraType === "camera_table"
        ? [
            {
              title: "노출 시간",
              txt1: cameraInfo.camera_info.shutter_speed
                ? cameraInfo.camera_info.shutter_speed
                : "-",
              txt2: "초",
            },
            {
              title: "ISO 대비 민감도",
              txt1: cameraInfo.camera_info.iso
                ? cameraInfo.camera_info.iso
                : "-",
              txt2: "ISO",
            },
            {
              title: "카메라 FPS",
              txt1: cameraInfo.camera_info.fps
                ? cameraInfo.camera_info.fps
                : "-",
              txt2: "fps",
            },
          ]
        : [
            {
              title: "카메라 ID",
              txt1: cameraInfo.camera_info.camera_id
                ? cameraInfo.camera_info.camera_id
                : "-",
            },
            {
              title: "카메라 해상도",
              txt1: cameraInfo.camera_info.resolution_width
                ? cameraInfo.camera_info.resolution_width
                : "-",
              txt2: "px",
            },
            {
              title: "카메라 해상도 높이",
              txt1: cameraInfo.camera_info.resolution_height
                ? cameraInfo.camera_info.resolution_height
                : "-",
              txt2: "px",
            },
            {
              title: "카메라 FPS",
              txt1: cameraInfo.camera_info.fps
                ? cameraInfo.camera_info.fps
                : "-",
              txt2: "fps",
            },
          ],

    [cameraInfo]
  );

  return (
    <>
      <SectionStyle>
        <h3 className="title">영상 정보</h3>
      </SectionStyle>
      <StateInfoBox items={cameraState} />

      {videoSource ? (
        <FqsVideo src={videoSource} />
      ) : (
        <VideoWrapStyle>
          <div className="empty">
            <Empty>조회된 영상이 없습니다.</Empty>
          </div>
        </VideoWrapStyle>
      )}
      <SectionStyle>
        <h3 className="title">영상 내역</h3>
        <span className="count">
          총 <span className="number">{cameraInfo?.list.length ?? 0}</span> 건
        </span>
        <TableWrap className="content">
          <Table className="basic">
            <colgroup>
              <col width={getTableWidthPercentage(50)} />
              <col width={getTableWidthPercentage(160)} />
              <col width={getTableWidthPercentage(644)} />
              <col width={getTableWidthPercentage(336)} />
            </colgroup>
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th>등록일</th>
                <th>영상수</th>
                <th>총 영상 시간</th>
              </tr>
            </thead>
            <tbody>
              {!cameraInfo.list.length ? (
                <tr className="empty">
                  <td colSpan={4}>
                    <Empty>데이터가 없습니다.</Empty>
                  </td>
                </tr>
              ) : (
                cameraInfo.list.map((item) => (
                  <TableExpandRow
                    key={item.recode_date}
                    content={
                      <CameraRecordList
                        storeId={storeId}
                        cameraId={cameraId}
                        recordCount={item.recode_count}
                        recordDate={item.recode_date}
                        onClick={(source) => setVideoSource(source)}
                      />
                    }
                  >
                    <td className="code">{item.recode_date}</td>
                    <td>{item.recode_count}</td>
                    <td>{getRecordTime(item.video_length_sum)}</td>
                  </TableExpandRow>
                ))
              )}
            </tbody>
          </Table>
        </TableWrap>
      </SectionStyle>
    </>
  );
};

export default DeviceCameraRecordView;
