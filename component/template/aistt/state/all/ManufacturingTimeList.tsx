import React from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import styled from "@emotion/styled";
import { IManufacturingTimeItem } from "InterfaceFarm/aistt";
import { NumberBar } from "@ComponentFarm/template/common/NumberBarList";

dayjs.extend(duration);

const ManufacturingTimeListWrap = styled.div`
  display: flex; /* Flexbox를 사용합니다. */
`;

const Column = styled.ol`
  flex: 1; /* 각 컬럼이 동일한 너비를 가지도록 설정합니다. */
  &:first-of-type {
    margin-right: 2.4rem; /* 첫 번째 컬럼과 두 번째 컬럼 사이의 간격을 설정합니다. */
  }

  li {
    margin-bottom: 2.4rem;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;

export const ManufacturingTimeList = ({
  data,
}: {
  data?: IManufacturingTimeItem[];
}) => {
  const NumberBarData = data?.map((item) => {
    return {
      idx: item.product_info_idx,
      imgUrl: item.product_image,
      box1Line1: item.product_name,
      box1Line2: item.evi_product_category_str,
      // box2Line1: String(item.manufacture_since_time_avg),
      box2Line1: dayjs
        .duration(item.manufacture_since_time_avg, "seconds")
        .format("mm분 ss초"),
    };
  });

  const halfwayPoint = Math.ceil(Number(NumberBarData?.length) / 2);
  const leftColumnData = NumberBarData?.slice(0, halfwayPoint);
  const rightColumnData = NumberBarData?.slice(halfwayPoint);

  return (
    <ManufacturingTimeListWrap>
      <Column>
        {leftColumnData?.map((item, index) => (
          <li key={item.idx}>
            <NumberBar index={index} data={item} />
          </li>
        ))}
      </Column>
      <Column>
        {rightColumnData?.map((item, index) => (
          <li key={item.idx}>
            <NumberBar index={index + halfwayPoint} data={item} />
          </li>
        ))}
      </Column>
    </ManufacturingTimeListWrap>
  );
};
