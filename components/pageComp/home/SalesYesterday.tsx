import setComma from "LibFarm/PriceUtil";

interface SalesYesterdayProps {
  sales: string | number;
  count: string | number;
  aov: string | number;
}

const SalesYesterday = ({ sales, count, aov }: SalesYesterdayProps) => {
  return (
    <div className={"home__contents-box contents-box"}>
      <ul className={"home__yesterday-info"}>
        <li>
          <div>매출</div>
          <div>{setComma(sales)}원</div>
        </li>
        <li>
          <div>주문수</div>
          <div>{count || 0}회</div>
        </li>
        <li>
          <div>객단가</div>
          <div>{setComma(aov)}원</div>
        </li>
      </ul>
    </div>
  );
};

export default SalesYesterday;
