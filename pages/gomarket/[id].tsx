import PaymentInfo from "ComponentsFarm/pageComp/gomarket/detail/PaymentInfo";
import ProductImg from "ComponentsFarm/pageComp/gomarket/detail/ProductImg";
import { GomarketDetail } from "ComponentsFarm/pageComp/gomarket/detail/style";
import GomarketLayout from "ComponentsFarm/pageComp/gomarket/layout/GomarketLayout";
import { useRouter } from "next/router";
import React from "react";

function Detail() {
  const router = useRouter();

  return (
    <GomarketLayout>
      <GomarketDetail>
        <div className="wrap_info">
          <ProductImg />
          <PaymentInfo />
        </div>
        <div className="wrap_content">
          <img
            src="https://contents.sixshop.com/thumbnails/uploadedFiles/120483/product/image_1679744698992_1000.png"
            alt=""
          />
        </div>
      </GomarketDetail>
    </GomarketLayout>
  );
}

export default Detail;
