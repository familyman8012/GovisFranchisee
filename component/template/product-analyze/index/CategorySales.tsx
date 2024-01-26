import React, { useMemo } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useQuery } from "react-query";
import { css } from "@emotion/react";
import { fetchCategoryAnalyze } from "ApiFarm/product-analyze-dashboard";
import { IProductAnalyzeReq } from "InterfaceFarm/product-analyze";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import { BarCharts } from "@ComponentFarm/chart/BarCharts";
import { AreaBox } from "@ComponentFarm/template/common/AreaBox";
import { QueryParams } from "HookFarm/useQueryParams";
import { dateParams } from "./moreLinkDateParams";

const CategorySales = ({ params }: { params: QueryParams }) => {
  const { data } = useQuery(
    ["CategoryAnalyze-Dashboard", params],
    () => fetchCategoryAnalyze(params as IProductAnalyzeReq),
    { enabled: !!params.evi_product_category }
  );

  const categoryData = useMemo(() => {
    return data?.list.map((el) => {
      // 음수 값을 0으로 설정
      const base_sales_count =
        el.base_sales_count < 0 ? 0 : el.base_sales_count;
      const comparison_sales_count =
        el.comparison_sales_count < 0 ? 0 : el.comparison_sales_count;

      return {
        ...el,
        base_sales_count,
        comparison_sales_count,
        product_name_ko: el.product_name_ko.replace("피자", ""),
      };
    });
  }, [data?.list]);

  const fontSizeCal =
    categoryData && categoryData?.length > 10 ? "12px" : "14px";

  return (
    <AreaBox
      title="카테고리별 제품 판매 현황"
      moreLink={`/product-analyze/category${
        params.base_dt_start ? `?${dateParams(params)}` : ""
      }`}
      css={css`
        margin: 3.2rem 0;
        .recharts-surface {
          tspan {
            font-size: ${fontSizeCal};
            @media (max-width: 1600px) {
              font-size: 9px;
            }
          }
        }
      `}
    >
      {data?.list.length === 0 ? (
        <Empty Icon={<IoAlertCircleOutline size={42} />}>
          해당 조회 조건의 제품 판매 현황 데이터가 없습니다.
        </Empty>
      ) : (
        <BarCharts
          type="diff"
          height="55.7rem"
          xKey="product_name_ko"
          chartData={categoryData}
          barSize={6}
          tickCount={11}
          angle={Number(categoryData?.length) > 12 ? -30 : 0}
          isLegend
          diffSet={[
            { name: "기준일", dataKey: "base_sales_count", fill: "#5A6ACF" },
            {
              name: "비교일",
              dataKey: "comparison_sales_count",
              fill: "#E6E8EC",
            },
          ]}
        />
      )}
    </AreaBox>
  );
};

export default CategorySales;
