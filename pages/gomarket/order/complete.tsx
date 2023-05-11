import GomarketLayout from "ComponentsFarm/pageComp/gomarket/layout/GomarketLayout";
import {
  CompleteWrap,
  OrderWrap,
} from "ComponentsFarm/pageComp/gomarket/order/style";
import Link from "next/link";
import React from "react";

function Complete() {
  return (
    <GomarketLayout>
      <OrderWrap>
        <CompleteWrap>
          <h2>결제 요청이 완료되었습니다.</h2>
          <div className="box_inp">
            <div className="txt_label">주문번호</div>
            <div className="txt_input">20230426FFOEH</div>
          </div>
          <div className="box_inp">
            <div className="txt_label">결제 방법</div>
            <div className="txt_input">무통장 입금</div>
          </div>
          <div className="box_inp">
            <div className="txt_label">입금 계좌</div>
            <div className="txt_input">
              기업은행(69402767301011) 주식회사고피자
            </div>
          </div>
          <div className="box_inp">
            <div className="txt_label">입금 기한</div>
            <div className="txt_input">2023. 05. 06 23:59:59</div>
          </div>
          <div className="box_inp">
            <div className="txt_label">결제 금액</div>
            <div className="txt_input">20,000원</div>
          </div>
          <div className="box_inp">
            <div className="txt_label">상품 이름</div>
            <div className="txt_input">초코 디핑 스티커 500매</div>
          </div>
          <Link href="/gomarket" className="btn_gohome">
            홈으로
          </Link>
        </CompleteWrap>
      </OrderWrap>
    </GomarketLayout>
  );
}

export default Complete;
