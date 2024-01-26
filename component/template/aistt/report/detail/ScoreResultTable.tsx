import React, { useState } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { css } from "@emotion/react";
import { fetchScoreResultDetail } from "ApiFarm/aistt";
import {
  IReportScoreAverageDetailRes,
  IReportScoreAverageItem,
} from "InterfaceFarm/aistt";
import { TimeBadge } from "@ComponentFarm/atom/Badge/TimeBadge";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import { Pic } from "@ComponentFarm/atom/icons";
import DataFilled from "@ComponentFarm/atom/icons/DataFilled";
import SkeletonTh from "@ComponentFarm/atom/Skeleton/SkeletonTh";
import ToggleSort from "@ComponentFarm/atom/Sort/ToggleSort";
import {
  PageSpinner,
  PageSpinnerWrap,
} from "@ComponentFarm/atom/Spinner/Spinner";
import { Table, TableWrap } from "@ComponentFarm/common";
import TableExpandRow from "@ComponentFarm/template/common/TableExpandRow";
import { QueryParams } from "HookFarm/useQueryParams";
import useSortable from "HookFarm/useSortable";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";
import {
  ImprovementNeedCause,
  ImprovementNeedCauseWrap,
} from "../../state/detail/ImprovementNeedCause";
import { ReportTable } from "../../state/detail/ReportTable";
import { FqsAnalysisDataStyle } from "../../style";

const pageStyle = css`
  position: relative;
  width: calc(100% - 5rem);
  h3 {
    margin-bottom: 1.6rem;
  }
  .wrap_improvement_need {
    display: flex;
  }

  ul {
    > li:first-of-type {
      padding-bottom: 3rem;
    }
  }
  ${ImprovementNeedCauseWrap} {
    dd:nth-of-type(2) {
      [aria-busy="true"] {
        height: 24rem;
      }
    }
  }

  ${PageSpinnerWrap} {
    top: 20rem;
    left: calc(50%);
  }
`;

export const ScoreResultExpandContent = ({
  detailData,
}: {
  detailData: any;
}) => {
  return (
    <FqsAnalysisDataStyle css={pageStyle}>
      <ul>
        <li>
          <span className="ico">
            <Pic />
          </span>
          <div className="cont_improvement_need">
            <h3>주요 개선 필요 요인</h3>
            <ImprovementNeedCause data={detailData} />
          </div>
        </li>
        <li className="hide-line">
          <span className="ico">
            <DataFilled />
          </span>
          <div className="cont">
            <div className="inspection">
              <h3>리포트</h3>
              <ReportTable data={detailData?.report} />
            </div>
          </div>
        </li>
      </ul>
      {!detailData && <PageSpinner spinnerText="PROCESSING" />}
    </FqsAnalysisDataStyle>
  );
};

interface DetailData {
  [key: string]: IReportScoreAverageDetailRes;
}

export const ScoreResultTable = ({
  isLoading,
  info,
  data,
  updateParams,
}: {
  isLoading: boolean;
  info: { fqs_reports_idx: string; store_idx: string };
  data?: IReportScoreAverageItem[];
  updateParams: (newParams: QueryParams) => void;
}) => {
  const { sortState, toggleSort } = useSortable(updateParams);
  const [detailData, setDetailData] = useState<DetailData>({});

  const fetchAndStoreDetailData = async (productInfoIdx: string) => {
    if (!detailData[productInfoIdx]) {
      const fetchedData = await fetchScoreResultDetail({
        fqs_reports_idx: String(info.fqs_reports_idx),
        product_info_idx: productInfoIdx,
        store_idx: String(info.store_idx),
      });
      setDetailData((prev) => ({ ...prev, [productInfoIdx]: fetchedData }));
    }
  };

  const Th = [
    { label: "", sort: "" },
    { label: "제품명", sort: "product_name" },
    { label: "대표 이미지", sort: "" },
    { label: "총 제조 건수", sort: "manufacturing_count" },
    { label: "평균 제조 점수", sort: "converted_score_avarage" },
    { label: "평균 제조 시간", sort: "manufacture_since_time_avarage" },
    { label: "개선 필요 피자 수", sort: "improvement_needed_count" },
  ];

  return (
    <TableWrap className="content">
      <Table
        className="basic"
        css={css`
          th,
          td {
            height: 5.35rem;
            &:not(:nth-of-type(2)) {
              padding: 1.2rem 1rem 1.2rem !important;
              text-align: center;
            }
          }
        `}
      >
        <colgroup>
          {[50, 330, 150, 225.5, 225.5, 225.5, 225.5].map((el, i) => (
            <col key={i} width={getTableWidthPercentage(el)} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {Th.map((el, i) => (
              <th key={i} onClick={() => el.sort && toggleSort(el.sort)}>
                <span className="th_title">
                  {el.label}
                  {el.sort && <ToggleSort el={el} sortState={sortState} />}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <SkeletonTh colLength={7} rowLength={8} />
          ) : data?.length === 0 ? (
            <tr>
              <td colSpan={7}>
                <Empty Icon={<IoAlertCircleOutline size={42} />} />
              </td>
            </tr>
          ) : (
            data?.map((item) => (
              <TableExpandRow
                key={item.product_info_idx}
                onExpand={() =>
                  fetchAndStoreDetailData(String(item.product_info_idx))
                }
                content={
                  <ScoreResultExpandContent
                    detailData={detailData[item.product_info_idx]}
                  />
                }
              >
                {/* 테이블 셀 내용 */}
                <td>{item.product_name}</td>
                <td>
                  {item.product_image ? (
                    <img src={item.product_image} alt={item.product_name} />
                  ) : (
                    <Pic size={25} />
                  )}
                </td>
                <td>{item.manufacturing_count}건</td>
                <td>{item.converted_score_avarage}점</td>
                <td>
                  <TimeBadge time={item.manufacture_since_time_avarage} />
                </td>
                <td>{item.improvement_needed_count}건</td>
              </TableExpandRow>
            ))
          )}
        </tbody>
      </Table>
    </TableWrap>
  );
};
