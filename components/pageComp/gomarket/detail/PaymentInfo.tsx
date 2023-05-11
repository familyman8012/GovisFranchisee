import React from "react";

import CustomSelect from "ComponentsFarm/pageComp/gomarket/common/CustomSelect";
import QuanityControl from "../common/QuanityControl";
import { PaymentInfoWrap } from "./style";
import { useRouter } from "next/router";

function PaymentInfo() {
  const router = useRouter();
  return (
    <PaymentInfoWrap>
      <div className="tit">치즈 계량 컵</div>
      <div className="price">9,500원</div>
      <dl className="delivery_fee">
        <dt>배송비</dt>
        <dd>무료</dd>
      </dl>
      <dl className="option_control quanity">
        <dt>수량</dt>
        <dd>
          <QuanityControl />
        </dd>
      </dl>
      <dl className="option_control sel_option">
        <dt>추가옵션</dt>
        <dd>
          <CustomSelect />
        </dd>
      </dl>
      <dl className="option_control add_text">
        <dt>사이즈</dt>
        <dd>
          <input type="text" />
        </dd>
      </dl>
      <div className="box_payment">
        <dl>
          <dt>주문 수량</dt>
          <dd>1개</dd>
        </dl>
        <dl>
          <dt>총 상품 금액</dt>
          <dd>92,400원</dd>
        </dl>
        <div className="box_btn">
          <button
            className="btn_black"
            onClick={() => router.push("/gomarket/order")}
          >
            구매하기
          </button>
          <button
            className="btn_white"
            onClick={() => router.push("/gomarket/cart")}
          >
            장바구니에 담기
          </button>
        </div>
      </div>
    </PaymentInfoWrap>
  );
}

export default PaymentInfo;
