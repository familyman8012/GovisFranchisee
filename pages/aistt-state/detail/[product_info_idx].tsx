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
    <Layout>
      <TitleArea
        title="현황"
        BtnBox={
          <Button
            variant="gostSecondary"
            onClick={() =>
              router.push({
                pathname: `/aistt-state/quality`,
                query: rest,
              })
            }
          >
            이전
          </Button>
        }
      />
      <Tabs
        id="aistt-detail"
        tabs={aisttDetailInfo}
        activeTabIndex={activeTabIndex}
        onTabChange={(index) => hanldeTabMove(index)}
      />
      <DetailInfoWrap>
        <SubTitleBox title="내역" hideUnderline />
        <SummaryInfoTable isLoading={isLoading} data={data} />
        <SubTitleBox title="지표 하이라이트" hideUnderline />
        <StateInfoBox
          items={[
            {
              title: "총 제조 수",
              txt1: String(data?.highlight.manufacturing_count),
              txt2: "개",
            },
            {
              title: "평균 제조 점수",
              txt1: String(data?.highlight.converted_score_avarage),
              txt2: "점",
            },
          ]}
        />
        <SubTitleBox
          title={`주요 개선 필요 요인 : 총 ${totalFrequencyCount ?? "-"}건`}
          hideUnderline
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
