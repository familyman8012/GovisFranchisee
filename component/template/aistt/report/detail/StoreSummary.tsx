import React from "react";
import styled from "@emotion/styled";
import { IReportTotalStoreSummary } from "InterfaceFarm/aistt";

export const StoreSummaryWrap = styled.div`
  display: flex;
  .box {
    display: flex;
    width: calc(50% - 1.6rem);
    margin-bottom: 0.8rem;
    padding: 2.4rem;
    color: var(--color-neutral20, #2e2e2e);
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 110%;
    background: var(--color-blue85);

    &:last-of-type {
      margin-left: auto;
    }

    .txt {
      margin-left: auto;
    }
  }
`;

export const StoreSummary = ({ data }: { data?: IReportTotalStoreSummary }) => {
  return (
    <StoreSummaryWrap>
      <div className="box">
        <span className="title">매장</span>
        <span className="txt">{data?.store_count}개</span>
      </div>
      <div className="box">
        <span className="title">제품 제조 수</span>
        <span className="txt">{data?.inspection_count}개</span>
      </div>
    </StoreSummaryWrap>
  );
};
