import React from "react";
import { PALLETES } from "LibFarm/color";

import { ProductViewTypeContainer } from "./styles";
import { Checkbox } from "./Checkbox";

interface ProductBarChartProps {
  value: string;
  onChangeView: (val: string) => void;
}

const ProductViewType = ({ value, onChangeView }: ProductBarChartProps) => {
  return (
    <ProductViewTypeContainer>
      <h3 className="title">{value === "time" ? "시간대별" : value === "day" ? "일별" : "월별"} 주문 현황</h3>
      <div className="right-area">
        <Checkbox checked={value === "time"} label="시간대별" onChange={() => onChangeView("time")} />
        <Checkbox checked={value === "day"} label="일별" onChange={() => onChangeView("day")} />
        <Checkbox checked={value === "month"} label="월별" onChange={() => onChangeView("month")} />
      </div>
    </ProductViewTypeContainer>
  );
};

export default ProductViewType;
