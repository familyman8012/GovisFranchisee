import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import dayjs from "dayjs";

import style from "StyleFarm/scss/modules/NewsLetter.module.scss";

import { INewsListItem, INewsListRequest } from "InterfaceFarm/NewsLetter";

import * as NewsletterService from "ApiFarm/newsletter";
import { useQueryString } from "HookFarm/useQueryString";

import Layout from "ComponentsFarm/layouts";
import NewsLetterList from "ComponentsFarm/pageComp/newsLetter/NewsLetterList";
import YearChip from "ComponentsFarm/pageComp/newsLetter/YearChip";

const currentYear = dayjs().add(-1, "M").format("YYYY");

/**
 * @TODO
 * 1. Container 대체 컴포넌트
 */
export default function ProductRecipe() {
  const router = useRouter();
  const qs = useMemo(() => new URLSearchParams(router.asPath.split("?")[1]), []);

  const [params, setParams] = useQueryString<INewsListRequest>({
    search_year_category: qs.get("search_year_category") ?? "",
  });

  const categoryQuery = useQuery(
    ["news-letter-categories", params],
    () => NewsletterService.fetchNewsLetterCategories(),
    {
      onSuccess: (data) => {
        if (!params.search_year_category) {
          handleChangeYear(data?.year_category_list?.[0] ?? "");
        }
      },
    }
  );

  const { data, isLoading } = useQuery(
    ["news-letter-list", params],
    ({ queryKey }) => NewsletterService.fetchNewsLetterList(queryKey[1] as INewsListRequest),
    {
      enabled: !!params.search_year_category,
    }
  );

  const handleChangeYear = (search_year_category: string) => {
    setParams({ ...params, search_year_category });
  };

  const handleChangeView = (item: INewsListItem) => {
    router.push({
      pathname: `/news/product/${item.sbnl_idx}`,
      query: router.query,
    });
  };

  return (
    <Layout>
      <div className={`p-0 ${style["news"]}`}>
        <YearChip
          onChangeYear={handleChangeYear}
          years={categoryQuery.data?.year_category_list ?? []}
          initialYear={params.search_year_category}
        />
        <NewsLetterList loading={isLoading} items={data?.list ?? []} onClick={handleChangeView} />
      </div>
    </Layout>
  );
}
