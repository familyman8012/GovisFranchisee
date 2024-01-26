import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { fetchInspectionInfo } from "ApiFarm/aistt";
import { Button } from "@ComponentFarm/atom/Button/Button";
import { Tabs } from "@ComponentFarm/atom/Tab/Tab";
import TitleArea from "@ComponentFarm/layout/TitleArea";
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
      onMove(`/aistt-monitoring/${router.query.store_idx}`);
    }
  }, [isError]);

  return (
    <Layout>
      <TitleArea
        title="제품 모니터링"
        BtnBox={
          <Button variant="gostSecondary" onClick={() => router.back()}>
            이전
          </Button>
        }
      />
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
            pathname: `/aistt-monitoring/${data?.store_idx}/videos`,
            search: `?d=${data?.manufacture_dt}`,
          })
        }
      />
    </Layout>
  );
};

export default MonitoringAnalysisViewPage;
