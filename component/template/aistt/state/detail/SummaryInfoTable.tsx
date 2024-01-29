import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import { IDetailStateRes } from "InterfaceFarm/aistt";
import styled from "@emotion/styled";
import { mq } from "@ComponentFarm/common";

const PizzaInfo = styled.dl`
  overflow: hidden;
  display: flex;
  align-items: center;
  width: 100%;
  height: 6.8rem;
  border: 1px solid var(--color-gray6);
  border-radius: 0.8rem;

  dt,
  dd {
    display: flex;
    height: 100%;
    align-items: center;
  }

  dt {
    width: 12rem;
    justify-content: center;
    border-right: 1px solid var(--color-gray6);
  }

  dd {
    width: calc(100% - 12rem);
    padding: 0 2.4rem;
    font-size: 1.6rem;
    font-weight: 600;
    background: #fff;

    .link_list {
      display: flex;
      height: 4.4rem;
      margin-left: 3.2rem;
      padding: 1.2rem 1.6rem;
      justify-content: center;
      align-items: center;
      color: var(--color-orange60);
      font-size: 1.4rem;
      font-weight: 500;
      border-radius: 0.4rem;
      border: 1px solid var(--color-orange60);
    }
  }

  .skeleton_area {
    display: flex;
    align-items: center;
    width: 100%;

    > span {
      width: 12.8rem;
    }
  }

  ${mq[0]} {
    dt {
      width: 5.5rem;
    }
    dd {
      width: calc(100% - 5.5rem);
      padding: 0.8rem;
      .skeleton_area {
        .link_list {
          width: 8.6rem;
          margin-left: auto;
          padding: 1.2rem 1.6rem;
        }

        .product_name {
          width: calc(100% - 8.6rem);
        }
      }
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
    <PizzaInfo>
      <dt className="tit">피자명</dt>
      <dd>
        <div className="skeleton_area">
          {isLoading ? (
            <Skeleton baseColor="#fcfcfc" />
          ) : (
            data && (
              <>
                <strong className="product_name">
                  {data?.info.product_name}
                </strong>
                <Link
                  href={{
                    pathname: `/aistt-state/list`,
                    query: router.query,
                  }}
                >
                  <a className="link_list">제조 목록</a>
                </Link>
              </>
            )
          )}
        </div>
      </dd>
    </PizzaInfo>
  );
};
