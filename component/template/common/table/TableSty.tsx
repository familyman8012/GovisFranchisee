import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Badge } from '@ComponentFarm/atom/Badge/Badge';
import Arrow2Up from '@ComponentFarm/atom/icons/Arrow2Up';

export const TableSty1 = styled.table`
  width: 100%;

  th,
  td {
    &:first-of-type {
      padding: 0 2.4rem;
      text-align: left;
    }
  }

  th {
    height: 4.8rem;
    padding: 0 2.4rem;
    color: var(--color-gray500);
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 1.8rem;
    letter-spacing: 0.042rem;
    border-top: 1px solid var(--color-neutral90);
    border-bottom: 1px solid var(--color-neutral90);
    background: #f7f9fc;
  }
  td {
    height: 7rem;
    text-align: center;
    border-bottom: 1px solid var(--color-neutral90);
  }
`;

export const TableSty2 = styled.table`
  width: 100%;

  th {
    height: 4.8rem;
    padding: 0 2rem;
    border-right: 1px solid var(--color-neutral90);
    background: #171c8f;
  }

  tr:nth-of-type(1) th {
    text-align: right;
    font-weight: 600;
    color: #fff;
    &:first-of-type {
      text-align: left;
    }
  }

  tr:nth-of-type(2) {
    th {
      color: var(--color-gray500);
      font-weight: 600;
      text-align: left;
      border-bottom: 1px solid var(--color-neutral90);
      background: #f3f2f2;
    }
  }

  td {
    height: 4.8rem;
    padding: 0 2rem;
    font-weight: 600;
    text-align: right;
    border: 1px solid var(--color-neutral90);
    border-left: none;

    &:nth-of-type(2) {
      text-align: left;
    }
  }
`;

export const TableSty3 = styled.table`
  th,
  td {
    font-size: 1.4rem;
    border: 1px solid var(--color-gray6);
  }
  th {
    height: 6.4rem;
    text-align: right;
    padding-right: 2rem;

    background: var(--color-gray2);
    color: var(--color-neutral50);
    font-weight: 700;
  }
  td {
    text-align: left;
    padding-left: 2.4rem;
    color: var(--color-neutral10);
    font-weight: 400;
  }
`;

export const TableSty4 = styled.table`
  width: 100%;
  tr.td_chk {
    &:not(first-of-type) {
      background: #fafafa;
    }
  }

  th,
  td {
    padding: 1.2rem 2.4rem !important;
    font-size: 1.4rem;
    text-align: center;
    border: 1px solid var(--color-gray6);
    &:first-of-type {
      border-left: none;
    }
    &:last-of-type {
      border-right: none;
    }
  }
  th {
    color: var(--color-neutral50);
    font-weight: 700;
    background: var(--color-gray2);
  }
  td {
    color: var(--color-neutral10, #181818);
  }
`;

export const TableSty1View = () => {
  return (
    <TableSty1>
      <colgroup>
        <col width="33%" />
        <col width="22%" />
        <col width="22%" />
        <col width="22%" />
      </colgroup>
      <thead>
        <tr>
          <th>시간</th>
          <th>기준일</th>
          <th>비교일</th>
          <th>증감율</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>01:00</td>
          <td>113개</td>
          <td>113개</td>
          <td>
            <Badge
              type="square"
              color="green"
              LeadingIcon={
                <Arrow2Up
                  customCss={css`
                    path {
                      fill: var(--bage-greenLabel);
                    }
                  `}
                />
              }
            >
              10%
            </Badge>
          </td>
        </tr>
      </tbody>
    </TableSty1>
  );
};
