import { useEffect, useState, useRef } from "react";

import dayjs from "dayjs";
import { Col, Row } from "ComponentsFarm/layouts/styles";
import { Datepicker } from "ComponentsFarm/elements/Datepicker";
import { Button } from "ComponentsFarm/elements/Button";
import { SearchAction } from "ComponentsFarm/elements/ComponentsSty";
import { PALLETES } from "LibFarm/color";

interface Props {
  handlerBtnSearch: Function;
}

export default function SearchDateRangeDefaultDatePicker(props: Props) {
  const NOW = Date.now();
  const DAY = 60 * 60 * 24 * 1000;
  const initialStartDate = dayjs(NOW - DAY * 2);
  const initialEndDate = dayjs(NOW - DAY);

  const [startDate, setStartDate] = useState(initialStartDate.format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(initialEndDate.format("YYYY-MM-DD"));

  useEffect(() => {
    if (startDate && endDate) props.handlerBtnSearch(startDate, endDate);
  }, [endDate]);

  const handlerBtnSearch = () => {
    if (startDate && endDate) props.handlerBtnSearch(startDate, endDate);
  };

  const handlerChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <SearchAction>
      <Col>
        <h4 className="search-action__title"> 날짜 범위 설정</h4>
        <div className={"search-action__content"}>
          <Datepicker value={[startDate, endDate]} editable={false} onChange={handlerChange} range />
          <Button color={PALLETES["primary-3"]}>검색</Button>
        </div>
      </Col>
    </SearchAction>
  );
}
