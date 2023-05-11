import React from "react";
import QuanityControl from "../common/QuanityControl";
import { CartWrap } from "./style";

function OrderInfo({ data, type }: any) {
  return (
    <>
      <div className="list_title">
        <span>상품정보</span>
        <span>수량</span>
        <span>가격</span>
        <span>배송비</span>
      </div>
      <ul className="list">
        <li>
          <div className="cell">
            <div className="img">
              <a href="https://www.sixshop.com/gopizza/product/poster-198-24-335-336-337-382-383-397-398-399">
                <img src="https://contents.sixshop.com/uploadedFiles/120483/product/image_1678853612358.png" />
              </a>
            </div>
            <div className="text">
              <div className="name">
                <a href="https://www.sixshop.com/gopizza/product/poster-198-24-335-336-337-382-383-397-398-399">
                  인테리어 포스터 파스타
                </a>
              </div>
              <div className="option">
                <span>사이즈 선택: A1 (594x841mm)</span>
              </div>
              <div className="delete">
                <span className="txt">삭제하기</span>
              </div>
            </div>
          </div>
          <div className="cell">
            {type === "orderInfo" ? `수량 1개` : <QuanityControl />}
          </div>
          <div className="cell">가격 : 9,500원</div>
          <div className="cell">배송비 : 무료</div>
        </li>
        <li>
          <div className="cell">
            <div className="img">
              <a href="https://www.sixshop.com/gopizza/product/poster-198-24-335-336-337-382-383-397-398-399">
                <img src="https://contents.sixshop.com/uploadedFiles/120483/product/image_1678853612358.png" />
              </a>
            </div>
            <div className="text">
              <div className="name">
                <a href="https://www.sixshop.com/gopizza/product/poster-198-24-335-336-337-382-383-397-398-399">
                  인테리어 포스터 파스타
                </a>
              </div>
              <div className="option">
                <span>사이즈 선택: A1 (594x841mm)</span>
              </div>
              <div className="delete">
                <span className="txt">삭제하기</span>
              </div>
            </div>
          </div>
          <div className="cell">
            {type === "orderInfo" ? `수량 1개` : <QuanityControl />}
          </div>
          <div className="cell">가격 : 9,500원</div>
          <div className="cell">배송비 : 무료</div>
        </li>
      </ul>
    </>
  );
}

export default OrderInfo;
