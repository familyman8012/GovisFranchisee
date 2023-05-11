import React from "react";
import {
  OrderWrap,
  PayBtn,
} from "ComponentsFarm/pageComp/gomarket/order/style";
import GomarketLayout from "ComponentsFarm/pageComp/gomarket/layout/GomarketLayout";
import OrderAddress from "ComponentsFarm/pageComp/gomarket/order/OrderAddress";
import OrderPayInfo from "ComponentsFarm/pageComp/gomarket/order/OrderPayInfo";
import OrderPayMethod from "ComponentsFarm/pageComp/gomarket/order/OrderPayMethod";
import OrderPeople from "ComponentsFarm/pageComp/gomarket/order/OrderPeople";
import OrderProduction from "ComponentsFarm/pageComp/gomarket/order/OrderProduction";
import { useRouter } from "next/router";

function Index() {
  const router = useRouter();
  return (
    <GomarketLayout>
      <OrderWrap className="form-group">
        <h2>고마켓</h2>
        <OrderProduction />
        <OrderPeople />
        <OrderAddress />
        <OrderPayInfo />
        <OrderPayMethod />

        <PayBtn onClick={() => router.push("/gomarket/order/complete")}>
          34,500원 결제하기
        </PayBtn>
      </OrderWrap>
    </GomarketLayout>
  );
}

export default Index;
