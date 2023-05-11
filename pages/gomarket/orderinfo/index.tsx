import OrderInfo from "ComponentsFarm/pageComp/gomarket/cart/OrderInfo";
import { CartWrap } from "ComponentsFarm/pageComp/gomarket/cart/style";
import GomarketLayout from "ComponentsFarm/pageComp/gomarket/layout/GomarketLayout";
import OrderAddress from "ComponentsFarm/pageComp/gomarket/order/OrderAddress";
import {
  InfoArea,
  OrderInfoWrap,
} from "ComponentsFarm/pageComp/gomarket/orderinfo/style";
import React, { useState } from "react";

function Index() {
  const [orderState, setOrderState] = useState(true);

  return (
    <GomarketLayout>
      <OrderInfoWrap>
        <h2>주문 상세 정보</h2>
        <CartWrap>
          <OrderInfo type="orderInfo" />
        </CartWrap>
        <InfoArea>
          <div className="box_order">
            <h3>주문 정보</h3>
            <ul className="list_info">
              <li>
                <span>주문번호</span>
                <span>20230426SWYKK</span>
              </li>
              <li>
                <span>주문 일자</span>
                <span>2023.04.26 15:06:35</span>
              </li>
              <li>
                <span>주문 상태</span>
                {/* <span className="state">
                  <span>취소완료</span>
                  <span>(사유:테스트중입니다.)</span>
                </span> */}
                <span className={`state ${orderState ? "" : "on"}`}>
                  <span className="form-group">
                    <span className="box_inp">
                      {orderState ? (
                        "입금대기"
                      ) : (
                        <input
                          type="text"
                          id="order_state"
                          name="order_state"
                        />
                      )}
                    </span>
                  </span>
                  <span className="state_control">
                    {orderState ? (
                      <button
                        className="btn_cancle"
                        onClick={() => setOrderState(false)}
                      >
                        취소요청
                      </button>
                    ) : (
                      <span className="box_btn">
                        <button
                          className="btn_black"
                          onClick={() => setOrderState(true)}
                        >
                          확인
                        </button>
                        <button
                          className="btn_white"
                          onClick={() => setOrderState(true)}
                        >
                          취소
                        </button>
                      </span>
                    )}
                  </span>
                </span>
              </li>
              <li>
                <span>배송 정보</span>
                <span>-</span>
              </li>
            </ul>
            <div className="form-group">
              <OrderAddress type={"orderInfo"} />
            </div>
          </div>
          <div className="box_payment">
            <h3>결제 정보</h3>
            <ul className="list_info">
              <li>
                <span>상품합계</span>
                <span>22,000원</span>
              </li>
              <li>
                <span>배송비</span>
                <span>0원</span>
              </li>
              <li>
                <span>결제 금액</span>
                <span>22,000원</span>
              </li>
              <li>
                <span>주문자</span>
                <span>관리자</span>
              </li>
              <li>
                <span>결제 방법</span>
                <span>무통장 입금</span>
              </li>
              <li>
                <span>입금 계좌</span>
                <span>기업은행(69402867301011) 주식회사고피자</span>
              </li>
              <li>
                <span>입금 기한</span>
                <span>2023.05.06 23:59:59</span>
              </li>
              <li>
                <span>입금자</span>
                <span>관리자</span>
              </li>
            </ul>
          </div>
        </InfoArea>
      </OrderInfoWrap>
    </GomarketLayout>
  );
}

export default Index;
