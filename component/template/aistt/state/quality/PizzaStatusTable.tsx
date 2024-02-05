import React from "react";
import Link from "next/link";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useQuery } from "react-query";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { fetchPizzaStatus } from "ApiFarm/aistt";
import { IAisttStateReq, IPizzaStatusRes } from "InterfaceFarm/aistt";
import { TimeBadge } from "@ComponentFarm/atom/Badge/TimeBadge";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import { Pic } from "@ComponentFarm/atom/icons";
import Verified from "@ComponentFarm/atom/icons/Verified";
import SkeletonTh from "@ComponentFarm/atom/Skeleton/SkeletonTh";
import { TableSty1 } from "@ComponentFarm/template/common/table/TableSty";
import { QueryParams } from "HookFarm/useQueryParams";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";
import { mq } from "@ComponentFarm/common";
import { InfoArea, MobileTableSty } from "../../common/style";
import Skeleton from "react-loading-skeleton";

const PizzaStatusTableWrap = styled.div`
  width: 100%;
  .area_table {
    overflow: hidden;
    border: 1px solid var(--color-neutral90);
    border-radius: 0.6rem;

    ${mq[0]} {
      border: none;
    }
  }
`;

const tablePageSty = css`
  th {
    border-top: none;
    background: var(--color-blue_gray10);
  }

  tbody tr:last-of-type {
    td {
      border-bottom: none;
    }
  }

  td {
    background: #fff;

    dt {
      display: none;
    }
  }
  th,
  td {
    &:nth-of-type(1) {
      padding: 0;
      text-align: center;
    }
  }

  th:nth-of-type(2) {
    text-align: left;
  }
  td {
    height: 15.2rem;
  }

  td:not(.product_info),
  td:not(.product_info) {
    font-size: 1.6rem;
    font-weight: 600;
  }

  .num {
    color: var(--color-neutral50);
    .box_rank {
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        path:first-of-type {
          fill: var(--color-blue60);
        }
      }
    }
  }
  .product_info {
    text-align: left;
    .inner {
      display: flex;
      align-items: center;

      .box_rank {
        display: none;
      }
      .thumb {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        width: 17rem;
        height: 12.8rem;
        margin: 0 2rem;
        border-radius: 0.8rem;
        background: #f3f2f2;

        img {
          width: 100%;
        }
      }
      .txt_product_info {
        padding: 0 2.4rem;
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
  }
  .count,
  .score,
  .need {
    color: var(--color-neutral10);
  }
  ${MobileTableSty}
`;

export const PizzaStatusTable = ({
  data,
  params,
}: {
  data?: IPizzaStatusRes;
  params: QueryParams;
}) => {
  // eslint-disable-next-line no-unused-vars
  const { product_info_idx, ...rest } = params;

  return (
    <PizzaStatusTableWrap>
      <InfoArea>
        <dl>
          <dt>평균 점수</dt>
          <dd>
            {data?.summary.converted_score_avarage_total ?? (
              <span className="box_skeleton">
                <Skeleton baseColor="#fcfcfc" />
              </span>
            )}
          </dd>
        </dl>
        <dl className="center">
          <dt>총 메뉴 수</dt>
          <dd>
            {data?.summary.product_count ?? (
              <span className="box_skeleton">
                <Skeleton baseColor="#fcfcfc" />
              </span>
            )}
          </dd>
        </dl>
        <dl>
          <dt>총 제조 수</dt>
          <dd>
            {data?.summary.manufacturing_count_total.toLocaleString() ?? (
              <span className="box_skeleton">
                <Skeleton baseColor="#fcfcfc" />
              </span>
            )}
          </dd>
        </dl>
      </InfoArea>
      <div className="area_table">
        <TableSty1 css={tablePageSty}>
          <colgroup>
            {[96, 668, 181, 181, 181, 181].map((size, i) => (
              <col key={i} width={getTableWidthPercentage(size)} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th>순위</th>
              <th>제품명</th>
              <th>평균 제조 점수</th>
              <th>평균 제조 시간</th>
              <th>총 제조건수</th>

              <th>개선 필요 피자 수</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data?.list.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <Empty Icon={<IoAlertCircleOutline size={42} />}>
                      해당 조회 조건의 피자별 현황 데이터가 없습니다.
                    </Empty>
                  </td>
                </tr>
              ) : (
                data?.list.map((item, i) => (
                  <tr key={item.product_info_idx}>
                    <td className="num">
                      <div className="box_rank">
                        {i < 9 ? `0${i + 1}` : i + 1}
                      </div>
                    </td>
                    <td className="product_info">
                      <div className="inner">
                        <div className="box_rank">
                          {i < 9 ? `0${i + 1}` : i + 1}
                        </div>
                        <div className="thumb">
                          {item.product_image ? (
                            <img
                              src={item.product_image}
                              alt={item.product_name}
                            />
                          ) : (
                            <Pic size={25} />
                          )}
                        </div>
                        <div className="txt_product_info">
                          <Link
                            href={{
                              pathname: `/aistt-state/detail/${item.product_info_idx}`,
                              query: { ...rest },
                            }}
                          >
                            <a className="product_name">{item.product_name}</a>
                          </Link>
                          <div className="category">
                            {item.evi_product_category_str}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="score">
                      <dl>
                        <dt>평균 제조 점수</dt>
                        <dd>{item.converted_score_avarage}점</dd>
                      </dl>
                    </td>
                    <td className="time">
                      <dl>
                        <dt>평균 제조 시간</dt>
                        <dd>
                          <TimeBadge
                            time={item.manufacture_since_time_avarage}
                          />
                        </dd>
                      </dl>
                    </td>
                    <td className="count">
                      <dl>
                        <dt>총 제조건수</dt>
                        <dd>{item.manufacturing_count}건</dd>
                      </dl>
                    </td>
                    <td className="need">
                      <dl>
                        <dt>게선 필요 수</dt>
                        <dd>{item.improvement_needed_count}건</dd>
                      </dl>
                    </td>
                  </tr>
                ))
              )
            ) : (
              <SkeletonTh colLength={6} />
            )}
          </tbody>
        </TableSty1>
      </div>
    </PizzaStatusTableWrap>
  );
};
