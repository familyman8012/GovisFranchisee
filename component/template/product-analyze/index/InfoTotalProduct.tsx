import React from "react";
import { useQuery } from "react-query";
import styled from "@emotion/styled";
import { fetchAllProductInfo } from "ApiFarm/product-analyze-dashboard";
import { Data } from "@ComponentFarm/atom/icons";

const InfoTotalProductWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 4.5rem;
  margin-top: 3.2rem;

  svg path {
    stroke: var(--color-blue70);
  }

  .info_total_product {
    display: flex;
    align-items: center;
    line-height: 120%;
    margin-left: 1.6rem;
    dt {
      margin: 0 1.6rem;
      color: var(--color-blue_gray50);
      font-size: 1.4rem;
      font-style: normal;
      font-weight: 400;

      &:first-of-type {
        margin-left: 0;
      }
    }
    dd {
      min-width: 3rem;
      color: var(--color-neutral10);
      font-size: 1.6rem;
      font-style: normal;
      font-weight: 700;
    }
  }
`;

const InfoTotalProduct = () => {
  const { data } = useQuery(["AllProductInfoAnalyze-Dashboard"], () =>
    fetchAllProductInfo()
  );

  return (
    <InfoTotalProductWrap>
      <Data />
      <dl className="info_total_product">
        <dt>당월 누적 판매 제품</dt>
        <dd>{data?.result.total_base_sales_count.toLocaleString()}</dd>
        <dt>전월 누적 판매 제품</dt>
        <dd>{data?.result.total_comparison_sales_count.toLocaleString()}</dd>
      </dl>
    </InfoTotalProductWrap>
  );
};

export default InfoTotalProduct;
