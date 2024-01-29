/* eslint-disable no-unused-vars */
import { useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import {
  fetchManufacturingQuality,
  fetchManufacturingTime,
} from "ApiFarm/aistt";
import { IAisttStateReq } from "InterfaceFarm/aistt";
import { Tabs } from "@ComponentFarm/atom/Tab/Tab";

import { aisttStateListTabData } from "@ComponentFarm/template/aistt/const";
import { PizzaStatusTable } from "@ComponentFarm/template/aistt/state/quality/PizzaStatusTable";
import FilterTableForm from "@ComponentFarm/template/common/FilterTable/FilterTableForm";
import SubTitleBox from "@ComponentFarm/template/common/SubTitleBox";
import useQueryParams from "HookFarm/useQueryParams";
import Layout from "ComponentsFarm/layouts";
import { ContentArea } from "@ComponentFarm/common";
import { AreaManufacturingQuality } from "@ComponentFarm/template/aistt/common/style";
import { ManufacturingQualityList } from "@ComponentFarm/template/aistt/common/ManufacturingQuality";
import { css } from "@emotion/react";

const AisttQualityState = () => {
  const router = useRouter();
  const [activeTabIndex, setActiveTabIndex] = useState(1);
  const [params, updateParams, resetParams] = useQueryParams({
    search_start_dt: dayjs().format("YYYY-MM-DD"),
    search_end_dt: dayjs().format("YYYY-MM-DD"),
  });

  const { score_range, ...rest } = router.query;

  const hanldeTabMove = (index: number) => {
    setActiveTabIndex(index);
    router.push(aisttStateListTabData[index].url);
  };

  const { data: manufacturingQualityData } = useQuery(
    ["manufacturingQualityList", rest],
    () => fetchManufacturingQuality(params as IAisttStateReq)
  );

  return (
    <Layout
      css={css`
        @media (min-width: 768px) and (max-width: 1200px) {
          max-width: 100%;
        }
      `}
    >
      <ContentArea>
        <Tabs
          id="tab_aistt_quality"
          tabs={aisttStateListTabData}
          activeTabIndex={activeTabIndex}
          onTabChange={(index) => hanldeTabMove(index)}
        />
        <SubTitleBox type="fst" title="전체 현황" />
        <FilterTableForm
          params={params}
          updateParams={updateParams}
          resetParams={resetParams}
        />
        <SubTitleBox title="점수대 별 제조 현황" hideUnderline />
        <AreaManufacturingQuality>
          <ManufacturingQualityList
            type="state"
            params={params}
            updateParams={updateParams}
            data={manufacturingQualityData?.list}
          />
        </AreaManufacturingQuality>
        <SubTitleBox title="피자 종류 별 현황" hideUnderline />
        <PizzaStatusTable params={params} />
      </ContentArea>
    </Layout>
  );
};

export default AisttQualityState;
