import React from "react";
import { OrderProductionWrap } from "./style";

function OrderProduction() {
  return (
    <OrderProductionWrap>
      <h3>주문상품</h3>
      <ul className="list">
        <li>
          <div className="thumb">
            <img src="https://contents.sixshop.com/uploadedFiles/120483/product/image_1681955774061.png" />
          </div>
          <div className="product_info">
            <div className="name">치즈 계량 컵</div>
            <div className="option">재질 선택: 기본 / 거치대 추가: 없음</div>
            <div className="box_price">
              <span className="quanity">1개 /</span>
              <span className="price">18,000원</span>
            </div>
          </div>
        </li>
      </ul>
      <div className="total_product">
        <span className="tit">상품 합계</span>
        <span className="price">36,000원</span>
      </div>
    </OrderProductionWrap>
  );
}

export default OrderProduction;
