import React from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { IProductAnalyzeRes } from "InterfaceFarm/product-analyze";
import { Badge } from "@ComponentFarm/atom/Badge/Badge";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import Arrow2Down from "@ComponentFarm/atom/icons/Arrow2Down";
import Arrow2Up from "@ComponentFarm/atom/icons/Arrow2Up";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";

export const ProductSalesTableWrap = styled.table`
  width: 100%;

  th,
  td {
    &:first-of-type {
      padding: 0 2.4rem;
      text-align: left;
    }
  }

  th {
    height: 4.8rem;
    padding: 0 2.4rem;
    color: var(--color-gray500);
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 1.8rem;
    letter-spacing: 0.042rem;
    border-top: 1px solid var(--color-neutral90);
    border-bottom: 1px solid var(--color-neutral90);
    background: #f7f9fc;
  }
  td {
    height: 7rem;
    text-align: center;
    border-bottom: 1px solid var(--color-neutral90);
  }
`;

export const ProductSalesTable = ({
  chartData,
  format,
  viewType,
  isLoading,
}: {
  chartData?: IProductAnalyzeRes;
  format: (formValue: string, type?: string) => string;
  viewType: string;
  isLoading?: boolean;
}) => {
  interface IthType {
    [key: string]: string;
  }

  const thType: IthType = {
    hourly: "시간",
    daily: "일",
    weekly: "요일",
    monthly: "월",
  };

  if (isLoading) {
    return <Skeleton height="40rem" baseColor="#fcfcfc" />;
  }

  return (
    <ProductSalesTableWrap>
      <colgroup>
        <col width={getTableWidthPercentage(510, 1536)} />
        <col width={getTableWidthPercentage(342, 1536)} />
        <col width={getTableWidthPercentage(342, 1536)} />
        <col width={getTableWidthPercentage(342, 1536)} />
      </colgroup>
      <thead>
        <tr>
          <th>{thType[viewType]}</th>
          <th>기준일</th>
          <th>비교일</th>
          <th>증감율</th>
        </tr>
      </thead>
      <tbody>
        {chartData?.total.total_base_sales_count === 0 &&
        chartData.total.total_comparison_sales_count === 0 ? (
          <tr>
            <td colSpan={4}>
              <Empty Icon={<IoAlertCircleOutline size={42} />}>
                해당 조회 조건의 제품 판매 수 데이터가 없습니다.
              </Empty>
            </td>
          </tr>
        ) : (
          chartData?.list.map((el, i: number) => (
            <tr key={el.item_label}>
              <td>{format(el.item_label)}</td>
              <td>
                {el.base_sales_count.toLocaleString()}

                {el.base_included_days && (
                  <div
                    css={css`
                      margin-top: 0.5rem;
                      color: #ababab;
                      font-size: 1.2rem;
                    `}
                  >
                    (포함일:{el.base_included_days}일)
                  </div>
                )}
              </td>
              <td>
                {el.comparison_sales_count.toLocaleString()}
                {el.comparison_included_days && (
                  <div
                    css={css`
                      margin: 0.5rem 0 0 0;
                      color: #ababab;
                      font-size: 1.2rem;
                    `}
                  >
                    (포함일:{el.comparison_included_days}일)
                  </div>
                )}
              </td>
              <td>
                <Badge
                  type="square"
                  color={
                    el.increase_decrease_rate > 0
                      ? "green"
                      : el.increase_decrease_rate < 0
                      ? "red"
                      : "yellow"
                  }
                  LeadingIcon={
                    el.increase_decrease_rate > 0 ? (
                      <Arrow2Up
                        customCss={css`
                          path {
                            fill: var(--bage-greenLabel);
                          }
                        `}
                      />
                    ) : el.increase_decrease_rate < 0 ? (
                      <Arrow2Down
                        customCss={css`
                          path {
                            fill: var(--bage-redLabel);
                          }
                        `}
                      />
                    ) : (
                      <></>
                    )
                  }
                >
                  {String(
                    Math.ceil(el.increase_decrease_rate).toLocaleString()
                  ).replace("-", "")}
                  %
                </Badge>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </ProductSalesTableWrap>
  );
};
