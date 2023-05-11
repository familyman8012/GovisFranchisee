import React from "react";
import { ProductImgWrap } from "./style";

function ProductImg() {
  return (
    <ProductImgWrap>
      <div className="thumb_img">
        <img
          src="https://contents.sixshop.com/thumbnails/uploadedFiles/120483/product/image_1681955774061_2500.png"
          alt=""
        />
      </div>
      <ul className="list">
        <li>
          <img
            src="https://contents.sixshop.com/thumbnails/uploadedFiles/120483/product/image_1681955774061_1000.png"
            alt=""
          />
        </li>
        <li>
          <img
            src="https://contents.sixshop.com/thumbnails/uploadedFiles/120483/product/image_1681955774209_1000.png"
            alt=""
          />
        </li>
        <li>
          <img
            src="https://contents.sixshop.com/thumbnails/uploadedFiles/120483/product/image_1681955774429_1000.png"
            alt=""
          />
        </li>
        <li>
          <img
            src="https://contents.sixshop.com/thumbnails/uploadedFiles/120483/product/image_1681955774616_1000.png"
            alt=""
          />
        </li>
      </ul>
    </ProductImgWrap>
  );
}

export default ProductImg;
