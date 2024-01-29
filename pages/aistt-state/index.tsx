/* eslint-disable no-unused-vars */
import { useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { css } from "@emotion/react";
import {
  fetchManufacturingQuality,
  fetchManufacturingTime,
} from "ApiFarm/aistt";
import { IAisttStateReq } from "InterfaceFarm/aistt";
import { Tabs } from "@ComponentFarm/atom/Tab/Tab";

import { aisttStateListTabData } from "@ComponentFarm/template/aistt/const";
import { ImprovementStatusList } from "@ComponentFarm/template/aistt/state/all/ImprovementStatusList";
import { ManufacturingTimeList } from "@ComponentFarm/template/aistt/state/all/ManufacturingTimeList";
import { StoreManufacturingTable } from "@ComponentFarm/template/aistt/state/all/StoreManufacturingTable";
import { AddTab, AreaBox } from "@ComponentFarm/template/common/AreaBox";
import FilterTableForm from "@ComponentFarm/template/common/FilterTable/FilterTableForm";
import SubTitleBox from "@ComponentFarm/template/common/SubTitleBox";
import useQueryParams from "HookFarm/useQueryParams";
import Layout from "ComponentsFarm/layouts";
import styled from "@emotion/styled";
import { AreaManufacturingQuality } from "@ComponentFarm/template/aistt/common/style";
import { ManufacturingQualityList } from "@ComponentFarm/template/aistt/common/ManufacturingQuality";

const AisttState = () => {
  const router = useRouter();
  const [statusSelect, setstatusSelect] = useState(0);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [params, updateParams, resetParams] = useQueryParams({
    search_start_dt: dayjs().format("YYYY-MM-DD"),
    search_end_dt: dayjs().format("YYYY-MM-DD"),
  });

  const hanldeTabMove = (index: number) => {
    setActiveTabIndex(index);
    router.push(aisttStateListTabData[index].url);
  };

  const { data: manufacturingQualityData } = useQuery(
    ["manufacturingQualityList", params],
    () => fetchManufacturingQuality(params as IAisttStateReq)
  );

  const { data: manufacturingTimeData } = useQuery(
    ["manufacturingTimeList", params],
    () => fetchManufacturingTime(params as IAisttStateReq)
  );

  return (
    <Layout>
      <Tabs
        id="tab_aistt_state"
        tabs={aisttStateListTabData}
        activeTabIndex={activeTabIndex}
        onTabChange={(index) => hanldeTabMove(index)}
      />
      <SubTitleBox title="전체 현황" />
      <FilterTableForm
        params={params}
        updateParams={updateParams}
        resetParams={resetParams}
      />
      <SubTitleBox title="확인 필요 피자 현황" hideUnderline />
      <ImprovementStatusList params={params} />
      <SubTitleBox title="점수대별 제조 현황" hideUnderline />
      <AreaManufacturingQuality>
        <ManufacturingQualityList
          type="state"
          params={params}
          updateParams={updateParams}
          data={manufacturingQualityData?.list}
        />
      </AreaManufacturingQuality>
      <SubTitleBox title="피자 종류별 현황" hideUnderline />
      <AreaBox title="매장별 제조 현황" className="noPadding">
        <StoreManufacturingTable params={params} />
      </AreaBox>
    </Layout>
  );
};

export default AisttState;
