/* eslint-disable camelcase */
import React from "react";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoAlertCircleOutline } from "react-icons/io5";
import { css } from "@emotion/react";
import { IManufacturingListRes } from "InterfaceFarm/aistt";
import { TimeBadge } from "@ComponentFarm/atom/Badge/TimeBadge";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import Pic from "@ComponentFarm/atom/icons/Pic";
import SkeletonTh from "@ComponentFarm/atom/Skeleton/SkeletonTh";
import ToggleSort from "@ComponentFarm/atom/Sort/ToggleSort";
import { Table, TableWrap } from "@ComponentFarm/common";
import { QueryParams } from "HookFarm/useQueryParams";
import useSortable from "HookFarm/useSortable";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";

interface TableProps {
  isLoading: boolean;
  data?: IManufacturingListRes;
  params: QueryParams;
  updateParams: (newParams: QueryParams) => void;
}

const pageSty = css`
  th,
  td {
    &:not(&:first-of-type),
    &:not(&:nth-of-type(1)) {
      padding-left: 0 !important;
      text-align: center;
    }

    &:first-of-type,
    &:nth-of-type(2) {
      text-align: left;
    }
  }
  .wrap_product_name {
    display: flex;
    align-items: center;
    .thumb {
      height: 7.4rem;
      padding: 0 2rem;
      border-radius: 0.8rem;
      img {
        height: 100%;
        border-radius: 0.8rem;
      }
    }
    .txt_product_name {
      padding: 0 2.4rem;
    }
  }
`;

const AisttListTable = ({
  isLoading,
  data,
  params,
  updateParams,
}: TableProps) => {
  const router = useRouter();
  const { sortState, toggleSort } = useSortable(updateParams);

  const handleGoIdxClick = (idx: string) => {
    // 현재 쿼리 파라미터를 /add 경로에 추가
    router.push({
      pathname: `/aistt-state/view/${idx}`,
      query: router.query,
    });
  };

  const Th = [
    { id: 1, label: "NO.", sort: "inspection_info_idx" },
    { id: 2, label: "제품명", sort: "" },
    { id: 3, label: "매장명", sort: "" },
    { id: 4, label: "종합 점수", sort: "converted_score" },
    { id: 5, label: "개선 필요요인", sort: "poor_count" },
    { id: 6, label: "감점요인 수", sort: "average_count" },
    { id: 7, label: "제조 시간", sort: "manufacture_since_time" },
    { id: 8, label: "제조 일자", sort: "manufacture_dt" },
  ];

  return (
    <TableWrap>
      <Table className="basic" css={pageSty}>
        <colgroup>
          {[120, 462, 200, 160, 160, 160, 120, 154].map((el, i) => (
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
            <SkeletonTh colLength={13} />
          ) : data?.list.length === 0 ? (
            <tr>
              <td colSpan={10} rowSpan={10}>
                <Empty Icon={<IoAlertCircleOutline size={42} />} />
              </td>
            </tr>
          ) : (
            data?.list.map((item, i: number) => (
              <tr
                key={item.inspection_info_idx}
                onClick={() =>
                  handleGoIdxClick(String(item.inspection_info_idx))
                }
              >
                <td className="code">
                  <Link
                    href={{
                      pathname: `/item/view/${item.inspection_info_idx}`,
                      query: router.query,
                    }}
                  >
                    {item.inspection_info_idx}
                  </Link>
                </td>
                <td>
                  <div className="wrap_product_name">
                    <div className="thumb">
                      {item.inspection_image_url ? (
                        <img
                          src={item.inspection_image_url}
                          alt={item.product_info_name}
                        />
                      ) : (
                        <Pic size={25} />
                      )}
                    </div>
                    <div className="txt_product_name">
                      {item.product_info_name}
                    </div>
                  </div>
                </td>
                <td>{item.store_name}</td>
                <td>{item.converted_score.toFixed(2)}점</td>
                <td>{item.poor_count}건</td>
                <td>{item.average_count}건</td>
                <td>
                  <TimeBadge time={item.manufacture_since_time} />
                </td>
                <td>{dayjs(item.manufacture_dt).format("YYYY-MM-DD")}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </TableWrap>
  );
};

export default AisttListTable;
