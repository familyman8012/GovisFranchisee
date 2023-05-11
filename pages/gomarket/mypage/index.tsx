import { CartWrap } from "ComponentsFarm/pageComp/gomarket/cart/style";
import GomarketLayout from "ComponentsFarm/pageComp/gomarket/layout/GomarketLayout";
import { MyPageWrap } from "ComponentsFarm/pageComp/gomarket/mypage/style";
import Link from "next/link";
import React from "react";

function Mypage() {
  return (
    <GomarketLayout>
      <MyPageWrap>
        <h2>주문 내역</h2>
        <div className="list_title">
          <span>일자</span>
          <span>상품정보</span>
          <span>가격</span>
          <span>상태</span>
        </div>
        <ul className="list">
          <li>
            <div className="cell">23.04.26</div>
            <div className="cell">
              <div className="text">
                <div className="name">
                  <Link href="/gomarket/orderinfo">인테리어 포스터 파스타</Link>
                </div>
              </div>
            </div>
            <div className="cell">9,500원</div>
            <div className="cell">입금 대기</div>
          </li>
          <li>
            <div className="cell">23.04.26</div>
            <div className="cell">
              <div className="text">
                <div className="name">
                  <Link href="/gomarket/orderinfo">인테리어 포스터 파스타</Link>
                </div>
              </div>
            </div>
            <div className="cell">9,500원</div>
            <div className="cell">입금 대기</div>
          </li>
        </ul>
      </MyPageWrap>
    </GomarketLayout>
  );
}

export default Mypage;
