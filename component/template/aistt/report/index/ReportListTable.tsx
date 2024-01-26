/* eslint-disable camelcase */
import React from "react";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoAlertCircleOutline } from "react-icons/io5";
import { css } from "@emotion/react";
import { IReportListRes } from "InterfaceFarm/aistt";
import { Badge } from "@ComponentFarm/atom/Badge/Badge";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import SkeletonTh from "@ComponentFarm/atom/Skeleton/SkeletonTh";
import ToggleSort from "@ComponentFarm/atom/Sort/ToggleSort";
import { Table, TableWrap } from "@ComponentFarm/common";
import { QueryParams } from "HookFarm/useQueryParams";
import useSortable from "HookFarm/useSortable";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";

interface TableProps {
  isLoading: boolean;
  data?: IReportListRes;
  updateParams: (newParams: QueryParams) => void;
}

const ReportListTable = ({ isLoading, data, updateParams }: TableProps) => {
  const router = useRouter();
  const { sortState, toggleSort } = useSortable(updateParams);

  const handleGoIdxClick = (idx: string) => {
    router.push({
      pathname: `/aistt-report/detail`,
      query: { id: idx, ...router.query },
    });
  };

  const Th = [
    { label: "레포트 코드", sort: "fqs_reports_idx" },
    { label: "레포트명", sort: "" },
    { label: "데이터 수집 기간 ", sort: "" },
    { label: "등록일", sort: "" },
    { label: "발송여부", sort: "" },
    { label: "발송일", sort: "" },
    { label: "발송 수", sort: "" },
  ];

  return (
    <TableWrap>
      <Table
        className="basic"
        css={css`
          th,
          td {
            text-align: center;
            &:first-of-type,
            &:nth-of-type(2) {
              text-align: left;
            }
          }
          .bar {
            display: inline-block;
            padding: 0 2rem;
          }
        `}
      >
        <colgroup>
          {[140, 516, 310, 150, 150, 150, 120].map((el, i) => (
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
            <SkeletonTh colLength={10} />
          ) : data?.list.length === 0 ? (
            <tr>
              <td colSpan={10} rowSpan={10}>
                <Empty Icon={<IoAlertCircleOutline size={42} />} />
              </td>
            </tr>
          ) : (
            data?.list?.map((report) => (
              <tr
                key={report.fqs_reports_idx}
                onClick={() => handleGoIdxClick(String(report.fqs_reports_idx))}
              >
                <td className="code">
                  <Link
                    href={{
                      pathname: `/aistt-report/detail/${report.fqs_reports_idx}`,
                      query: { id: report.fqs_reports_idx, ...router.query },
                    }}
                  >
                    {report.fqs_reports_code}
                  </Link>
                </td>
                <td>{report.fqs_reports_name}</td>
                <td>
                  {dayjs(report.collection_range_start_dt).format("YYYY-MM-DD")}
                  <span className="bar">-</span>
                  {dayjs(report.collection_range_end_dt).format("YYYY-MM-DD")}
                </td>
                <td>{dayjs(report.registration_dt).format("YYYY-MM-DD")}</td>
                <td>
                  <Badge
                    color={report.is_send === 1 ? "green" : "red"}
                    size="sm"
                    dot
                  >
                    {report.is_send === 1 ? "발송" : "미발송"}
                  </Badge>
                </td>
                <td>
                  {report.is_send === 1
                    ? dayjs(report.send_dt).format("YYYY-MM-DD")
                    : "-"}
                </td>
                <td>{report.is_send === 1 ? `${report.send_count}개` : "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </TableWrap>
  );
};

export default ReportListTable;
