import Layout from "ComponentsFarm/layouts";
import GomarketLayout from "ComponentsFarm/pageComp/gomarket/layout/GomarketLayout";
import {
  GoMarketList,
  GoMarketWrap,
} from "ComponentsFarm/pageComp/gomarket/style";
import Link from "next/link";
import React from "react";

const productList = [
  {
    id: 1,
    thumb:
      "https://contents.sixshop.com/thumbnails/uploadedFiles/120483/product/image_1680149725949_1000.png",
    tit: "[대구신월성점] 주호민&이말년 포스터",
    price: 11000,
  },
  {
    id: 2,
    thumb:
      "https://contents.sixshop.com/thumbnails/uploadedFiles/120483/product/image_1679992693066_1000.png",
    tit: "[대구신월성점] 초코디핑소스 포스터",
    price: 11000,
  },
  {
    id: 3,
    thumb:
      "https://contents.sixshop.com/thumbnails/uploadedFiles/120483/product/image_1678853612358_1000.png",
    tit: "인테리어 포스터 파스타",
    price: 11000,
  },
  {
    id: 4,
    thumb:
      "https://contents.sixshop.com/thumbnails/uploadedFiles/120483/product/image_1678853591399_1000.png",
    tit: "인테리어 포스터 파스타",
    price: 11000,
  },
];

function Index() {
  return (
    <GomarketLayout>
      <GoMarketList>
        {productList.map((el) => (
          <li key={el.id}>
            <Link href={`/gomarket/1`}>
              <div>
                <div className="thumb">
                  <img src={el.thumb} alt="" />
                </div>
                <div className="txt_product_name">{el.tit}</div>
                <div className="txt_price">
                  {Number(el.price).toLocaleString("ko-KR")}원
                </div>
              </div>
            </Link>
          </li>
        ))}
      </GoMarketList>
    </GomarketLayout>
  );
}

export default Index;
