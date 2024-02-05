import React, { useRef } from "react";
import dayjs from "dayjs";
import Skeleton from "react-loading-skeleton";
import { IFqsInspectionInfo } from "InterfaceFarm/ai-fqs";
import { Badge } from "@ComponentFarm/atom/Badge/Badge";
import { Button } from "@ComponentFarm/atom/Button/Button";

import { SectionStyle } from "../style";
import { AnalysisPageStyle } from "./style";
import FqsVideo from "../common/FqsVideo";
import InspectionStepList from "./InspectionStepList";
import useWifiPopup from "HookFarm/useWifiPopup";
import { VideoWrapStyle } from "../common/style";
import VideoPlayConfirm from "../common/VideoPlayConfirm";

const AnalysisViewLoading = () => {
  return (
    <AnalysisPageStyle>
      <VideoWrapStyle />
      <div className="info">
        <h2>
          <Skeleton width="350px" height="2.6rem" />
        </h2>
        <p>
          <Skeleton width="100px" height="1.7rem" />
        </p>
        <p>
          <Skeleton width="100px" height="1.7rem" />
        </p>
      </div>
    </AnalysisPageStyle>
  );
};

const AnalysisView = ({
  loading,
  data,
  onViewOriginVideo,
}: {
  loading?: boolean;
  data?: IFqsInspectionInfo;
  inspectionId?: number | string;
  onViewOriginVideo?: (item: IFqsInspectionInfo) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const handleChangeVideoTime = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const [isConfined, setIsConfirmed] = useWifiPopup();

  const insufficientList = React.useMemo(
    () => data?.step_list.filter((step) => step.rating_scale_idx_1 === 2),
    [data]
  );

  const criticalList = React.useMemo(
    () => data?.step_list.filter((step) => step.rating_scale_idx_1 === 3),
    [data]
  );

  if (loading) {
    return <AnalysisViewLoading />;
  }

  return (
    <AnalysisPageStyle>
      <div className="top">
        <div className="video">
          <h3 className="title">피자 제조 영상</h3>
          <FqsVideo
            sticky
            closeButton
            ref={videoRef}
            src={data?.dual_video_url ? data?.dual_video_url : data?.video_url}
            onPlay={() => setIsConfirmed(true)}
          />
        </div>
        <div className="inspection-result">
          <h3 className="title">평가 결과</h3>
          <ul className="card">
            <li className="product">
              <sub>평가 대상 제품명</sub>
              <h2>{data?.product_info_name}</h2>
            </li>
            <li className="manufactor">
              <div className="left">
                <p>제조일자 {data?.manufacture_dt}</p>
                <p>평가일자 {data?.inspection_dt}</p>
              </div>
              <div className="right">
                {/**
                 * onViewOriginVideo props 전달 시 원본 영상 보기 버튼 노출
                 */}
                {data && onViewOriginVideo && (
                  <Button
                    variant="gostPrimary"
                    onClick={() => onViewOriginVideo(data)}
                  >
                    원본 영상 보기
                  </Button>
                )}
              </div>
              <div className="bottom">
                <span>제조시간</span>
                <b>
                  {dayjs
                    .unix(data?.manufacture_since_time ?? 0)
                    .set("hour", 0)
                    .format("HH:mm:ss")}
                </b>
              </div>
            </li>
            <li>
              <sub>감점 결과 및 요인 분석</sub>
              <ul className="inspections">
                {insufficientList?.map((item) => (
                  <li key={item.inspection_step_idx}>
                    <Badge size="sm" color="yellow">
                      미흡
                    </Badge>
                    {item.improvement_label || item.decrease_label}
                  </li>
                ))}
                {criticalList?.map((item) => (
                  <li key={item.inspection_step_idx}>
                    <Badge size="sm" color="red">
                      심각
                    </Badge>
                    {item.improvement_label || item.decrease_label}
                  </li>
                ))}
                {!insufficientList?.length && !criticalList?.length && (
                  <li className="empty">감점 사항이 없습니다.</li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className="inspection-info">
        <SectionStyle className="list">
          <h3 className="title">레시피 단계별 평가</h3>
          <InspectionStepList
            stepList={data?.step_list ?? []}
            onChangeVideoTime={handleChangeVideoTime}
          />
        </SectionStyle>
      </div>
    </AnalysisPageStyle>
  );
};

export default AnalysisView;
