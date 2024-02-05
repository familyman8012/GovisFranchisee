import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import styled from "@emotion/styled";
import { fetchDetailState } from "ApiFarm/aistt";
import { IAisttStateReq } from "InterfaceFarm/aistt";
import { Button } from "@ComponentFarm/atom/Button/Button";
import { Tabs } from "@ComponentFarm/atom/Tab/Tab";
import TitleArea from "@ComponentFarm/layout/TitleArea";
import {
  aisttDetailInfo,
  aisttStateListTabData,
} from "@ComponentFarm/template/aistt/const";
import { ImprovementNeedCause } from "@ComponentFarm/template/aistt/state/detail/ImprovementNeedCause";
import { SummaryInfoTable } from "@ComponentFarm/template/aistt/state/detail/SummaryInfoTable";
import StateInfoBox from "@ComponentFarm/template/common/StateInfoBox";
import SubTitleBox from "@ComponentFarm/template/common/SubTitleBox";
import Layout from "ComponentsFarm/layouts";
import { InfoArea } from "@ComponentFarm/template/aistt/common/style";
import { css } from "@emotion/react";
import Skeleton from "react-loading-skeleton";

export const DetailInfoWrap = styled.div`
  padding: 0 2rem;
`;

export const Detail = () => {
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const { product_info_idx, ...rest } = router.query;
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const hanldeTabMove = (index: number) => {
    setActiveTabIndex(index);
    router.push(aisttStateListTabData[index].url);
  };

  const { isLoading, data } = useQuery(
    ["aisttState-detailInfo", { product_info_idx, ...rest }],
    () =>
      fetchDetailState({
        product_info_idx: product_info_idx && product_info_idx,
        ...rest,
      } as IAisttStateReq),
    { enabled: !!product_info_idx }
  );

  const totalFrequencyCount = useMemo(
    () =>
      data?.improvement_needed.reduce((total, item) => {
        return total + item.frequency_count;
      }, 0),
    [data?.improvement_needed]
  );

  return (
    <Layout
      css={css`
        padding-bottom: 56px;
        @media (min-width: 768px) and (max-width: 1200px) {
          max-width: 100%;
        }
      `}
    >
      <DetailInfoWrap>
        <SubTitleBox type="fst" title="내역" hideUnderline />
        <SummaryInfoTable isLoading={isLoading} data={data} />
        <SubTitleBox title="지표 하이라이트" hideUnderline />
        <InfoArea
          css={css`
            grid-template-columns: repeat(2, 1fr);
          `}
        >
          <dl>
            <dt>총 제조 수</dt>
            <dd>
              <span className="num">
                {data?.highlight.manufacturing_count ?? (
                  <span className="box_skeleton">
                    <Skeleton baseColor="#fcfcfc" />
                  </span>
                )}
              </span>
              <span className="txt">건</span>
            </dd>
          </dl>
          <dl>
            <dt>평균 제조 점수</dt>
            <dd>
              <span className="num">
                {data?.highlight.converted_score_avarage ?? (
                  <span className="box_skeleton">
                    <Skeleton baseColor="#fcfcfc" />
                  </span>
                )}
              </span>
              <span className="txt">점</span>
            </dd>
          </dl>
        </InfoArea>
        <SubTitleBox
          title={`주요 개선 필요 요인`}
          hideUnderline
          addText={
            <dl className="add_text">
              <dt>총 </dt>
              <dd>{` ${totalFrequencyCount ?? "-"}`}</dd>
            </dl>
          }
        />
        <ImprovementNeedCause isLoading={isLoading} data={data} />
        {/* <SubTitleBox
          title="리포트"
          desc="조회기간 : 2023.10.06 - 2023.10.07"
          hideUnderline
        />
        <ReportTable isLoading={isLoading} data={data?.report} /> */}
      </DetailInfoWrap>
    </Layout>
  );
};

export default Detail;
