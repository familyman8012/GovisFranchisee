/* eslint-disable camelcase */
import React from 'react';
import { useRouter } from 'next/router';
import { queryString } from '@UtilFarm/queryString';

interface TableData {
  idx: number;
  status: number;
  coupon_name: string;
  notification_type: number;
  coupon_type: number;
  used_qty: number;
  coupon_qty: number;
  use_start_dt: string;
  use_end_dt: string;
  coupon_idx: number;
}

interface TableProps {
  data: { list: TableData[] };
}

interface CouponType {
  [key: string]: {
    [key: string]: string;
  };
}

const coupon: CouponType = {
  status: {
    0: '시행 전',
    1: '시행 중',
    2: "'만료'",
  },
  notification_type: {
    0: '일반',
    1: '알림톡',
  },
  coupon_type: {
    0: '상품',
    1: '할인율',
    2: '할인액',
  },
};

const ListTable = ({ data }: TableProps) => {
  const router = useRouter();
  const { query } = router;

  return (
    <table>
      <thead>
        <tr>
          <th>NO.</th>
          <th>시행 상태</th>
          <th>쿠폰명</th>
          <th>알림 유형</th>
          <th>쿠폰 유형</th>
          <th>쿠폰현황</th>
          <th>시행기간</th>
        </tr>
      </thead>
      <tbody>
        {data?.list?.map((item: TableData) => {
          const { status, notification_type, coupon_type } = item;
          return (
            <tr
              key={item.coupon_idx}
              onClick={() =>
                router.push(
                  `/fc/coupons/${item.coupon_idx}?${queryString(query)}`
                )
              }
            >
              <td>{item.coupon_idx}</td>
              <td>{coupon.status[status]}</td>
              <td>{item.coupon_name}</td>
              <td>{coupon.notification_type[notification_type]}</td>
              <td>{coupon.coupon_type[coupon_type]}</td>
              <td>{`${item.used_qty}/${item.coupon_qty}`}</td>
              <td>{`${item.use_start_dt} ~ ${item.use_end_dt}`}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ListTable;
