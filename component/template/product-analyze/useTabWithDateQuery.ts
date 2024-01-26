import { useState } from "react";
import { useRouter } from "next/router";
import { QueryParams } from "HookFarm/useQueryParams";

const useTabWithDateQuery = ({
  tabIdx,
  params,
  productAnalyzeTabData,
}: {
  tabIdx: number;
  params: QueryParams;
  productAnalyzeTabData: {
    title: string;
    url: string;
  }[];
}) => {
  const router = useRouter();
  const [activeTabIndex, setActiveTabIndex] = useState(tabIdx);

  const handleTabWithDateQuery = (index: number) => {
    setActiveTabIndex(index);

    const dateParams: { [key: string]: string | undefined } = {};
    [
      "base_dt_start",
      "base_dt_finish",
      "comparison_dt_start",
      "comparison_dt_finish",
    ].forEach((param) => {
      if (params[param]) {
        dateParams[param] = String(params[param]);
      }
    });

    // 새 탭으로 이동할 때 날짜 파라미터를 URL에 포함합니다.
    router.push({
      pathname: productAnalyzeTabData[index].url,
      query: dateParams,
    });
  };

  return { activeTabIndex, handleTabWithDateQuery };
};

export default useTabWithDateQuery;
