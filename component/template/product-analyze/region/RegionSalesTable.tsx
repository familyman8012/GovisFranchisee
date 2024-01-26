import React from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { css } from "@emotion/react";
import { IProductAnalyzeRes } from "InterfaceFarm/product-analyze";
import { Badge } from "@ComponentFarm/atom/Badge/Badge";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import Arrow2Down from "@ComponentFarm/atom/icons/Arrow2Down";
import Arrow2Up from "@ComponentFarm/atom/icons/Arrow2Up";
import { TableSty1 } from "@ComponentFarm/template/common/table/TableSty";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";

const pageStyle = css`
  td {
    height: 5.6rem;
    padding: 0 1.6rem !important;

    &.comparison_sales_count {
      color: var(--color-gray8);
    }

    &:first-of-type {
      .badge {
        width: 2.42rem;
        height: 2.42rem;
        padding: 0;
        margin-right: 1.6rem;
        justify-content: center;
      }
    }
    .store_name {
      padding-left: 1.6rem;
      font-weight: 600;
    }
  }
`;

const RegionSalesTable = ({ data }: { data?: IProductAnalyzeRes }) => {
  return (
    <TableSty1 css={pageStyle}>
      <colgroup>
        {[507, 343, 343, 343].map((el, i) => (
          <col key={i} width={getTableWidthPercentage(el, 1536)} />
        ))}
      </colgroup>
      <thead>
        <tr>
          <th scope="col">지역명</th>
          <th scope="col">기준일 판매</th>
          <th scope="col">비교일 판매</th>
          <th scope="col">증감율</th>
        </tr>
      </thead>
      <tbody>
        {data?.list.length === 0 ? (
          <tr>
            <td colSpan={4}>
              <Empty Icon={<IoAlertCircleOutline size={42} />}>
                해당 조회 조건의 제품 판매 현황 데이터가 없습니다.
              </Empty>
            </td>
          </tr>
        ) : (
          data?.list.map((el, i) => (
            <tr key={i}>
              <td>
                <Badge
                  color={i > 3 ? "gray" : "indigo"}
                  size="circle"
                  hasBorder={false}
                >
                  {i + 1}
                </Badge>
                <span className="store_name"> {el.item_label}</span>
              </td>
              <td>{el.base_sales_count.toLocaleString()}</td>
              <td className="comparison_sales_count">
                {el.comparison_sales_count.toLocaleString()}
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
    </TableSty1>
  );
};

export default RegionSalesTable;
