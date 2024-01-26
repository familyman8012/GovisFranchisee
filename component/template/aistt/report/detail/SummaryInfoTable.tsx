import React, { SetStateAction } from "react";
import dayjs from "dayjs";
import { css } from "@emotion/react";
import { IReportInfoRes } from "InterfaceFarm/aistt";
import { Badge } from "@ComponentFarm/atom/Badge/Badge";
import { TableSty3 } from "@ComponentFarm/template/common/table/TableSty";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";

const pageSty = css`
  width: 100%;
  tr:nth-of-type(3) {
    td {
      padding: 1.2rem 2.4rem;
    }
  }

  table {
    width: 100%;
  }

  .table_summary {
    th,
    td {
      height: 5rem;

      letter-spacing: 0.042rem;
      text-align: center;
      border: 1px solid var(--color-gray6);

      &:nth-of-type(1) {
        padding-left: 9rem;
        text-align: left;
      }
    }

    th {
      color: var(--gray500);
      font-weight: 500;
      background: var(--color-gray2);
    }
  }

  .btn_mail_list {
    padding: 0 0.3rem;
    border-bottom: 1px solid var(--color-neutral10);
    background: transparent;
    cursor: pointer;
  }
`;

export const SummaryInfoTable = ({
  setMailListOpen,
  data,
}: {
  setMailListOpen: React.Dispatch<SetStateAction<boolean>>;
  data?: IReportInfoRes;
}) => {
  return (
    <TableSty3 css={pageSty}>
      <colgroup>
        {[120, 628, 120, 628].map((el, i) => (
          <col key={i} width={getTableWidthPercentage(el)} />
        ))}
      </colgroup>
      <tbody>
        <tr>
          <th scope="row">레포트명</th>
          <td>{data?.info.fqs_reports_name}</td>
          <th scope="row">발송여부</th>
          <td>
            <Badge
              color={data?.info.is_send === 1 ? "green" : "red"}
              size="sm"
              dot
            >
              {data?.info.is_send === 1 ? "발송" : "미발송"}
            </Badge>
          </td>
        </tr>
        <tr>
          <th scope="row">수집 기간</th>
          <td>
            {" "}
            {dayjs(data?.info.collection_range_start_dt).format("YYYY-MM-DD")} ~
            {dayjs(data?.info.collection_range_end_dt).format("YYYY-MM-DD")}
          </td>
          <th scope="row">발송일</th>
          <td>
            {data?.info.is_send === 1
              ? dayjs(data?.info.send_dt).format("YYYY-MM-DD")
              : "-"}
          </td>
        </tr>
        <tr>
          <th scope="row">등록일</th>
          <td>{dayjs(data?.info.registration_dt).format("YYYY-MM-DD")}</td>
          <th scope="row">발송수</th>
          <td>
            {data?.info.send_count ? (
              <button
                type="button"
                className="btn_mail_list"
                onClick={() => setMailListOpen(true)}
              >
                {data?.info.send_count}건
              </button>
            ) : (
              `${0}건`
            )}
          </td>
        </tr>
      </tbody>
    </TableSty3>
  );
};
