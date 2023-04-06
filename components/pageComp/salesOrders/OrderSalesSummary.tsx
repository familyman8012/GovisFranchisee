import { OrderSalesSummaryList } from "ComponentsFarm/elements/ComponentsSty";
import setComma from "LibFarm/PriceUtil";

interface Props {
  total: string;
  count: string;
}

export default function OrderSalesSummary(props: Props) {
  return (
    <OrderSalesSummaryList>
      <li className="order-sales-summary__item">
        <ul>
          <li>매출합계</li>
          <li>
            {setComma(props.total)}
            <span className="order-sales-summary__unit">원</span>
          </li>
        </ul>
      </li>
      <li className="order-sales-summary__item">
        <ul>
          <li>주문수 합계</li>
          <li>
            {setComma(props.count)}
            <span className="order-sales-summary__unit">회</span>
          </li>
        </ul>
      </li>
    </OrderSalesSummaryList>
  );
}
