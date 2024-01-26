import React from "react";
import { css } from "@emotion/react";
import { ReportTableProps } from "InterfaceFarm/aistt";
import SkeletonTh from "@ComponentFarm/atom/Skeleton/SkeletonTh";
import { TableSty4 } from "@ComponentFarm/template/common/table/TableSty";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";
import { reportDataConvert } from "./reportCovertData";

const pageSty = css`
  tr {
    min-height: 10.5rem;

    &:hover {
      background: transparent !important;

      &.td_chk {
        background: #fafafa !important;
      }
    }
    &:last-of-type {
      td {
        border-bottom: 1px solid var(--color-gray6) !important;
      }
    }
  }
  tr {
    th,
    td {
      text-align: center;
    }
  }
  .td_factor,
  .td_frequency {
    padding: 0 !important;
  }
  .txt_factor,
  .txt_frequency {
    display: block;

    padding: 1.2rem 0;
    border-bottom: 1px solid var(--color-gray6);

    &:last-of-type {
      text-align: center;
      border-bottom: none;
    }
  }
`;

export const ReportTable = ({
  isLoading,
  data,
}: {
  isLoading?: boolean;
  data?: ReportTableProps[];
}) => {
  return (
    <TableSty4 css={pageSty}>
      <colgroup>
        {[155, 155, 198, 198, 198, 593].map((el, i) => (
          <col key={i} width={getTableWidthPercentage(el)} />
        ))}
      </colgroup>
      <thead>
        <tr>
          <th colSpan={2}>구분</th>
          <th colSpan={3}>평가 항목</th>
          <th rowSpan={2}>빈도</th>
        </tr>
        <tr>
          <th>제조 단계</th>
          <th>상세 항목</th>
          <th>제조 평균 점수</th>
          <th>분류</th>
          <th>요인</th>
        </tr>
      </thead>
      <tbody>
        {!data ? (
          <SkeletonTh colLength={6} rowLength={12} />
        ) : (
          data &&
          reportDataConvert(data).map((el, i) => (
            <React.Fragment key={i}>
              <tr>
                <td rowSpan={3}>{el.group_step_name}</td>
                <td rowSpan={3}>{el.step_name}</td>
                <td rowSpan={3}>
                  {el.total_converted_score_average.toFixed(2)}점
                </td>

                <td>{el.ratings[0].rating_scale_name_1}</td>
                <td className="td_factor">
                  {el.ratings[0].items.map((item) => (
                    <span key={item.rating_scale_idx_3} className="txt_factor">
                      {item.rating_scale_name_3}
                    </span>
                  ))}
                </td>
                <td className="td_frequency">
                  {el.ratings[0].items.map((item) => (
                    <span
                      key={item.rating_scale_idx_3}
                      className="txt_frequency"
                    >
                      {item.frequency_count}
                    </span>
                  ))}
                </td>
              </tr>
              {el.ratings.slice(1).map((unit, idx: number) => (
                <tr key={idx} className={idx === 0 ? `td_chk` : ""}>
                  <td>{unit.rating_scale_name_1}</td>
                  <td className="td_factor">
                    {unit.items.map((item, index: number) => (
                      <span key={index} className="txt_factor">
                        {item.rating_scale_name_3}
                      </span>
                    ))}
                  </td>
                  <td className="td_frequency">
                    {unit.items.map((item, index2) => (
                      <span key={index2} className="txt_frequency">
                        {item.frequency_count}
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))
        )}
      </tbody>
    </TableSty4>
  );
};
