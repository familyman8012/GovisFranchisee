import styled from "@emotion/styled";
import {
  fetchIsKds,
  fetchOrderAmount,
  fetchOrderList,
  fetchOrderProcess,
} from "ApiFarm/kds";
import { AxiosError, AxiosResponse } from "axios";
import { EmptyView } from "ComponentsFarm/elements/EmptyView";
import Layout from "ComponentsFarm/layouts";
import DataComponent from "ComponentsFarm/pageComp/kds/DataComponent";
import MultiChart from "ComponentsFarm/pageComp/kds/MultiChart";
import { KdsWrap } from "ComponentsFarm/pageComp/kds/style";
import { ScrollShadow } from "ComponentsFarm/pageComp/statistics/product/styles";
import {
  IIsKds,
  IOrderAmountRes,
  IOrderListRes,
  IOrderProcessRes,
} from "InterfaceFarm/Kds";
import Head from "next/head";
import React from "react";
import { useQuery } from "react-query";

function KDS() {
  const { isLoading, data: isKds } = useQuery<
    AxiosResponse<IIsKds>,
    AxiosError
  >(["isKds"], () => fetchIsKds());

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
    refetchInterval: 1000 * 60,
  });

  return (
    <Layout className="fullWidth">
      <Head>
        <title>실시간 주문 현황 | GOVIS For Franchisee</title>
      </Head>
      {!isLoading && isKds?.data?.store_list[0]?.is_kds === 0 ? (
        <div className="box" style={{ position: "relative", minHeight: 130 }}>
          <EmptyView>KDS 서비스를 사용하지 않는 매장입니다.</EmptyView>
        </div>
      ) : (
        <KdsWrap>
          <section className="wrap_info">
            <ul className="box box_sales">
              <li>
                <div>객단가</div>
                <div>
                  {Number(orderAmountData?.data?.unit_amount).toLocaleString(
                    "ko-KR"
                  )}
                  원
                </div>
              </li>
              <li>
                <div>누적 총합</div>
                <div>
                  {Number(orderAmountData?.data?.total_amount).toLocaleString(
                    "ko-KR"
                  )}
                  원
                </div>
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
      )}
    </Layout>
  );
}

export default KDS;
