import React, { useState } from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { fetchStoreRankingAnalyze } from "ApiFarm/product-analyze-dashboard";
import { IStoreAnalyzeReq } from "InterfaceFarm/product-analyze";
import { Button } from "@ComponentFarm/atom/Button/Button";
import { AreaBoxWrap } from "@ComponentFarm/template/common/AreaBox";
import { QueryParams } from "HookFarm/useQueryParams";
import { dateParams } from "./moreLinkDateParams";
import StoreSalesTable from "../store/StoreSalesTable";

const SelectStoreType = styled.div`
  margin: 0 2.4rem 0 auto;

  button {
    min-width: auto;
    width: 6.9rem;
  }
`;

const StoreSales = ({ params }: { params: QueryParams }) => {
  const [selectStoreType, setSelectStoreType] = useState("direct");
  const { data: rankingData } = useQuery(
    ["StoreRankingAnalyze-Dashboard", params],
    () =>
      fetchStoreRankingAnalyze({
        ...params,
        ranking_limit_number: 8,
      } as IStoreAnalyzeReq),
    { enabled: !!params.evi_product_category }
  );

  return (
    <AreaBoxWrap
      className="areaBox"
      css={css`
        h2 {
          a {
            display: flex;
            align-items: center;
            &:after {
              display: block;
              content: "";
              width: 1.6rem;
              height: 1.6rem;
              background: url("/images/common/arrow_right.svg") no-repeat left
                center/1.6rem;
            }
          }
        }
      `}
    >
      <div className="box_head">
        <div className="head">
          <h2>
            <Link
              href={`/product-analyze/store${
                params.base_dt_start ? `?${dateParams(params)}` : ""
              }`}
              className="txt_title"
            >
              매장별 제품 판매 현황
            </Link>
          </h2>
          <SelectStoreType
            css={css`
              margin-right: 0;
            `}
          >
            {["direct", "franchisee"].map((el) => (
              <Button
                key={el}
                variant={selectStoreType === el ? "primary" : "transparent"}
                onClick={() => setSelectStoreType(el)}
              >
                {el === "direct" ? "직영점" : "가맹점"}
              </Button>
            ))}
          </SelectStoreType>
        </div>
      </div>

      {rankingData ? (
        <StoreSalesTable
          rankingData={
            selectStoreType === "direct"
              ? rankingData?.direct_store_list
              : rankingData?.franchisee_store_list
          }
        />
      ) : (
        <Skeleton height={497} baseColor="#fcfcfc" />
      )}
    </AreaBoxWrap>
  );
};

export default StoreSales;
