import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { fetchManufacturingInfo } from "ApiFarm/aistt";
import { Button } from "@ComponentFarm/atom/Button/Button";
import { Tabs } from "@ComponentFarm/atom/Tab/Tab";
import TitleArea from "@ComponentFarm/layout/TitleArea";
import AnalysisView from "@ComponentFarm/template/aistt/analysis/AnalysisView";

import { useGoMove } from "HookFarm/useGoMove";
import Layout from "ComponentsFarm/layouts";

const AisttStateAnalysisViewPage = () => {
  const { onMove } = useGoMove();

  const router = useRouter();
  const id = useMemo(
    () => (router.query.inspection_info_idx as string) ?? "",
    [router.isReady]
  );

  const { data, isLoading, isError } = useQuery(
    ["fqs-state-analysis-view", id],
    () => fetchManufacturingInfo(Number(id)),
    {
      enabled: router.isReady,
    }
  );

  useEffect(() => {
    if (isError) {
      onMove("/aistt-state/list");
    }
  }, [isError]);

  return (
    <Layout>
      <Tabs
        id="aistt-state-view"
        tabs={[{ title: "제품 제조 상세" }]}
        activeTabIndex={0}
        onTabChange={() => {}}
      />
      <AnalysisView
        loading={isLoading || !router.isReady}
        inspectionId={id}
        data={data}
      />
    </Layout>
  );
};

export default AisttStateAnalysisViewPage;
