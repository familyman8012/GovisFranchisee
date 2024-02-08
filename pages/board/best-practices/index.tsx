import Head from "next/head";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import style from "StyleFarm/scss/modules/Practice.module.scss";

import * as PracticeService from "ApiFarm/practice";
import {
  IPracticeListItem,
  IPracticeListRequest,
  IPracticeListReponse,
} from "InterfaceFarm/Practice";

import Layout from "ComponentsFarm/layouts";
import PracticeList from "ComponentsFarm/pageComp/practice/PracticeList";

const PracticePage = () => {
  const router = useRouter();
  const [parmas] = useState<IPracticeListRequest>({
    page: 1,
    size: 9999,
  });

  const { data, isLoading } = useQuery<IPracticeListReponse>(
    "best-practices",
    PracticeService.fetchPracticeList.bind(null, parmas),
    {
      enabled: router.isReady,
    }
  );

  const handleClick = useCallback((item: IPracticeListItem) => {
    router.push({
      pathname: `/board/best-practices/${item.sbs_idx}`,
    });
  }, []);

  return (
    <Layout>
      <Head>
        <title>우리가 불편해야 고객이 만족한다 | GOVIS For Franchisee</title>
      </Head>
      <div className={style["pracice-board"]}>
        <div className="p-0">
          <PracticeList
            loading={isLoading}
            items={data?.list ?? []}
            onClick={handleClick}
          />
        </div>
      </div>
    </Layout>
  );
};

export default PracticePage;
