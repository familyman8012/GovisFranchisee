import Payment from "ComponentsFarm/pageComp/gomarket/cart/Cart";
import Cart from "ComponentsFarm/pageComp/gomarket/cart/Cart";
import OrderInfo from "ComponentsFarm/pageComp/gomarket/cart/OrderInfo";
import { CartWrap } from "ComponentsFarm/pageComp/gomarket/cart/style";
import QuanityControl from "ComponentsFarm/pageComp/gomarket/common/QuanityControl";
import GomarketLayout from "ComponentsFarm/pageComp/gomarket/layout/GomarketLayout";
import React from "react";

function Index() {
  return (
    <GomarketLayout>
      <CartWrap>
        <h2>장바구니 (3)</h2>
        <OrderInfo />
        <Payment />
      </CartWrap>
    </GomarketLayout>
  );
}

export default Index;
