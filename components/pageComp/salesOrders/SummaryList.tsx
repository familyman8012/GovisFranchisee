import React from "react";
import setComma from "LibFarm/PriceUtil";
import { IDaliyListRow } from "InterfaceFarm/Sale";
import { IOrdersListRow } from "InterfaceFarm/Order";
import { SummaryListWrap } from "ComponentsFarm/elements/ComponentsSty";

interface SummaryListProps {
  children: React.ReactNode;
}

interface SummaryListItemProps<T> {
  data: T;
}

export const SummaryList = ({ children }: SummaryListProps) => <SummaryListWrap>{children}</SummaryListWrap>;

export const SummaryItemForOrder = ({ data }: SummaryListItemProps<IOrdersListRow>) => (
  <li className="summary-list__item">
    <ul className="summary-list__info">
      <li>
        <span className="summary-list__key">주문 시간</span>
        <span className="summary-list__value">{data.ordered_at}</span>
      </li>
      <li>
        <span className="summary-list__key">주문 번호</span>
        <span className="summary-list__value">{data.order_number}</span>
      </li>
      <li>
        <span className="summary-list__key">채널</span>
        <span className="summary-list__value">{data.channel}</span>
      </li>
      <li>
        <span className="summary-list__key">주문 내역</span>
        <span className="summary-list__value">{data.order_name}</span>
      </li>
      <li>
        <span className="summary-list__key">주문 유형</span>
        <span className="summary-list__value">{data.delivery_type}</span>
      </li>
    </ul>
    <ul className="summary-list__total">
      <li>
        <span className="summary-list__key">금액</span>
        <span className="summary-list__value">{setComma(data.billable_amount)}원</span>
      </li>
    </ul>
  </li>
);

export const SummaryItemForSale = ({ data }: SummaryListItemProps<IDaliyListRow>) => (
  <li className="summary-list__item">
    <ul className="summary-list__info">
      <li>
        <span className="summary-list__key">날짜</span>
        <span className="summary-list__value">{data.order_date}</span>
      </li>
      <li>
        <span className="summary-list__key">날씨</span>
        <span className="summary-list__value">{data.weather}</span>
      </li>
      <li>
        <span className="summary-list__key">매출 금액</span>
        <span className="summary-list__value">{setComma(data.billable_amount)}원</span>
      </li>
      <li>
        <span className="summary-list__key">주문수</span>
        <span className="summary-list__value">{data.order_count}회</span>
      </li>
    </ul>
    <ul className="summary-list__total">
      <li>
        <span className="summary-list__key">객단가</span>
        <span className="summary-list__value">{setComma(data.unit_price)}원</span>
      </li>
    </ul>
  </li>
);
