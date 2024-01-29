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
import { Table, TableWrap, mq } from "@ComponentFarm/common";
import { QueryParams } from "HookFarm/useQueryParams";
import useSortable from "HookFarm/useSortable";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";
import { MobileTableSty } from "../../common/style";
import styled from "@emotion/styled";

interface TableProps {
  isLoading: boolean;
  data?: IManufacturingListRes;
  params: QueryParams;
  updateParams: (newParams: QueryParams) => void;
}

const pageSty = css`
  th,
  td {
    &:not(&:nth-of-type(1)) {
      padding-left: 0;
      text-align: center;
    }

    &:first-of-type,
    &:nth-of-type(2) {
      text-align: left;
    }
  }
  .inner {
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
    .box_rank {
      display: none;
    }
    .txt_product_info {
      padding: 0 2.4rem;
      text-align: left;
      .product_name {
        display: block;
        margin-bottom: 0.8rem;
        color: var(--color-blue60);
        font-size: 1.4rem;
        font-weight: 00;
        text-decoration-line: underline;
      }
      .category {
        color: var(--color-neutral50);
        font-size: 1.2rem;
        font-weight: 400;
      }
    }
  }

  ${MobileTableSty}
`;

export const AreaTable = styled.div`
  overflow: hidden;
  border: 1px solid var(--color-neutral90);
  border-radius: 0.6rem;

  ${mq[0]} {
    border: none;
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
    { id: 3, label: "종합 점수", sort: "converted_score" },
    { id: 4, label: "개선 필요요인", sort: "poor_count" },
    { id: 5, label: "감점요인 수", sort: "average_count" },
    { id: 6, label: "제조 시간", sort: "manufacture_since_time" },
    { id: 7, label: "제조 일자", sort: "manufacture_dt" },
  ];

  return (
    <AreaTable>
      <Table className="basic" css={pageSty}>
        <colgroup>
          {[120, 562, 180, 180, 180, 140, 174].map((el, i) => (
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
                <td className="product_info">
                  <div className="inner">
                    <div className="box_rank">{item.inspection_info_idx}</div>
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
                    <div className="txt_product_info">
                      <div className="product_name">
                        {item.product_info_name}
                      </div>
                      <div className="category">전체</div>
                    </div>
                  </div>
                </td>

                <td>
                  <dl>
                    <dt>종합 점수</dt>
                    <dd>{item.converted_score.toFixed(2)}점</dd>
                  </dl>
                </td>
                <td>
                  <dl>
                    <dt>개선 필요 요인</dt>
                    <dd>{item.poor_count}건</dd>
                  </dl>
                </td>
                <td>
                  <dl>
                    <dt>감점요인 수</dt>
                    <dd>{item.average_count}건</dd>
                  </dl>
                </td>
                <td>
                  <dl>
                    <dt>제조 시간</dt>
                    <dd>
                      <TimeBadge time={item.manufacture_since_time} />
                    </dd>
                  </dl>
                </td>
                <td>
                  <dl>
                    <dt>제조 일자</dt>
                    <dd>{dayjs(item.manufacture_dt).format("YYYY-MM-DD")}</dd>
                  </dl>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </AreaTable>
  );
};

export default AisttListTable;
