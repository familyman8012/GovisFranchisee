import React from "react";
import { OrderPayInfoWrap } from "./style";

function OrderPayInfo() {
  return (
    <OrderPayInfoWrap>
      <h3>결제 정보</h3>
      <div className="calc_price">
        <div className="info-item">
          <span className="tit">상품 합계</span>
          <span className="price">18,000원</span>
        </div>
        <div className="info-item">
          <span className="tit">배송비</span>
          <span className="price">2,000원</span>
        </div>
      </div>
      <div className="total_price">
        <div className="info-item">
          <span className="tit">결제 금액</span>
          <span className="price">20,000원</span>
        </div>
      </div>
    </OrderPayInfoWrap>
  );
}

export default OrderPayInfo;
