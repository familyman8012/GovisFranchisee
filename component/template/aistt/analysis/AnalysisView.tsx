import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { runInAction } from "mobx";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import { useMutation } from "react-query";
import { requestInspection } from "ApiFarm/aistt";
import { IFqsInspectionInfo } from "InterfaceFarm/ai-fqs";
import { Badge } from "@ComponentFarm/atom/Badge/Badge";
import { Button } from "@ComponentFarm/atom/Button/Button";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import Info from "@ComponentFarm/atom/icons/Info";
import Pic from "@ComponentFarm/atom/icons/Pic";
import Tooltip from "@ComponentFarm/atom/Tooltip/Tooltip";
import { Table, TableWrap } from "@ComponentFarm/common";
import SecondBadges from "@ComponentFarm/template/common/SecondBadges";
import TableExpandRow from "@ComponentFarm/template/common/TableExpandRow";
import { confirmModalStore } from "MobxFarm/store";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";
import { getScoreFormat } from "@UtilFarm/number";
import AnalysisStepDescription from "./AnalysisStepDescription";
import { AnalysisPageStyle } from "./style";
import FqsVideo, { VideoWrapStyle } from "../common/FqsVideo";
import { FqsAnalysisDataStyle, FqsInfoTable, SectionStyle } from "../style";

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
  inspectionId,
  onViewOriginVideo,
}: {
  loading?: boolean;
  data?: IFqsInspectionInfo;
  inspectionId?: number | string;
  onViewOriginVideo?: (item: IFqsInspectionInfo) => void;
}) => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [requestedInspect, setRequestedInspect] = useState(false);

  const handleChangeVideoTime = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  // is_requested가 null일 경우 재요청 버튼을 뒤로가기
  useEffect(() => {
    if (data?.is_re_request === null) {
      confirmModalStore.openModal({
        title: "평가 재요청",
        content: (
          <p>
            재평가가 진행중인 영상입니다. <br /> 목록으로 이동합니다.
          </p>
        ),
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
  }, [data?.is_re_request]);

  // 평가 재요청
  const requestInspect = useMutation(requestInspection, {
    onSuccess: () => {
      setRequestedInspect(true);
      runInAction(() => {
        confirmModalStore.openModal({
          title: "평가 재요청",
          content: (
            <p>
              해당 제조 영상에 대한 평가 재요청을 완료했습니다. <br /> 목록으로
              이동합니다.
            </p>
          ),
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
      });
    },
  });

  const isRequested =
    data?.is_re_request === 1 || requestInspect.isLoading || requestedInspect;

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
      <FqsVideo
        sticky
        closeButton
        ref={videoRef}
        src={data?.dual_video_url ? data?.dual_video_url : data?.video_url}
      />
      <div className="info">
        <h2>
          <span>
            {`[${data?.store_name ?? ""}] ${data?.product_info_name ?? ""}`}
            <Badge
              color={
                data?.inspection_status === "complete"
                  ? "green"
                  : data?.inspection_status === "indeterminate"
                  ? "red"
                  : "yellow"
              }
              dot
              size="sm"
            >
              {data?.inspection_status === "complete"
                ? "검수 완료"
                : data?.inspection_status === "indeterminate"
                ? "판단 불가"
                : "영상 불량"}
            </Badge>
          </span>

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
        </h2>
        <p>평가일자 {data?.inspection_dt}</p>
        <p>제조일자 {data?.manufacture_dt}</p>
      </div>
      <div className="inspection-info">
        <SectionStyle className="summary">
          <h3 className="title">제조 결과</h3>
          {inspectionId && (
            <Button
              disabled={isRequested}
              onClick={() => requestInspect.mutate(Number(inspectionId))}
            >
              평가 재요청
              {isRequested && (
                <Tooltip eventType="hover" direction="left">
                  {`평가 재요청됨.\n평가 완료까지 시간이 소요됩니다.`}
                </Tooltip>
              )}
            </Button>
          )}
          <FqsInfoTable bordered className="content">
            <colgroup>
              <col width={getTableWidthPercentage(80)} />
              <col width={getTableWidthPercentage(200)} />
              <col width={getTableWidthPercentage(80)} />
              <col width={getTableWidthPercentage(200)} />
              <col width={getTableWidthPercentage(80)} />
              <col width={getTableWidthPercentage(432)} />
            </colgroup>
            <tbody>
              <tr>
                <th>피자명</th>
                <td>{data?.product_info_name}</td>
                <th>제조시간</th>
                <td>
                  {dayjs
                    .unix(data?.manufacture_since_time ?? 0)
                    .format("m분 ss초")}
                </td>
                <th>종합 점수</th>
                <td>{getScoreFormat(data?.converted_score)}/100</td>
              </tr>
              <tr>
                <th>
                  <button type="button" className="tooltip-button">
                    감점 사항
                    <Info />
                    <Tooltip eventType="hover" direction="top">
                      <ul>
                        <li>
                          <Badge color="yellow" size="sm">
                            미흡
                          </Badge>
                          면적 / 개수 기준치 보다 약간 부족하지만 제조에 영향이
                          없는 수준
                        </li>
                        <li>
                          <Badge color="red" size="sm">
                            심각
                          </Badge>
                          면적 / 개수 기준치 보다 많이 부족하고 품질에 심각한
                          영향을 주는 수준
                        </li>
                      </ul>
                    </Tooltip>
                  </button>
                </th>
                <td colSpan={5}>
                  <ul>
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
                </td>
              </tr>
            </tbody>
          </FqsInfoTable>
        </SectionStyle>
        <SectionStyle className="list">
          <h3 className="title">단계별 상세 결과</h3>
          <span className="count">
            총 <span className="number">{data?.step_list.length ?? 0}</span> 건
          </span>
          <TableWrap className="content">
            <Table className="basic">
              <colgroup>
                <col width={getTableWidthPercentage(50)} />
                <col width={getTableWidthPercentage(100)} />
                <col width={getTableWidthPercentage(160)} />
                <col width={getTableWidthPercentage(150)} />
                <col width={getTableWidthPercentage(740)} />
                <col width={getTableWidthPercentage(220)} />
              </colgroup>
              <thead>
                <tr>
                  <th>&nbsp;</th>
                  <th className="center">검수 결과</th>
                  <th>구간 종류</th>
                  <th>구간 이미지</th>
                  <th className="center">구간 시작 및 종료</th>
                  <th className="center">레시피 단계별 점수</th>
                </tr>
              </thead>
              <tbody>
                {!data?.step_list.length && (
                  <tr className="empty">
                    <td colSpan={5}>
                      <Empty>데이터가 없습니다.</Empty>
                    </td>
                  </tr>
                )}
                {data?.step_list.map((item) => (
                  <TableExpandRow
                    key={item.inspection_step_idx}
                    content={
                      <FqsAnalysisDataStyle>
                        <ul>
                          <li
                            className={
                              !item.ground_truth_image_url ? "hide-line" : ""
                            }
                          >
                            <span className="ico">
                              <Pic />
                            </span>
                            <div className="cont">
                              <div className="inspection-img">
                                <h3>제조 이미지</h3>
                                <img
                                  src={item.step_color_image_url}
                                  alt=""
                                  width="100%"
                                />
                              </div>
                            </div>
                          </li>
                          {item.ground_truth_image_url && (
                            <li className="hide-line">
                              <span className="ico">
                                <Pic />
                              </span>
                              <div className="cont">
                                <div className="inspection-img">
                                  <h3>레시피 표준 이미지</h3>
                                  <img
                                    src={item.ground_truth_image_url}
                                    alt=""
                                    width="100%"
                                  />
                                </div>
                              </div>
                            </li>
                          )}
                        </ul>
                        <ul>
                          <li className="hide-line">
                            {item.section_description && (
                              <div className="inspection-img">
                                <h3>세부 분석 결과</h3>
                                <AnalysisStepDescription
                                  description={item.section_description}
                                />
                              </div>
                            )}
                          </li>
                        </ul>
                      </FqsAnalysisDataStyle>
                    }
                  >
                    <td className="center">
                      <Badge
                        color={
                          item.rating_scale_idx_1 === 2
                            ? "yellow"
                            : item.rating_scale_idx_1 === 3
                            ? "red"
                            : "blue"
                        }
                        size="sm"
                      >
                        {item.rating_scale_name_1 === "감점 항목"
                          ? "미흡"
                          : item.rating_scale_name_1 === "개선 필요"
                          ? "심각"
                          : item.rating_scale_name_1}
                      </Badge>
                    </td>
                    <td>{item?.step_variable_name}</td>

                    <td>
                      <img
                        src={item.step_image_url}
                        alt={item?.step_variable_name}
                        width="100px"
                      />
                    </td>
                    {/** 시간 클릭 시 영상 시간 변경 */}
                    <td className="center">
                      <SecondBadges
                        beforeSecond={item.section_dt_start}
                        afterSecond={item.section_dt_finish}
                        onClickbeforeSecond={handleChangeVideoTime}
                        onClickAfterSecond={handleChangeVideoTime}
                      />
                    </td>
                    <td className="center">{item.conversion_score}/100</td>
                  </TableExpandRow>
                ))}
              </tbody>
            </Table>
          </TableWrap>
        </SectionStyle>
      </div>
    </AnalysisPageStyle>
  );
};

export default AnalysisView;
