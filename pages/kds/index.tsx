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
import {
  IOrderAmountRes,
  IOrderListRes,
  IOrderProcessRes,
} from "InterfaceFarm/Kds";
import Head from "next/head";
import React from "react";
import { useQuery } from "react-query";

const KdsWrap = styled.div`
  .box {
    margin: 16px 0;
    padding: 24px;
    border-radius: 0.25rem;
    background-color: rgb(255, 255, 255);
  }
  .wrap_info {
    background: #fff;
    padding-bottom: 20px;
    .box {
      margin-top: 0;
    }
    .box_sales {
      li {
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
        font-weight: bold;

        &:first-of-type {
          margin-top: 0px;
        }
      }
    }
  }
  .box_receipt {
    @media (min-width: 576px) {
      max-width: 540px;
    }
    @media (min-width: 768px) {
      max-width: 720px;
    }
    @media (min-width: 992px) {
      max-width: 960px;
    }
    @media (min-width: 1400px) {
      max-width: 1320px;
    }

    margin: 24px auto 0;
    padding: 0 20px 50px;

    .item_receipt {
      .box_status_info {
        display: flex;

        font-weight: bold;

        .num_order {
          margin-left: auto;
        }

        .current_status {
          margin-top: 10px;
        }
      }

      table {
        width: 100%;
        margin-top: 20px;
        border-collapse: collapse;
        th,
        td {
          text-align: center;
          border: 1px solid #e0e0e0;
        }
        th,
        td {
          padding: 7px 0;
          &:first-of-type {
            padding-left: 20px;
            text-align: left;
          }
        }
      }
    }
  }
`;

function KDS() {
  const { data: orderAmountData, isLoading: orderAmountLoading } = useQuery<
    AxiosResponse<IOrderAmountRes>,
    AxiosError
  >(["orderMount"], () => fetchOrderAmount());

  const { data: orderProcessData, isLoading: orderProcessLoading } = useQuery<
    AxiosResponse<IOrderProcessRes>,
    AxiosError
  >(["orderProcess"], () => fetchOrderProcess());

  const { data: orderListData, isLoading: orderListLoading } = useQuery<
    AxiosResponse<IOrderListRes>,
    AxiosError
  >(["orderList"], () => fetchOrderList());

  return (
    <Layout className="fullWidth">
      <Head>
        <title>주문관제 | GOVIS For Franchisee</title>
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
          {orderProcessData && <MultiChart data={orderProcessData?.data} />}
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
