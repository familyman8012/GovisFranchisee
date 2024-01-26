import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import { css } from "@emotion/react";
import { IDetailStateRes } from "InterfaceFarm/aistt";
import { TableSty3 } from "@ComponentFarm/template/common/table/TableSty";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";

const pageSty = css`
  width: 100%;
  tr:nth-of-type(3) {
    td {
      padding: 1.2rem 2.4rem;
    }
  }

  .skeleton_area {
    display: flex;
    align-items: center;

    > span {
      width: 12.8rem;
    }
  }

  table {
    width: 100%;
  }

  .link_list {
    dvisplay: flex;
    height: 4.4rem;
    margin-left: 1.6rem;
    padding: 1.2rem 1.6rem;
    justify-content: center;
    align-items: center;
    color: var(--color-blue60);
    font-weight: 500;
    border-radius: 0.4rem;
    border: 1px solid var(--color-blue60, #171c8f);
  }
  .total_count {
    display: flex;
    align-items: center;
    line-height: 4rem;

    strong {
      margin: 0 0.5rem;
      color: var(--color-red50);
      font-weight: 600;
    }
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
`;

export const SummaryInfoTable = ({
  isLoading,
  data,
}: {
  isLoading?: boolean;
  data?: IDetailStateRes;
}) => {
  const router = useRouter();

  return (
    <TableSty3 css={pageSty}>
      <colgroup>
        {[120, 1416].map((el, i) => (
          <col key={i} width={getTableWidthPercentage(el)} />
        ))}
      </colgroup>
      <tbody>
        <tr>
          <th scope="row">피자명</th>
          <td>
            <div className="skeleton_area">
              {isLoading ? (
                <Skeleton baseColor="#fcfcfc" />
              ) : (
                data && (
                  <>
                    {data?.info.product_name}
                    <Link
                      href={{
                        pathname: `/aistt-state/list`,
                        query: router.query,
                      }}
                    >
                      <a className="link_list">목록 상세 조회</a>
                    </Link>
                  </>
                )
              )}
            </div>
          </td>
        </tr>
        <tr>
          <th scope="row">매장 분류</th>
          <td>
            <div className="skeleton_area">
              {isLoading ? (
                <Skeleton baseColor="#fcfcfc" />
              ) : (
                data?.info.store_name_list
              )}
            </div>
          </td>
        </tr>
        {/* <tr>
          <th scope="row">개선 필요</th>
          <td>
            <div className="total_count">
              총
              <strong>
                {isLoading ? (
                  <Skeleton width={50} baseColor="#fcfcfc" />
                ) : (
                  totalFrequencyCount
                )}
              </strong>
              건
            </div>
            <table className="table_summary">
              <thead>
                <tr>
                  <th scope="col">주요 요인</th>
                  <th>개선 필요 건수</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <SkeletonTh colLength={2} rowLength={6} />
                ) : (
                  data?.improvement_needed.map((el, i) => (
                    <tr key={i}>
                      <td>{el.column_name}</td>
                      <td>{el.frequency_count}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </td>
        </tr> */}
      </tbody>
    </TableSty3>
  );
};
