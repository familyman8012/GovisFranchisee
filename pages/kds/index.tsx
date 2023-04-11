import styled from "@emotion/styled";
import {
  fetchOrderAmount,
  fetchOrderList,
  fetchOrderProcess,
} from "ApiFarm/kds";
import { AxiosError, AxiosResponse } from "axios";
import Layout from "ComponentsFarm/layouts";
import DataComponent from "ComponentsFarm/pageComp/kds/DataComponent";
import MultiChart from "ComponentsFarm/pageComp/kds/MultiChart";
import { KdsWrap } from "ComponentsFarm/pageComp/kds/style";
import { ScrollShadow } from "ComponentsFarm/pageComp/statistics/product/styles";
import {
  IOrderAmountRes,
  IOrderListRes,
  IOrderProcessRes,
} from "InterfaceFarm/Kds";
import Head from "next/head";
import React from "react";
import { useQuery } from "react-query";

function KDS() {
  const { data: orderAmountData } = useQuery<
    AxiosResponse<IOrderAmountRes>,
    AxiosError
  >(["orderMount"], () => fetchOrderAmount());

  const { data: orderProcessData, isLoading: orderProcessLoading } = useQuery<
    AxiosResponse<IOrderProcessRes>,
    AxiosError
  >(["orderProcess"], () => fetchOrderProcess());

  const { data: orderListData } = useQuery<
    AxiosResponse<IOrderListRes>,
    AxiosError
  >(["orderList"], () => fetchOrderList(), {
    refetchInterval: 3000,
  });

  return (
    <Layout className="fullWidth">
      <Head>
        <title>실시간 주문 현황 | GOVIS For Franchisee</title>
      </Head>
      <KdsWrap>
        <section className="wrap_info">
          <ul className="box box_sales">
            <li>
              <div>객단가</div>
              <div>{orderAmountData?.data?.unit_amount}원</div>
            </li>
            <li>
              <div>누적 총합</div>
              <div>{orderAmountData?.data?.total_amount}원</div>
            </li>
          </ul>
          {orderProcessData && (
            <MultiChart
              data={orderProcessData?.data}
              loading={orderProcessLoading}
            />
          )}
        </section>
        <section className="box_receipt">
          <div className="item_receipt">
            {orderListData && <DataComponent data={orderListData.data} />}
          </div>
        </section>
      </KdsWrap>
    </Layout>
  );
}

export default KDS;
