import { useRouter } from "next/router";
import React from "react";

function Payment() {
  const router = useRouter();
  return (
    <>
      <div className="bottom_cart">
        <div className="box_price">
          <div className="title">상품 합계</div>
          <div className="price">34,500원</div>
        </div>
        <div className="box_price">
          <div className="title">배송비</div>
          <div className="price">0원</div>
        </div>
      </div>
      <div className="total_cart">
        <div className="box_price">
          <div className="title">합계</div>
          <div className="price">34,500원</div>
        </div>
      </div>
      <div className="box_btn">
        <button
          className="btn_black"
          onClick={() => router.push("/gomarket/order")}
        >
          주문하기
        </button>
      </div>
    </>
  );
}

export default Payment;
