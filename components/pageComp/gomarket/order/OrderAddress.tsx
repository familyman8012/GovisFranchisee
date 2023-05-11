import React from "react";
import { OrderAddressWrap } from "./style";

function OrderAddress({ data, type }: any) {
  return (
    <OrderAddressWrap>
      <h3>{type !== "orderInfo" ? "배송지" : "배송지 정보"}</h3>
      {type !== "orderInfo" && (
        <ul className="list_address">
          <li>
            <input type="radio" id="default_address" name="address" />
            <label htmlFor="default_address">기본 배송지</label>
          </li>
          <li>
            <input type="radio" id="new_address" name="address" />
            <label htmlFor="new_address">신규 입력</label>
          </li>
        </ul>
      )}
      <div className="box_inp">
        <label htmlFor="user_name">이름</label>
        <input type="text" id="user_name" name="user_name" />
      </div>
      <div className="box_inp">
        <label htmlFor="postnumber">우편번호</label>
        <div className="box_postnumber">
          <input type="text" id="postnumber" name="postnumber" />
          <button>검색하기</button>
        </div>
      </div>
      <div className="box_inp">
        <label htmlFor="address1">주소</label>
        <input type="text" id="address1" name="address1" disabled />
        <input type="text" id="address1" name="address2" />
      </div>
      <div className="box_inp">
        <label htmlFor="phone">연락처</label>
        <input type="tel" id="phone" name="phone" />
      </div>
      <div className="box_order_request_message box_inp">
        <label htmlFor="message">배송 시 요청 사항</label>
        <input type="text" id="message" name="message" />
        {type !== "orderInfo" && (
          <p className="txt">
            제주 및 도서 산간 지역의 배송은 추가 배송비가 발생할 수 있습니다.
          </p>
        )}
      </div>
    </OrderAddressWrap>
  );
}

export default OrderAddress;
