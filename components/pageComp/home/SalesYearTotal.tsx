import dayjs from "dayjs";
import setComma from "LibFarm/PriceUtil";

interface SalesYearTotalProps {
  startDate: string | undefined;
  endDate: string;
  currentYearSales: string | number;
  previousYearSales?: number;
}

const SalesYearTotal = ({ startDate, endDate, currentYearSales }: SalesYearTotalProps) => {
  const startTime = dayjs(startDate);
  const endTime = dayjs(endDate);

  return (
    <div className={"contents-box home__stack-sales"}>
      <div className={"home__stack-sales__date-box"}>
        <div className={"home__stack-sales__date-box__title weight-500"}>
          <b className="weight-600">{startTime.isValid() ? startTime.format("YYYY") : ""}</b> 누적 매출
        </div>
        <div className={"home__stack-sales__date-box__date"}>
          {startTime.isValid() && endTime.isValid() ? `${startTime.format("YYYY-MM")} ~ ${endTime.format("MM")}` : ""}
        </div>
      </div>
      <div className={"home__stack-sales__price-box weight-500"}>
        <div className={"home__stack-sales__price-box__price"}>
          <b className="weight-600">{setComma(currentYearSales)}</b>
        </div>
        <div className={"home__stack-sales__price-box__unit"}>원</div>
      </div>
    </div>
  );
};

export default SalesYearTotal;
