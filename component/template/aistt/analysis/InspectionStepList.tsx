import Empty from "@ComponentFarm/atom/Empty/Empty";
import { Table, TableWrap } from "@ComponentFarm/common";
import TableExpandRow from "@ComponentFarm/template/common/TableExpandRow";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";
import useReponsive from "HookFarm/useResponsive";

import { Badge } from "@ComponentFarm/atom/Badge/Badge";
import SecondBadges from "@ComponentFarm/template/common/SecondBadges";
import { IFqsInspectionInfo } from "InterfaceFarm/ai-fqs";
import InspectionStepDescription from "./InspectionStepDescription";
import styled from "@emotion/styled";

interface Props {
  stepList: IFqsInspectionInfo["step_list"];
  onChangeVideoTime: (time: number) => void;
}

const InspectionStepListStyle = styled.div`
  .mo-table {
    tbody tr > td:nth-of-type(1) {
      font-weight: 600;
      color: var(--color-neutral50);
    }
  }

  .mo-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .mo-info .product-name {
    color: var(--color-neutral30);
  }

  .mo-info .status {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  b {
    font-weight: 600;
  }
`;

const InspectionStepList = ({ stepList, onChangeVideoTime }: Props) => {
  const { isMobile } = useReponsive();

  if (isMobile) {
    return (
      <InspectionStepListStyle>
        <TableWrap className="content">
          <Table className="basic mo-table">
            <colgroup>
              <col width={getTableWidthPercentage(100)} />
              <col width={getTableWidthPercentage(248)} />
              <col width={getTableWidthPercentage(104)} />
            </colgroup>
            <thead>
              <tr>
                <th className="center">No.</th>
                <th className="center">레시피 구간 종류</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {!stepList.length && (
                <tr className="empty">
                  <td colSpan={3}>
                    <Empty>데이터가 없습니다.</Empty>
                  </td>
                </tr>
              )}
              {stepList.map((item, i) => (
                <TableExpandRow
                  key={item.inspection_step_idx}
                  content={<InspectionStepDescription inspectionStep={item} />}
                >
                  <td className="center">
                    <h3>{i + 1 > 9 ? i + 1 : `0${i + 1}`}</h3>
                  </td>
                  <td className="left">
                    <div className="mo-info">
                      <b className="product-name">{item?.step_variable_name}</b>
                      <p className="status">
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
                        <span className="score">
                          <b>{item.conversion_score}</b> / 100점
                        </span>
                      </p>
                    </div>
                  </td>
                </TableExpandRow>
              ))}
            </tbody>
          </Table>
        </TableWrap>
      </InspectionStepListStyle>
    );
  }

  return (
    <InspectionStepListStyle>
      <TableWrap>
        <Table className="basic">
          <colgroup>
            <col width={getTableWidthPercentage(100)} />
            <col width={getTableWidthPercentage(120)} />
            <col width={getTableWidthPercentage(370)} />
            <col width={getTableWidthPercentage(100)} />
            <col width={getTableWidthPercentage(370)} />
            <col width={getTableWidthPercentage(370)} />
            <col width={getTableWidthPercentage(104)} />
          </colgroup>
          <thead>
            <tr>
              <th className="center">No.</th>
              <th className="center">기준 결과</th>
              <th className="center">레시피 구간 종류</th>
              <th>이미지</th>
              <th className="center">구간 시작 및 종료</th>
              <th className="center">레시피 단계별 점수</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {!stepList.length && (
              <tr className="empty">
                <td colSpan={5}>
                  <Empty>데이터가 없습니다.</Empty>
                </td>
              </tr>
            )}
            {stepList.map((item, i) => (
              <TableExpandRow
                key={item.inspection_step_idx}
                content={<InspectionStepDescription inspectionStep={item} />}
              >
                <td className="center">{i + 1 > 9 ? i + 1 : `0${i + 1}`}</td>
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
                <td className="center">{item?.step_variable_name}</td>
                <td className="center">
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
                    onClickbeforeSecond={onChangeVideoTime}
                    onClickAfterSecond={onChangeVideoTime}
                  />
                </td>
                <td className="center">
                  <b>{item.conversion_score}</b> / 100점
                </td>
              </TableExpandRow>
            ))}
          </tbody>
        </Table>
      </TableWrap>
    </InspectionStepListStyle>
  );
};

export default InspectionStepList;
