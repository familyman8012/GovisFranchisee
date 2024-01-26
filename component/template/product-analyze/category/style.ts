import styled from '@emotion/styled';

export const CollapseList = styled.ul`
  width: 100%;

  .wrap_total,
  .depth1_info {
    display: table;
    width: 100%;

    background: #171c8f;

    > span {
      display: table-cell;
      vertical-align: middle;
      width: 25%;
      height: 4.8rem;
      padding: 0 2rem;
      text-align: right;
      color: #fff;
      border-right: 1px solid var(--color-neutral90);
      &:first-of-type {
        text-align: left;
      }
    }
  }

  .wrap_total.th {
    font-weight: 600;
    text-align: left;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    background: #ddd;

    span {
      color: var(--color-gray30);
    }
  }

  .depth1_info {
    cursor: pointer;
    background: #f3f2f2;

    > span {
      color: var(--color-neutral10);
      font-weight: 600;
      border-bottom: 1px solid var(--color-neutral90);
    }
  }

  .detail_table {
    width: 100%;
    th,
    td {
      height: 4.8rem;
      padding: 0 2rem;
      border: 1px solid var(--color-neutral90);
      border-left: none;
    }
    th {
      font-weight: normal;
      background: #f7f9fc;
    }
    td {
      font-weight: 600;
      text-align: right;

      &:nth-of-type(2) {
        text-align: left;
      }
    }
  }
`;
