import React from "react";
import { OrderPeopleWrap } from "./style";

function OrderPeople() {
  return (
    <OrderPeopleWrap>
      <h3>주문자</h3>
      <div className="box_inp">
        <label htmlFor="order_user_name">이름</label>
        <input type="text" id="order_user_name" name="user_name" />
      </div>
      <div className="box_inp">
        <label htmlFor="order_user_phone">연락처</label>
        <input type="tel" id="order_user_phone" name="order_user_phone" />
      </div>
      <div className="box_inp">
        <label htmlFor="order_user_email">이메일</label>
        <input type="email" id="order_user_email" name="order_user_email" />
      </div>
    </OrderPeopleWrap>
  );
}

export default OrderPeople;
