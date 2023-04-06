import React, { useMemo } from "react";
import Head from "next/head";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

import style from "StyleFarm/scss/modules/ProductRecipe.module.scss";

import {
  IProduceRecipeListItem,
  IProductRecipeListRequest,
  IProductRecipeListResponse,
} from "InterfaceFarm/ProductRecipe";
import * as ProductRecipeService from "ApiFarm/productRecipe";
import { useQueryString } from "HookFarm/useQueryString";

import Layout from "ComponentsFarm/layouts";
import ProductRecipeListHeader from "ComponentsFarm/pageComp/productRecipe/ProductRecipeListHeader";
import ProductRecipeList from "ComponentsFarm/pageComp/productRecipe/ProductRecipeList";

export default function ProductRecipe() {
  const router = useRouter();

  const qs = useMemo(() => new URLSearchParams(router.asPath.split("?")[1]), []);

  const [params, setParams] = useQueryString<IProductRecipeListRequest>({
    search_product_category: parseInt(qs.get("search_product_category") ?? "0"),
  });

  const { data, isLoading } = useQuery<IProductRecipeListResponse>(
    ["product-recipes", params],
    ProductRecipeService.fetchProductRecipeList.bind(null, params)
  );

  const handleClick = (item: IProduceRecipeListItem) => {
    router.push({
      pathname: `/recipe/product/${item.sbr_idx}`,
      query: router.query,
    });
  };

  const handleChangeProduct = (search_product_category: number) => setParams({ search_product_category });

  return (
    <Layout>
      <Head>
        <title>레시피 정복 | GOVIS For Franchisee</title>
      </Head>
      <div className={`p-0 ${style["product-recipe"]}`}>
        <ProductRecipeListHeader
          initialProduct={params.search_product_category}
          onChangeProduct={handleChangeProduct}
        />
        <ProductRecipeList loading={isLoading} items={data?.list ?? []} onClick={handleClick} />
      </div>
    </Layout>
  );
}
