import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { fetchInspectionInfo } from "ApiFarm/aistt";
import { Tabs } from "@ComponentFarm/atom/Tab/Tab";

import AnalysisView from "@ComponentFarm/template/aistt/analysis/AnalysisView";
import { useGoMove } from "HookFarm/useGoMove";
import Layout from "ComponentsFarm/layouts";

const MonitoringAnalysisViewPage = () => {
  const { onMove } = useGoMove();
  const router = useRouter();

  const id = useMemo(() => router.query.id ?? "", [router.isReady]);

  const { data, isLoading, isError } = useQuery(
    ["fqs-analysis-view", id],
    () => fetchInspectionInfo(Number(id)),
    {
      enabled: router.isReady,
    }
  );

  useEffect(() => {
    if (isError) {
      onMove(`/aistt-monitoring`);
    }
  }, [isError]);

  return (
    <Layout>
      <Tabs
        id="aistt-state-view"
        tabs={[
          {
            title: "상세 정보",
          },
        ]}
        activeTabIndex={0}
        onTabChange={() => {}}
      />
      <AnalysisView
        loading={isLoading || !router.isReady}
        data={data}
        onViewOriginVideo={() =>
          router.push({
            pathname: `/aistt-monitoring`,
            search: `?d=${data?.manufacture_dt}`,
          })
        }
      />
    </Layout>
  );
};

export default MonitoringAnalysisViewPage;
