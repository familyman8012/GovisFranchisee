import Layout from "ComponentsFarm/layouts";
import Link from "next/link";
import React from "react";
import { GoContent, GoMarketMenu, GoMarketWrap } from "../style";

interface Props {
  children: React.ReactNode;
}

const MenuArr = ["ALL", "포스터", "배너/현수막", "홍보물", "집기"];

function GomarketLayout({ children }: Props) {
  return (
    <Layout className="fullWidth">
      <GoMarketWrap>
        <GoMarketMenu>
          <div className="inner">
            <ul className="list">
              {MenuArr.map((el: any, i) => (
                <li className={`${i === 0 ? "on" : ""}`}>
                  <Link href="/gomarket">{el}</Link>
                </li>
              ))}
            </ul>
            <aside>
              <div className="ico-market-search" data-type="icon">
                <span className="hiddenZoneV">검색</span>
              </div>
              <Link href="/gomarket/mypage">
                <div className="ico-market-snowman" data-type="icon-snowman">
                  <span className="hiddenZoneV">주문내역</span>
                </div>
              </Link>
              <Link href="/gomarket/cart">
                <div className="box_cart">
                  <span className="ico-market-bag" data-type="icon-bag">
                    <span className="hiddenZoneV">장바구니</span>
                  </span>
                  <span className="txt_number">12</span>
                </div>
              </Link>
            </aside>
          </div>
        </GoMarketMenu>
        <GoContent>{children}</GoContent>
      </GoMarketWrap>
    </Layout>
  );
}

export default GomarketLayout;
