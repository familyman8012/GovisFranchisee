import { useRouter } from "next/router";
import Head from "next/head";
import React, { useState } from "react";
import { useQuery } from "react-query";

import dayjs from "dayjs";

import { useQueryString } from "HookFarm/useQueryString";
import useSearchParams from "HookFarm/useSearchParams";

import {
  IProductFilter,
  IProductResultFetchParams,
} from "InterfaceFarm/Product";

import * as ProductService from "ApiFarm/product";

import Layout from "ComponentsFarm/layouts";
import { Datepicker } from "ComponentsFarm/elements/Datepicker";
import {
  PageContainer,
  ContentCard,
} from "ComponentsFarm/pageComp/statistics/product/styles";

import ProductBarChart from "ComponentsFarm/pageComp/statistics/product/ProductBarChart";
import ProductViewType from "ComponentsFarm/pageComp/statistics/product/ProductViewType";
import ProductSalesList from "ComponentsFarm/pageComp/statistics/product/ProductSalesList";
import ProductListFilter from "ComponentsFarm/pageComp/statistics/product/ProductListFilter";
import { convertEnv } from "LibFarm/convertEnvironment";

const yesterday = dayjs().add(-1, "day");

export default function ProductStatisticsPage() {
  const qs = useSearchParams();

  const [filterParams, setFilterParams] = useState<IProductFilter>({
    search_product_category: "",
    search_product_name: "",
  });
  const [params, setParams] = useQueryString<IProductResultFetchParams>({
    display_chart_type: qs.get("display_chart_type") ?? "time",
    search_dt_start:
      qs.get("search_dt_start") ?? yesterday.format("YYYY-MM-DD"),
    search_dt_end: qs.get("search_dt_end") ?? yesterday.format("YYYY-MM-DD"),
  });

  // const productChartQuery = useQuery(["product-result-chart", params], () =>
  //   ProductService.fetchProductSaleResult(params)
  // );

  const pizzaChartQuery = useQuery(["pizza-result-chart", params], () =>
    ProductService.fetchPizzaSaleResult(params)
  );

  const productListQuery = useQuery(
    ["product-result-list", params.search_dt_start, params.search_dt_end],
    () =>
      ProductService.fetchProductSaleList({
        search_dt_start: params.search_dt_start,
        search_dt_end: params.search_dt_end,
      })
  );

  const pizzaListQuery = useQuery(
    ["pizza-result-list", params.search_dt_start, params.search_dt_end],
    () =>
      ProductService.fetchPizzaSaleList({
        search_dt_start: params.search_dt_start,
        search_dt_end: params.search_dt_end,
      })
  );

  console.log("pizzaListQuery", pizzaListQuery);

  const handleChangeSearchDate = React.useCallback(
    ([search_dt_start, search_dt_end]: string[]) =>
      setParams({ ...params, search_dt_start, search_dt_end }),
    [params]
  );

  return (
    <Layout>
      <Head>
        <title>제품 실적 | GOVIS for Franchisee</title>
      </Head>
      <PageContainer>
        <Datepicker
          value={[params.search_dt_start, params.search_dt_end]}
          range
          editable={false}
          onChange={handleChangeSearchDate}
        />
        <ContentCard>
          <ProductViewType
            value={params.display_chart_type}
            onChangeView={(display_chart_type) =>
              setParams({ ...params, display_chart_type })
            }
          />
          <ProductBarChart
            data={pizzaChartQuery.data?.list ?? []}
            loading={pizzaChartQuery.isLoading}
            tickWidth={70}
          />
        </ContentCard>
        <ContentCard>
          <ProductListFilter onSubmit={setFilterParams} />
          <ProductSalesList
            filterParams={filterParams}
            loading={pizzaListQuery.isLoading}
            list={pizzaListQuery?.data?.list ?? []}
          />
        </ContentCard>
      </PageContainer>
    </Layout>
  );
}
