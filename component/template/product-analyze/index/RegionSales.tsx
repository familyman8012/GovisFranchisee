import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import { fetchRegionAnalyze } from "ApiFarm/product-analyze-dashboard";
import { AreaBox } from "@ComponentFarm/template/common/AreaBox";
import { QueryParams } from "HookFarm/useQueryParams";
import RegionSalesTable from "../region/RegionSalesTable";

const RegionSales = ({ params }: { params: QueryParams }) => {
  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);

  const { isLoading, data } = useQuery(
    ["regionDashboard", params],
    () => fetchRegionAnalyze(params),
    { enabled: !!params.evi_product_category }
  );

  return (
    <AreaBox title="지역별 제품 판매 현황" className="noPadding">
      {winReady && isLoading ? (
        <Skeleton height="30rem" baseColor="#fcfcfc" />
      ) : (
        <RegionSalesTable data={data} />
      )}
    </AreaBox>
  );
};

export default RegionSales;
