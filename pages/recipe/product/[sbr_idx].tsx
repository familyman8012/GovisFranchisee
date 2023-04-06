import Head from "next/head";
import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import dayjs from "dayjs";

import { Calendar } from "@emotion-icons/bootstrap/Calendar";
import { PersonCircle } from "@emotion-icons/bootstrap/PersonCircle";

import style from "StyleFarm/scss/modules/ProductRecipe.module.scss";
import useBack from "HookFarm/useBack";

import * as RecipeService from "ApiFarm/productRecipe";

import Layout from "ComponentsFarm/layouts";
import HtmlViewer from "ComponentsFarm/elements/HtmlViewer";
import { ListLoading } from "ComponentsFarm/elements/Loading";
import { BoardExplore, BoardExploreItem, BoardViewLabel } from "ComponentsFarm/module/Board";

export default function ProductRecipeView() {
  const router = useRouter();
  const back = useBack({
    passQuery: true,
  });

  const sbr_idx = useMemo(() => parseInt(router.query.sbr_idx as string), [router.query]);

  const { data, isLoading } = useQuery(["product-recipes", sbr_idx], () => RecipeService.fetchProductRecipe(sbr_idx), {
    onError: () => back(),
    enabled: router.isReady,
  });

  const handleChangeId = (changeIdx: number) => router.push(`/recipe/product/${changeIdx}`);

  if (isLoading) {
    return (
      <Layout menuIconType="back" handlerMenuIcon={back}>
        <ListLoading full />
      </Layout>
    );
  }
  return (
    <Layout menuIconType="back" handlerMenuIcon={back}>
      <Head>
        <title>{data?.title} | 레시피 정복 | GOVIS For Franchisee</title>
      </Head>
      <article className={style["product-recipe-detail"]}>
        <h3 className={style["product-recipe-detail__title"]}>{data?.title}</h3>
        <div className={style["product-recipe-detail__info"]}>
          <BoardViewLabel icon={<PersonCircle />}>관리자</BoardViewLabel>
          <div>
            <BoardViewLabel icon={<Calendar />}>{dayjs(data?.created_at).format("YYYY-MM-DD")}</BoardViewLabel>
          </div>
        </div>
        {/* content */}
        <div className={style["product-recipe-detail__content"]}>
          <HtmlViewer html={`${data?.content === undefined ? "" : data?.content}`} />
        </div>
      </article>
      {/* next article & prev article */}
      <BoardExplore>
        <BoardExploreItem
          label="이전"
          id={data?.prev_recipe.prev_idx || 0}
          title={data?.prev_recipe.prev_title || ""}
          onClick={handleChangeId}
        />
        <BoardExploreItem
          label="다음"
          id={data?.next_recipe.next_idx || 0}
          title={data?.next_recipe.next_title || ""}
          onClick={handleChangeId}
        />
      </BoardExplore>
    </Layout>
  );
}
