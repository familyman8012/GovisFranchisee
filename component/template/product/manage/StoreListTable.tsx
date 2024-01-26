/* eslint-disable camelcase */
import React from 'react';
import { css } from '@emotion/react';
import { Badge } from '@ComponentFarm/atom/Badge/Badge';
import { Table, TableWrap } from '@ComponentFarm/common';

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
  data?: { list: TableData[] };
}

const TableArr = [
  {
    no: '97',
    region: '본사',
    kind: '직영',
    name: '광화문 글로벌 본사 직영점',
    status: '운영',
  },
  {
    no: '97',
    region: '본사',
    kind: '직영',
    name: '광화문 글로벌 본사 직영점',
    status: '운영',
  },
  {
    no: '97',
    region: '본사',
    kind: '직영',
    name: '광화문 글로벌 본사 직영점',
    status: '운영',
  },
  {
    no: '97',
    region: '본사',
    kind: '직영',
    name: '광화문 글로벌 본사 직영점',
    status: '운영',
  },
  {
    no: '97',
    region: '본사',
    kind: '직영',
    name: '광화문 글로벌 본사 직영점',
    status: '운영',
  },
  {
    no: '97',
    region: '본사',
    kind: '직영',
    name: '광화문 글로벌 본사 직영점',
    status: '운영',
  },
  {
    no: '97',
    region: '본사',
    kind: '직영',
    name: '광화문 글로벌 본사 직영점',
    status: '운영',
  },
  {
    no: '97',
    region: '본사',
    kind: '직영',
    name: '광화문 글로벌 본사 직영점',
    status: '운영',
  },
  {
    no: '97',
    region: '본사',
    kind: '직영',
    name: '광화문 글로벌 본사 직영점',
    status: '운영',
  },
];

const pageStyle = css`
  th {
    &:nth-of-type(1) {
      width: calc((200 / 1536) * 100%);
    }
    &:nth-of-type(2) {
      width: calc((200 / 1536) * 100%);
    }
    &:nth-of-type(3) {
      width: calc((350 / 1536) * 100%);
    }
    &:nth-of-type(4) {
      width: calc((500 / 1536) * 100%);
    }
    &:nth-of-type(5) {
      width: calc((286 / 1536) * 100%);
    }
  }
  .txt {
    margin-right: 0.7rem;
  }
`;

const StoreListTable = ({ data }: TableProps) => {
  return (
    <TableWrap>
      <Table className="basic" css={pageStyle}>
        <thead>
          <tr>
            <th>NO.</th>
            <th>지역</th>
            <th>매장 구분</th>
            <th>매장명</th>
            <th>매장 선택</th>
          </tr>
        </thead>
        <tbody>
          {TableArr.map(el => (
            <tr key={el.no}>
              <td className="code">{el.no}</td>
              <td>{el.region}</td>
              <td>{el.kind}</td>
              <td>
                <span className="txt">{el.name}</span>
                <Badge color="orange" size="circle">
                  N
                </Badge>
              </td>
              <td>
                <Badge color="green" size="sm" dot>
                  {el.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrap>
  );
};

export default StoreListTable;
